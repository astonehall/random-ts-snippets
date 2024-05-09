export const capitalizeWords = (str: string): string => {
  return str.replace(/\b\w/g, (match: string) => match.toUpperCase());
};

export const capitalizeSentence = (str: string): string => {
  return str.replace(/^\w/, (match: string) => match.toUpperCase());
};

export const initials = (str: string) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");
};

