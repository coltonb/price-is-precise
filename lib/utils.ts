import ms from "ms";

export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  if (!timestamp) return "never";
  return `${ms(Date.now() - new Date(timestamp).getTime())}${
    timeOnly ? "" : " ago"
  }`;
};

export const selectColor = (colorNum: number): string => {
  return "hsl(" + ((colorNum * 25) % 360) + ",100%,75%)";
};
