import { IApartment } from "../../models/Apartment";
import { IPageInfo } from "../../models/PageInfo";

export enum SortByOptions {
  MAX_PRICE = "MAX_PRICE",
  MIN_PRICE = "MIN_PRICE",
  NEWEST = "NEWEST",
}
export interface IFilterState {
  apartments: IApartment[];
  sortPopoverOpen?: HTMLElement | null;
  selectedSort?: SortByOptions;
  filterDrawerOpen?: boolean;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  loading?: boolean;
  text?: string;
  pageInfo?: IPageInfo;
  page?: any;
}
