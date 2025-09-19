import { Document, Model, Types } from "mongoose";

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
export interface IApartmentProps {
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
  amenities?: Types.ObjectId[];
  description?: string;
  availabilityStatus: ApartmentAvailabilityStatus;
  floor?: number;
  yearBuilt?: number;
  saleType: ApartmentSaleType;
  finishingType: ApartmentFinishingType;
  developer?: Types.ObjectId;
}

export interface IApartmentDocument extends IApartmentProps, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export default interface IApartmentModel extends Model<IApartmentDocument> {}
