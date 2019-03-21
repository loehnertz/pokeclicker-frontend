
export function throttle<TCb extends (...args: any[]) => void>(
    callback: TCb,
    perSecondRate: number,
    burst: number = 1
): TCb {

    let semaphore = burst;

    return ((...args: any[]) => {
        if(semaphore <= 0) {
            return;
        }
        window.setTimeout(() => { semaphore++; }, 1000 / perSecondRate);
        semaphore--;
        callback(...args);
    }) as TCb;
}
