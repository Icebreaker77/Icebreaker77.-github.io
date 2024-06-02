/**
 * Transforms an ISO 8601 date-time string to a format like '10h 45m'.
 * @param dateTimeString - The ISO 8601 date-time string.
 * @returns The formatted time string.
 */
export function formatTime(dateTimeString: string): string {
  const date = new Date(dateTimeString);

  // Get hours and minutes
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');

  // Format the time
  return `${hours}:${minutes}`;
}
