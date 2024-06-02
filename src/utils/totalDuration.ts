/**
 * Converts a total duration in minutes to a formatted string like '11h 20m'.
 * @param totalMinutes - The total duration in minutes.
 * @returns The formatted time string.
 */
export function formatDuration(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}г ${minutes}хв`;
}
