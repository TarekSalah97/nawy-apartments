import { Router } from "express";
import apartments from "./apartments";

const r = Router();
r.use("/apartments", apartments);

export default r;
