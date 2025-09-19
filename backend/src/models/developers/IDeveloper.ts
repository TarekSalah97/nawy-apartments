import { Document, Model, Types } from "mongoose";

export interface IDeveloperProps {
  name: string;
}

export interface IDeveloperDocument extends IDeveloperProps, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export default interface IDeveloperModel extends Model<IDeveloperDocument> {}
