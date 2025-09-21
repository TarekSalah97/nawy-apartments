import { SortByOptions } from "../filters/types";

export const SortOptions = [
  {
    text: "Newest",
    key: SortByOptions.NEWEST,
  },
  {
    text: "Price high to low",
    key: SortByOptions.MAX_PRICE,
  },
  {
    text: "Price low to high",
    key: SortByOptions.MIN_PRICE,
  },
];
