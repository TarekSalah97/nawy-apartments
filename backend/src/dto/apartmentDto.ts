import {
  ApartmentAvailabilityStatus,
  ApartmentFinishingType,
  ApartmentSaleType,
} from "@pbb/models/apartments/IApartment";
import { IApartmentAmenitiesDto } from "./departmentAmenitiesDto";
import { IDeveloperDto } from "./developerDto";

export interface IApartmentDto {
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
  amenities?: IApartmentAmenitiesDto[];
  description?: string;
  availabilityStatus: ApartmentAvailabilityStatus;
  floor?: number;
  yearBuilt?: number;
  saleType: ApartmentSaleType;
  finishingType: ApartmentFinishingType;
  developer?: IDeveloperDto;
}
