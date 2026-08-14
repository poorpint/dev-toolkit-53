export function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function isInteger(value: number): boolean {
    return Number.isInteger(value);
}

export function randomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(value, max));
}

export function formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toISOString();
}

export function generateRandomClickPositions(count: number, minX: number, maxX: number, minY: number, maxY: number): { x: number, y: number }[] {
    const positions = [];
    for (let i = 0; i < count; i++) {
        positions.push({
            x: randomInteger(minX, maxX),
            y: randomInteger(minY, maxY)
        });
    }
    return positions;
}