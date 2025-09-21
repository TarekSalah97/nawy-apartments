import cors from "cors";

var whitelist = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3003",
];

const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Headers",
    "language",
    "accept-language",
    "authorization",
    "timezone",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: whitelist,
  preflightContinue: false,
};

export { options };
