

export async function waitForAnimationFrame(): Promise<number> {
    return new Promise((resolve) => {
        window.requestAnimationFrame(resolve);
    });
}

export async function sleep<T = undefined>(milliseconds: number, extra?: T): Promise<T> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds, extra));
}
