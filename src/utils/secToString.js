export const secToString = (s) => {
  const date = new Date(s * 1000);
  const options = { hour12: false };
  return date.toLocaleString('en-us', options);
}
