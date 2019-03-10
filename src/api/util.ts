import { object } from "prop-types";

const API_ROOT = (process.env.REACT_APP_POKECLICKER_API_ROOT as string).replace(/[\/]*$/, '/');

export class StatusError extends Error {
    status: number;
    statusText: string;
    response: Response;

    constructor(status: number, statusText: string, response: Response) {
        super(`${status} ${statusText}`);
        this.status = status;
        this.statusText = statusText;
        this.response = response;
    }
}

export class Session {
    static instance: Session;
<<<<<<< HEAD
    headers: Record<string, string>;

    constructor() {
        this.headers = {};
    }

    async setHeader(name: string, value: string) {
        this.headers[name] = value;
    }

    async addHeaders(headers: Record<string, string>) {
        this.headers = {...this.headers};
    }

    async setToken(token: string) {
        this.setHeader("Authorization", `Token ${token}`);
    }

    async fetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
        const defaultInit = {
            headers: this.headers
        };
        return fetch(input, mergeInit(defaultInit, init));
    }

    async safeFetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
        const response = await this.fetch(input, init);
=======
    headers: Headers;

    constructor() {
        this.headers = new Headers();
    }

    async setHeader(name: string, value: string) {
        this.headers.set(name, value);
    }

    async addHeaders(headers: Headers) {
        this.headers = new Headers({...this.headers});
    }

    async setToken(token: string) {
        this.setHeader('Authorization', `Token ${token}`);
    }

    async fetch(input: RequestInfo): Promise<Response> {
        return fetch(input, {headers: this.headers});
    }

    async safeFetch(input: RequestInfo): Promise<Response> {
        const response = await this.fetch(input);
>>>>>>> develop
        if(response.status >= 400) {
            throw new StatusError(response.status, response.statusText, response);
        }
        return response;
    }

<<<<<<< HEAD
    async postJson(input: RequestInfo, body: Record<string, any>, init?: RequestInit): Promise<Response> {
        const defaultBody = JSON.stringify(body);
        const defaultInit = {
            method: "POST",
            body: defaultBody,
            headers: {"Content-Type": "application/json"}
        };
        return this.safeFetch(input, mergeInit(defaultInit, init));
=======
    static getInstance() {
        if(Session.instance == null) {
            Session.instance = new Session();
        }
        return Session.instance;
>>>>>>> develop
    }
}

export function url(parts: TemplateStringsArray, ...params: any[]): string {
    const result: any[] = [API_ROOT];
    let i;
    for(i = 0; i < parts.length; i++) {
        result.push(parts[i]);
        result.push(params[i]);
    }
    result.push(parts[i]);
    return result.join("");
}
<<<<<<< HEAD

/**
 * Merges two RequestInit objects, overriding the parameters of the left-hand
 * side with the parameters of the right-hand side, except for the `headers`
 * parameter, which is also merged separately.
 */
function mergeInit(a?: RequestInit, b?: RequestInit): RequestInit {
    const headers = {};
    if(a != null) {
        Object.assign(headers, a.headers);
    }
    if(b != null) {
        Object.assign(headers, b.headers);
    }
    return {...a, ...b, headers};
}
=======
>>>>>>> develop
