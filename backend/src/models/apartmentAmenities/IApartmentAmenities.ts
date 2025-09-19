import { Document, Model, Types } from "mongoose";

export interface IApartmentAmenitiesProps {
  name: string;
  icon: string;
}

export interface IApartmentAmenitiesDocument extends IApartmentAmenitiesProps, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export default interface IApartmentAmenitiesModel extends Model<IApartmentAmenitiesDocument> {}
