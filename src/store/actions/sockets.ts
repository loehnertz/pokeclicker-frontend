import { WebSocketAction, WebSocketActionType } from "./types";

export function openClickingSocket(token: string): WebSocketAction {
    return {
        type: WebSocketActionType.OPEN,
        name: "clicking",
        endpoint: "users/clicking",
        token
    };
}

export function closeClickingSocket(): WebSocketAction {
    return {
        type: WebSocketActionType.CLOSE,
        name: "clicking"
    };
}


export function sendClick(): WebSocketAction {
    return {
        type: WebSocketActionType.SEND,
        name: "clicking",
        message: "click"
    };
}

export function openBalanceSocket(token: string): WebSocketAction {
    return {
        type: WebSocketActionType.OPEN,
        name: "balance",
        endpoint: "users/balance",
        token
    };
}

export function closeBalanceSocket(): WebSocketAction {
    return {
        type: WebSocketActionType.CLOSE,
        name: "balance"
    };
}
