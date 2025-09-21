import { IApartmentAmenities } from "./Amenity";
import { IDeveloper } from "./Developer";

export enum ApartmentSaleType {
  RESALE = "RESALE",
  DEVELOPER_SALE = "DEVELOPER_SALE",
}

export enum ApartmentFinishingType {
  FINISHED = "FINISHED",
  NOT_FINISHED = "NOT_FINISHED",
}

export enum ApartmentAvailabilityStatus {
  AVAILABLE = "AVAILABLE",
  RENTED = "RENTED",
  OFF_MARKET = "OFF_MARKET",
}
export interface IApartment {
  id: string;
  unitName: string;
  unitNumber: string;
  referenceNumber: number;
  projectName: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  areaSqm: number;
  images: string[];
  address?: string;
  city?: string;
  country?: string;
  amenities?: IApartmentAmenities[];
  description?: string;
  availabilityStatus: ApartmentAvailabilityStatus;
  floor?: number;
  yearBuilt?: number;
  saleType: ApartmentSaleType;
  finishingType: ApartmentFinishingType;
  developer?: IDeveloper;
}
