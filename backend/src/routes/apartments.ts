import { Router } from "express";
import { list, details, add } from "../controllers/apartmentController";
import { createApartmentSchema } from "@pbb/schemas/apartmentSchema";
import { validate } from "@pbb/middleware/validate";

const r = Router();

r.get("/", list);
r.get("/:id", details);
r.post("/", validate(createApartmentSchema), add);

export default r;
