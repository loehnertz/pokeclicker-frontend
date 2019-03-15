import { Dispatch } from "react";
import { AnyAction, Middleware } from "redux";
import { API_ROOT } from "./api/util";
import { WebSocketAction, WebSocketActionType } from "./store/actions/types";

const SOCKET_ROOT = (() => {
    const url = new URL(API_ROOT);
    url.protocol = "ws:";
    return url;
})();

const registeredSockets: Record<string, WebSocket | null> = {};

function openWebSocket(dispatch: Dispatch<WebSocketAction>, action: WebSocketAction): WebSocket {
    if(action.type !== WebSocketActionType.OPEN) {
        throw Error(`openWebSocket expects a ${WebSocketActionType.OPEN} action, got ${action.type}`);
    }

    if(registeredSockets[action.name] != null) {
        throw Error(`An open websocket with name ${action.name} already exists.`);
    }

    const socket = new WebSocket(`${SOCKET_ROOT}${action.endpoint}?token=${action.token}`);

    socket.addEventListener('open', () => {
        registeredSockets[action.name] = socket;
    });

    socket.addEventListener('message', (e: MessageEvent) => {
        dispatch({
            type: WebSocketActionType.RECEIVE,
            name: action.name,
            message: e.data,
            event: e
        });
    });

    socket.addEventListener('close', (e: CloseEvent) => {
        registeredSockets[action.name] = null;
        dispatch({
            type: WebSocketActionType.CLOSED,
            name: action.name,
            event: e
        });
    });

    return socket;
}

function sendWebSocketMessage(name: string, message: string) {
    const socket = registeredSockets[name];
    if(socket == null) {
        throw Error("WebSocket was closed.");
    }
    socket.send(message);
}

function closeWebSocket(name: string) {
    const socket = registeredSockets[name];
    if(socket == null) {
        return;
    }
    socket.close(1000, "User requested close");
}

function handleWebSocketAction(next: Dispatch<WebSocketAction>, action: WebSocketAction) {
    switch(action.type) {
        case WebSocketActionType.OPEN:
            openWebSocket(next, action);
            break;
        case WebSocketActionType.SEND:
            sendWebSocketMessage(action.name, action.message);
            break;
        case WebSocketActionType.CLOSE:
            closeWebSocket(action.name);
            break;
    }
    return next(action);
}

const wsactiontypes = new Set(Object.values(WebSocketActionType));

function isWebSocketAction(action: AnyAction): action is WebSocketAction {
    return wsactiontypes.has(action.type);
}

const webSocketMiddleware: Middleware = (store) => (next) => (action: WebSocketAction | AnyAction) => {
    if(isWebSocketAction(action)) {
        return handleWebSocketAction(next, action as WebSocketAction);
    }
    return next(action);
};


export default webSocketMiddleware;
