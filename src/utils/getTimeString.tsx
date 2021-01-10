const prependZeroIfSingleDigit = (numericValue: number): string => {
  return numericValue < 10 ? `0${numericValue}` : `${numericValue}`;
};

const convert24HourFormat = (hours: number): number => {
  let convertedHours = hours;

  if (hours > 12) {
    convertedHours = hours - 12;
  }

  if (hours == 0) {
    convertedHours = 12;
  }

  return convertedHours;
};

const determinePeriod = (date: Date): string => {
  return date.getHours() > 12 ? 'PM' : 'AM';
};

const getTimeString = (): string => {
  const date = new Date();
  const period = determinePeriod(date);
  const seconds = prependZeroIfSingleDigit(date.getSeconds());
  const minutes = prependZeroIfSingleDigit(date.getMinutes());
  const hours = prependZeroIfSingleDigit(
    convert24HourFormat(date.getHours())
  );

  return `${hours}:${minutes}:${seconds} ${period}`;
};

export default getTimeString;
