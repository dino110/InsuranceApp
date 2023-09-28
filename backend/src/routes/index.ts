import express from "express";
import { getInsurancePrice } from "../controllers";

const router: express.Router = express.Router();

router.post("/getPrice", getInsurancePrice);

export default router;
