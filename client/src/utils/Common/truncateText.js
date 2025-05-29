export const truncateText = (text, maxLength) => {
  text = text.toString();
  let lengthText = text.length;
  if (lengthText <= maxLength) {
    return text;
  } else if (lengthText > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
};
