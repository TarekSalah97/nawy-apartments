import { IApartmentAmenitiesDto } from "@pbb/dto/departmentAmenitiesDto";
import { IApartmentAmenitiesDocument } from "@pbb/models/apartmentAmenities/IApartmentAmenities";

export function mapApartmentAmenities(
  apartmentAmenities: IApartmentAmenitiesDocument
): IApartmentAmenitiesDto {
  return {
    id: apartmentAmenities._id.toString(),
    name: apartmentAmenities.name,
    icon: apartmentAmenities.icon,
  };
}
