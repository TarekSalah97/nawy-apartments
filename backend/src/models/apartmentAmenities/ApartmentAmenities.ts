import { model, Schema } from "mongoose";
import ModelNames from "../ModelNames";
import IApartmentAmenitiesModel, {
  IApartmentAmenitiesDocument,
} from "./IApartmentAmenities";

const ApartmentAmenitiesSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ApartmentAmenities: IApartmentAmenitiesModel = model<
  IApartmentAmenitiesDocument,
  IApartmentAmenitiesModel
>(ModelNames.ApartmentAmenities, ApartmentAmenitiesSchema);

export default ApartmentAmenities;
