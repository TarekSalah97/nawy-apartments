import { Router } from "express";
import { list, details, add } from "../controllers/apartmentController";
import { createApartmentSchema } from "@pbb/schemas/apartmentSchema";
import { validate } from "@pbb/middleware/validate";

const r = Router();

/**
 * @swagger
 * /apartments:
 *   get:
 *     summary: Get paginated list of apartments with filtering and sorting
 *     tags: [Apartments]
 *     parameters:
 *       - in: query
 *         name: searchQuery
 *         schema:
 *           type: string
 *         description: Search text across unitName, unitNumber, projectName
 *       - in: query
 *         name: project
 *         schema:
 *           type: string
 *         description: Filter by exact project name
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price filter
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price filter
 *       - in: query
 *         name: bedrooms
 *         schema:
 *           type: number
 *         description: Filter by number of bedrooms
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: number
 *           default: 12
 *           maximum: 100
 *         description: Number of items per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [MAX_PRICE, MIN_PRICE, NEWEST]
 *         description: Sort by option
 *     responses:
 *       200:
 *         description: List of apartments with pagination info
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApartmentListResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
r.get("/", list);

/**
 * @swagger
 * /apartments/{id}:
 *   get:
 *     summary: Get a single apartment by ID
 *     tags: [Apartments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the apartment
 *     responses:
 *       200:
 *         description: Apartment details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Apartment'
 *       404:
 *         description: Apartment not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 */
r.get("/:id", details);
/**
 * @swagger
 * /apartments:
 *   post:
 *     summary: Create a new apartment
 *     tags: [Apartments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApartmentRequestBody'
 *     responses:
 *       201:
 *         description: Apartment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Apartment'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 */
r.post("/", validate(createApartmentSchema), add);

export default r;
