export const format_date = (value: string | Date): string => {
  const date = typeof value === 'string' ? new Date(value) : value;

  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};
