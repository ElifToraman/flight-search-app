export const toUTCDate = (localDate) => {
    const timezoneOffset = localDate.getTimezoneOffset() * 60000;
    const utcDate = new Date(localDate.getTime() - timezoneOffset);
    return utcDate.toISOString().split('T')[0];
};
  