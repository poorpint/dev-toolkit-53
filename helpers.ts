function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isElementVisible(element: HTMLElement): boolean {
    return element && !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
}

function clickElement(element: HTMLElement): void {
    if (isElementVisible(element)) {
        element.click();
    }
}

export { delay, randomInt, isElementVisible, clickElement };