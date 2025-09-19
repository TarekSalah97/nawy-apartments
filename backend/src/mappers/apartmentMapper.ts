import { IApartmentDto } from "@pbb/dto/apartmentDto";
import { IApartmentAmenitiesDocument } from "@pbb/models/apartmentAmenities/IApartmentAmenities";
import { IApartmentDocument } from "@pbb/models/apartments/IApartment";
import { IDeveloperDocument } from "@pbb/models/developers/IDeveloper";
import { mapDeveloper } from "./developerMapper";
import { mapApartmentAmenities } from "./apartmentAmenitiesMapper";

export function mapApartment(apartment: IApartmentDocument): IApartmentDto {
  const developer: IDeveloperDocument | undefined = apartment.developer as any;
  const amenities: IApartmentAmenitiesDocument[] = apartment.amenities as any;

  const mappedDeveloper = developer ? mapDeveloper(developer) : undefined;
  const mappedAmenities = amenities.map((amenity) =>
    mapApartmentAmenities(amenity)
  );

  return {
    id: apartment._id.toString(),
    unitName: apartment.unitName,
    unitNumber: apartment.unitNumber,
    referenceNumber: apartment.referenceNumber,
    projectName: apartment.projectName,
    price: apartment.price,
    bedrooms: apartment.bedrooms,
    bathrooms: apartment.bathrooms,
    areaSqm: apartment.areaSqm,
    images: apartment.images,
    address: apartment.address,
    city: apartment.city,
    country: apartment.country,
    description: apartment.description,
    availabilityStatus: apartment.availabilityStatus,
    floor: apartment.floor,
    yearBuilt: apartment.yearBuilt,
    saleType: apartment.saleType,
    finishingType: apartment.finishingType,
    amenities: mappedAmenities,
    developer: mappedDeveloper,
  };
}
