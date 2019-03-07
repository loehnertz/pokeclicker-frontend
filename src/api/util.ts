
const API_ROOT = (process.env.REACT_APP_POKECLICKER_API_ROOT as string).replace(/[\/]*$/, '/');

export class StatusError extends Error {
    status: number;
    statusText: string;
    response: Response;

    constructor(status: number, statusText: string, response: Response){
        super(`${status} ${statusText}`);
        this.status = status;
        this.statusText = statusText;
        this.response = response;
    }
}


export class Session {
    static instance: Session;
    headers: Headers;
    
    constructor(){
        this.headers = new Headers();
    }

    async setHeader(name: string, value: string){
        this.headers.set(name, value);
    }

    async addHeaders(headers: Headers){
        this.headers = new Headers({...this.headers})
    }

    async setToken(token: string){
        this.setHeader('Authorization', `Token ${token}`)
    }

    async fetch(input: RequestInfo): Promise<Response>{
        return await fetch(input, {headers: this.headers});
    }

    async safeFetch(input: RequestInfo): Promise<Response> {
        const response = await this.fetch(input);
        if(response.status >= 400){
            throw new StatusError(response.status, response.statusText, response);
        }
        return response;
    }

    static getInstance(){
        if(Session.instance == null)
            Session.instance = new Session();
        return Session.instance;
    }
}

export function url(parts: TemplateStringsArray, ...params: any[]): string{
    const result: any[] = [API_ROOT];
    let i;
    for(i = 0; i < parts.length; i++){
        result.push(parts[i]);
        result.push(params[i]);
    }
    result.push(parts[i]);
    return result.join("");
}