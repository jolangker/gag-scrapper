export function formatDisplayDate(isoDate: string): string {
  const date = new Date(isoDate);

  return date.toLocaleString('en-US', {
    dateStyle: 'long',
    timeStyle: 'short'
  });
}
