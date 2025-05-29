export const getRangeFromValue = (range, value) => {
  let result = null;
  for (let i = 0; i < range.length; i++) {
    const ranges = range[i];
    if (value >= ranges.from && value < ranges.to) {
      result = ranges;
      break;
    }
  }

  if (result) {
    return result?.id;
  }
};
