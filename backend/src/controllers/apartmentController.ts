import { Request, Response } from "express";
import { parsePagination } from "../utils/pagination";
import {
  listApartments,
  getApartmentById,
  createApartment,
} from "@pbb/services/ApartmentService";
import { mapApartment } from "@pbb/mappers/apartmentMapper";

export async function list(req: Request, res: Response) {
  const { page, perPage, skip } = parsePagination(req.query);

  const { searchQuery, project, minPrice, maxPrice, bedrooms, sortBy } =
    req.query as any;
  const { items, total } = await listApartments({
    searchQuery,
    project,
    minPrice: minPrice !== undefined ? Number(minPrice) : undefined,
    maxPrice: maxPrice !== undefined ? Number(maxPrice) : undefined,
    bedrooms: bedrooms !== undefined ? Number(bedrooms) : undefined,
    page,
    perPage,
    skip,
    sortBy,
  });

  const mappedApartments = items.map((apt) => mapApartment(apt));

  res.json({
    data: mappedApartments,
    pageInfo: { page, perPage, total, totalPages: Math.ceil(total / perPage) },
  });
}

export async function details(req: Request, res: Response) {
  const apt = await getApartmentById(req.params.id);
  if (!apt) return res.status(404).json({ error: "NotFound" });
  res.json(mapApartment(apt));
}

export async function add(req: Request, res: Response) {
  const created = await createApartment(req.body);
  res.status(201).json(created);
}
