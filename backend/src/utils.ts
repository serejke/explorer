export function limitWith(value: number | undefined, limit: number): number {
  if (!value || value < 0 || value > limit) {
    return limit;
  }
  return value;
}