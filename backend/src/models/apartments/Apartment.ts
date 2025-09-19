import { model, Schema } from "mongoose";
import ModelNames from "../ModelNames";
import IApartmentModel, {
  ApartmentAvailabilityStatus,
  ApartmentFinishingType,
  ApartmentSaleType,
  IApartmentDocument,
} from "./IApartment";

const ApartmentSchema: Schema = new Schema(
  {
    unitName: { type: String, required: true, index: true },
    unitNumber: { type: String, required: true, index: true },
    referenceNumber: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    projectName: { type: String, required: true },
    price: { type: Number, required: true, index: true },
    bedrooms: { type: Number, required: true, index: true },
    bathrooms: { type: Number, required: true },
    areaSqm: { type: Number, required: true, index: true },
    images: [{ type: String }],
    address: { type: String },
    city: { type: String },
    country: { type: String },
    amenities: [
      { type: Schema.Types.ObjectId, ref: ModelNames.ApartmentAmenities },
    ],
    description: { type: String },
    availabilityStatus: {
      type: String,
      enum: Object.values(ApartmentAvailabilityStatus),
      default: ApartmentAvailabilityStatus.AVAILABLE,
    },

    floor: { type: Number },
    yearBuilt: {
      type: Number,
    },
    saleType: {
      type: String,
      required: true,
      enum: Object.values(ApartmentSaleType),
    },
    finishingType: {
      type: String,
      required: true,
      enum: Object.values(ApartmentFinishingType),
    },
    developer: { type: Schema.Types.ObjectId, ref: ModelNames.Developer },
  },
  { timestamps: true }
);

ApartmentSchema.index({
  unitName: "text",
  unitNumber: "text",
  projectName: "text",
});
const Apartment: IApartmentModel = model<IApartmentDocument, IApartmentModel>(
  ModelNames.Apartment,
  ApartmentSchema
);

export default Apartment;
