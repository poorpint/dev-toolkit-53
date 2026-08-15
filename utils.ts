export interface ClickData {  timestamp: number;  x: number;  y: number;}

export function calculateClicksPerSecond(clicks: ClickData[], durationInSeconds: number): number {  if (durationInSeconds <= 0) return 0;  return clicks.length / durationInSeconds;}

export function filterClicksByTimeRange(clicks: ClickData[], startTime: number, endTime: number): ClickData[] {  return clicks.filter(click => click.timestamp >= startTime && click.timestamp <= endTime);}

export function groupClicksByInterval(clicks: ClickData[], interval: number): Map<string, ClickData[]> {  const groupedClicks = new Map<string, ClickData[]>();  clicks.forEach(click => {    const timeGroup = Math.floor(click.timestamp / interval) * interval;    if (!groupedClicks.has(timeGroup.toString())) {      groupedClicks.set(timeGroup.toString(), []);    }    groupedClicks.get(timeGroup.toString())!.push(click);  });  return groupedClicks;}
