export function isValidInput(input: any): boolean {
    if (typeof input !== 'number') return false;
    if (input < 0) return false;
    return true;
}

export function processInput(input: number): string {
    if (!isValidInput(input)) {
        throw new Error('Invalid input: must be a non-negative number.');
    }
    // Processing logic here  
    return `Processed: ${input}`;
}

export function mainLoop(inputs: number[]): void {
    inputs.forEach((input) => {
        try {
            const result = processInput(input);
            console.log(result);
        } catch (error) {
            console.error(error.message);
        }
    });
}
