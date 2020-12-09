export const secToString = (s) => {
  const date = new Date(s * 1000);
  return date.toString();
}
