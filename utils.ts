export function validateInput(input: string): boolean {
    const validPattern = /^[a-zA-Z0-9]+$/;
    return validPattern.test(input);
}

export function mainProcessingLoop(inputs: string[]): void {
    inputs.forEach((input) => {
        if (!validateInput(input)) {
            console.error(`Invalid input: ${input}`);
            return;
        }
        // Proceed with main processing if input is valid
        console.log(`Processing: ${input}`);
        // Additional processing logic here
    });
}