import Apartment from "@pbb/models/apartments/Apartment";
import { IApartmentProps } from "@pbb/models/apartments/IApartment";
import { FilterQuery } from "mongoose";

export enum SortByOptions {
  MAX_PRICE = "MAX_PRICE",
  MIN_PRICE = "MIN_PRICE",
  NEWEST = "NEWEST",
}
type ListArgs = {
  searchQuery?: string;
  project?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  page: number;
  perPage: number;
  skip: number;
  sortBy?: SortByOptions;
};

export async function listApartments(args: ListArgs) {
  const filter: FilterQuery<IApartmentProps> = {};

  if (args.project)
    filter.projectName = new RegExp(`^${escapeRegex(args.project)}$`, "i");
  if (args.bedrooms !== undefined) {
    if (args.bedrooms < 3) filter.bedrooms = args.bedrooms;
    else filter.bedrooms = { $gte: args.bedrooms };
  }
  if (args.minPrice !== undefined || args.maxPrice !== undefined) {
    filter.price = {};
    if (args.minPrice !== undefined) filter.price.$gte = args.minPrice;
    if (args.maxPrice !== undefined) filter.price.$lte = args.maxPrice;
  }

  if (args.searchQuery && args.searchQuery.trim().length) {
    filter.$or = [
      { unitName: new RegExp(escapeRegex(args.searchQuery), "i") },
      { unitNumber: new RegExp(escapeRegex(args.searchQuery), "i") },
      { projectName: new RegExp(escapeRegex(args.searchQuery), "i") },
    ];
  }

  let sort: Record<string, 1 | -1> = {};

  if (args.sortBy) {
    if (args.sortBy === SortByOptions.MAX_PRICE) sort = { price: -1 };
    if (args.sortBy === SortByOptions.MIN_PRICE) sort = { price: 1 };
  }

  sort.createdAt = -1; // tie breaker

  const [items, total] = await Promise.all([
    Apartment.find(filter)
      .populate("amenities developer")
      .sort(sort)
      .skip(args.skip)
      .limit(args.perPage),
    Apartment.countDocuments(filter),
  ]);

  return { items, total };
}

export async function getApartmentById(id: string) {
  return Apartment.findById(id).populate("amenities developer");
}

export async function createApartment(payload: Partial<IApartmentProps>) {
  const apt = new Apartment(payload as any);
  return apt.save();
}

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
