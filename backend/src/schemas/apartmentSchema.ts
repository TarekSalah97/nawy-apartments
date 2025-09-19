// src/schemas/apartmentSchemas.ts
import {
  ApartmentAvailabilityStatus,
  ApartmentFinishingType,
  ApartmentSaleType,
} from "@pbb/models/apartments/IApartment";
import { z } from "zod";

// Reusable ObjectId validator
export const zObjectId = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

// Useful constants
const CURRENT_YEAR = new Date().getFullYear();

// CREATE
export const createApartmentSchema = z
  .object({
    unitName: z.string().trim().min(1, "unitName is required"),
    unitNumber: z.string().trim().min(1, "unitNumber is required"),
    referenceNumber: z.coerce
      .number()
      .int()
      .min(1, "referenceNumber must be >= 1"),
    projectName: z.string().trim().min(1, "projectName is required"),

    price: z.coerce.number().min(0, "price must be >= 0"),
    bedrooms: z.coerce.number().int().min(0, "bedrooms must be >= 0"),
    bathrooms: z.coerce.number().int().min(0, "bathrooms must be >= 0"),
    areaSqm: z.coerce.number().positive("areaSqm must be > 0"),

    images: z.array(z.string().url("images must be valid URLs")).default([]),

    address: z.string().trim().optional(),
    city: z.string().trim().optional(),
    country: z.string().trim().optional(),
    amenities: z.array(zObjectId).optional(),
    description: z.string().optional(),

    availabilityStatus: z
      .nativeEnum(ApartmentAvailabilityStatus)
      .default(ApartmentAvailabilityStatus.AVAILABLE),

    floor: z.coerce.number().int().min(0, "floor must be >= 0").optional(),
    yearBuilt: z.coerce
      .number()
      .int()
      .min(1800, "yearBuilt too small")
      .max(CURRENT_YEAR, "yearBuilt cannot be in the future")
      .optional(),

    saleType: z.nativeEnum(ApartmentSaleType),
    finishingType: z.nativeEnum(ApartmentFinishingType),

    developer: zObjectId.optional(),
  })
  .strict();
