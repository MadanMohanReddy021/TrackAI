export const toKey = (date: Date): string => {
  const offset = date.getTimezoneOffset();

  return new Date(date.getTime() - offset * 60000)
    .toISOString()
    .slice(0, 10);
};

export const getLast30Days = () => {
  const days: string[] = [];

  for (let i = 29; i >= 0; i--) {
    const d = new Date();

    d.setDate(d.getDate() - i);

    days.push(toKey(d));
  }

  return days;
};

export const daysBetween = (
  start: string,
  end: string = new Date().toISOString()
) => {
  const diff =
    new Date(end).getTime() - new Date(start).getTime();

  return Math.floor(diff / (1000 * 60 * 60 * 24));
};