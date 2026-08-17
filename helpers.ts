function debounce(fn: Function, delay: number) {
    let timeoutId: NodeJS.Timeout | null;
    return function (...args: any[]) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}

function throttle(fn: Function, limit: number) {
    let lastFn: ReturnType<typeof setTimeout>;
    let lastRan: number;
    return function (...args: any[]) {
        const context = this;
        if (!lastRan) {
            fn.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFn);
            lastFn = setTimeout(function () {
                if ((Date.now() - lastRan) >= limit) {
                    fn.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { debounce, throttle, getRandomInt };