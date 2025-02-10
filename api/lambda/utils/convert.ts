export function convertToBillions(num: number) {
  // if (num < 100000000) {
  //   return num;
  // }
  return Number((num / 100000000).toFixed(4));
}
