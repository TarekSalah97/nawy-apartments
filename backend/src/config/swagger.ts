import swaggerJSDoc from "swagger-jsdoc";
import { version } from "../../package.json";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Nawy Apartments API",
      version,
      description: "REST API for apartment listings and management",
      contact: {
        name: "API Support",
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.API_PORT || 4000}/api/v1`,
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        Apartment: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "68cdc3c2784bbe1ee0201092",
              description: "MongoDB ObjectId",
            },
            unitName: { type: "string", example: "Alexandria Corniche" },
            unitNumber: { type: "string", example: "AX-1504" },
            referenceNumber: { type: "number", example: 10001 },
            projectName: { type: "string", example: "San Stefano" },
            price: { type: "number", example: 6800000 },
            bedrooms: { type: "number", example: 3 },
            bathrooms: { type: "number", example: 3 },
            areaSqm: { type: "number", example: 175 },
            images: {
              type: "array",
              items: { type: "string" },
              example: [
                "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
              ],
            },
            address: { type: "string", example: "San Stefano, Alexandria" },
            city: { type: "string", example: "Alexandria" },
            country: { type: "string", example: "Egypt" },
            description: {
              type: "string",
              example: "Sea-line living on the Corniche.",
            },
            availabilityStatus: {
              type: "string",
              enum: ["AVAILABLE", "RENTED", "OFF_MARKET"],
              example: "AVAILABLE",
            },
            floor: { type: "number", example: 15 },
            yearBuilt: { type: "number", example: 2019 },
            saleType: {
              type: "string",
              enum: ["RESALE", "DEVELOPER_SALE"],
              example: "RESALE",
            },
            finishingType: {
              type: "string",
              enum: ["FINISHED", "NOT_FINISHED"],
              example: "FINISHED",
            },
            amenities: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string", example: "68cdc3c2784bbe1ee0201092" },
                  name: { type: "string" },
                  icon: { type: "string" },
                },
              },
            },
            developer: {
              type: "object",
              properties: {
                id: { type: "string", example: "68cdc3c2784bbe1ee0201092" },
                name: { type: "string", example: "TMG" },
              },
            },
          },
        },
        ApartmentRequestBody: {
          type: "object",
          properties: {
            unitName: { type: "string", example: "Alexandria Corniche" },
            unitNumber: { type: "string", example: "AX-1504" },
            referenceNumber: { type: "number", example: 10001 },
            projectName: { type: "string", example: "San Stefano" },
            price: { type: "number", example: 6800000 },
            bedrooms: { type: "number", example: 3 },
            bathrooms: { type: "number", example: 3 },
            areaSqm: { type: "number", example: 175 },
            images: {
              type: "array",
              items: { type: "string" },
              example: [
                "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
              ],
            },
            address: { type: "string", example: "San Stefano, Alexandria" },
            city: { type: "string", example: "Alexandria" },
            country: { type: "string", example: "Egypt" },
            description: {
              type: "string",
              example: "Sea-line living on the Corniche.",
            },
            availabilityStatus: {
              type: "string",
              enum: ["AVAILABLE", "RENTED", "OFF_MARKET"],
              example: "AVAILABLE",
            },
            floor: { type: "number", example: 15 },
            yearBuilt: { type: "number", example: 2019 },
            saleType: {
              type: "string",
              enum: ["RESALE", "DEVELOPER_SALE"],
              example: "RESALE",
            },
            finishingType: {
              type: "string",
              enum: ["FINISHED", "NOT_FINISHED"],
              example: "FINISHED",
            },
            amenities: {
              type: "array",
              items: {
                type: "string",
                example: "68cdc3c2784bbe1ee0201092",
              },
            },
            developer: {
              type: "string",
              example: "68cdc3c2784bbe1ee0201092",
            },
          },
        },
        ApartmentListResponse: {
          type: "object",
          properties: {
            data: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Apartment",
              },
            },
            pageInfo: {
              type: "object",
              properties: {
                page: { type: "number", example: 1 },
                perPage: { type: "number", example: 12 },
                total: { type: "number", example: 21 },
                totalPages: { type: "number", example: 2 },
              },
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: { type: "string" },
            message: { type: "string" },
            details: { type: "array", items: { type: "object" } },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/schemas/*.ts"], // Files containing @swagger annotations
};

export const swaggerSpec = swaggerJSDoc(options);
