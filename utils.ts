export interface ClickData { timestamp: number; button: string; position: { x: number; y: number; }; }

export class AutoClicker {
    private clickRecords: ClickData[] = [];
    
    logClick(button: string, position: { x: number; y: number; }): void {
        const record: ClickData = { 
            timestamp: Date.now(), 
            button, 
            position 
        }; 
        this.clickRecords.push(record);
    }
    
    getClickData(): ClickData[] {
        return this.clickRecords;
    }
    
    clearClickData(): void {
        this.clickRecords = [];
    }
}