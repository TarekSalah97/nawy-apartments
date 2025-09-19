import { IDeveloperDto } from "@pbb/dto/developerDto";
import { IDeveloperDocument } from "@pbb/models/developers/IDeveloper";

export function mapDeveloper(developer: IDeveloperDocument): IDeveloperDto {
  return {
    id: developer._id.toString(),
    name: developer.name,
  };
}
