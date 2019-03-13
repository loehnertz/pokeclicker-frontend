
export const API_ROOT = (process.env.REACT_APP_POKECLICKER_API_ROOT as string).replace(/[\/]*$/, '/');

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
    headers: Record<string, string>;

    constructor() {
        this.headers = {};
    }

    setHeader(name: string, value: string) {
        this.headers[name] = value;
    }

    addHeaders(headers: Record<string, string>) {
        this.headers = {...this.headers, ...headers};
    }

    setToken(token: string) {
        this.setHeader("Authorization", `Token ${token}`);
    }

    async fetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
        const defaultInit: RequestInit = {
            headers: this.headers,
            mode: "cors"
        };
        const f = await fetch(input, mergeInit(defaultInit, init));
        return f;
    }

    async safeFetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
        const response = await this.fetch(input, init);
        if(response.status >= 400) {
            throw new StatusError(response.status, response.statusText, response);
        }
        return response;
    }

    async postJson(input: RequestInfo, body: Record<string, any>, init?: RequestInit): Promise<Response> {
        const defaultBody = JSON.stringify(body);
        const defaultInit = {
            method: "POST",
            body: defaultBody,
            headers: {"Content-Type": "application/json"}
        };
        return this.safeFetch(input, mergeInit(defaultInit, init));
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
