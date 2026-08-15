export const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

export const isValidClickInterval = (interval: number): boolean => interval > 0;

export const getRandomInterval = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

export const cloneObject = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

export const mergeObjects = <T, U>(obj1: T, obj2: U): T & U => ({ ...obj1, ...obj2 });

export const isNullOrUndefined = <T>(value: T): value is null | undefined => value === null || value === undefined;

export const formatTime = (milliseconds: number): string => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};