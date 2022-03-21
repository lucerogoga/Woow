export const abbrevName = (names) => {
  var split_names = names.toLowerCase().trim().split(" "); //[mirian, alejandra]
  if (split_names.length > 1) {
    return `${
      split_names[0].charAt(0).toUpperCase() + split_names[0].slice(1)
    } ${split_names[1].charAt(0).toUpperCase()}.`;
  }
  return `${split_names[0].charAt(0).toUpperCase() + split_names[0].slice(1)}`;
};

export const UpperCaseName = (name) => {
  return name
    .toLowerCase()
    .split(" ")
    .map((el) => `${el.charAt(0).toUpperCase()}${el.slice(1)}`)
    .join(" ");
};
