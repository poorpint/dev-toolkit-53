interface ClickPosition {
  x: number;
  y: number;
}

interface AutoclickerData {
  positions: ClickPosition[];
  interval: number;
  count: number;
}

export function validateAutoclickerData(data: AutoclickerData): boolean {
  if (!data || data.interval <= 0 || data.count <= 0) {
    return false;
  }
  if (!data.positions || data.positions.length === 0) {
    return false;
  }
  return data.positions.every((pos) => pos.x >= 0 && pos.y >= 0);
}

export function normalizePositions(positions: ClickPosition[]): ClickPosition[] {
  return positions.map((pos) => ({
    x: Math.round(pos.x),
    y: Math.round(pos.y),
  }));
}

export function calculateTotalDuration(data: AutoclickerData): number {
  return data.interval * data.count;
}

export function mergeClickData(base: AutoclickerData, additional: Partial<AutoclickerData>): AutoclickerData {
  const mergedPositions = additional.positions
    ? normalizePositions(additional.positions)
    : base.positions;
  return {
    positions: mergedPositions,
    interval: additional.interval ?? base.interval,
    count: additional.count ?? base.count,
  };
}

export function filterValidPositions(positions: ClickPosition[]): ClickPosition[] {
  return positions.filter((pos) => pos.x >= 0 && pos.y >= 0);
}

export function generateClickSequence(
  startX: number,
  startY: number,
  deltaX: number,
  deltaY: number,
  steps: number
): ClickPosition[] {
  const sequence: ClickPosition[] = [];
  let currentX = startX;
  let currentY = startY;
  for (let i = 0; i < steps; i++) {
    sequence.push({ x: currentX, y: currentY });
    currentX += deltaX;
    currentY += deltaY;
  }
  return sequence;
}