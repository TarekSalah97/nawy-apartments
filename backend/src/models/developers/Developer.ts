import { model, Schema } from "mongoose";
import ModelNames from "../ModelNames";
import IDeveloperModel, { IDeveloperDocument } from "./IDeveloper";

const DeveloperSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Developer: IDeveloperModel = model<IDeveloperDocument, IDeveloperModel>(
  ModelNames.Developer,
  DeveloperSchema
);

export default Developer;
