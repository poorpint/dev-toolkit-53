export function validateInput(input: any): boolean {
    if (typeof input !== 'number') return false;
    if (input < 0) return false;
    return true;
}

export function processInput(input: any): string {
    if (!validateInput(input)) {
        throw new Error('Invalid input: must be a positive number.');
    }
    // Process the valid input
    return `Processed: ${input}`;
}

export function mainLoop(inputs: any[]): void {
    for (const input of inputs) {
        try {
            const result = processInput(input);
            console.log(result);
        } catch (error) {
            console.error(error.message);
        }
    }
}