export const getCurrentDateString = (): string => {
  const date = new Date();

  const currentDate =
    (date.getDate() < 10 ? '0' : '') +
    date.getDate() +
    '.' +
    (date.getMonth() + 1 < 10 ? '0' : '') +
    (date.getMonth() + 1) +
    '.' +
    date.getFullYear();

  const currentTime =
    (date.getHours() < 10 ? '0' : '') +
    date.getHours() +
    ':' +
    (date.getMinutes() < 10 ? '0' : '') +
    date.getMinutes() +
    ':' +
    (date.getSeconds() < 10 ? '0' : '') +
    date.getSeconds();

  return `${currentDate} ${currentTime}`;
};
