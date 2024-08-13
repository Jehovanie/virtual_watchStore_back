import { Router } from "express";
import * as watchController from "../controllers/watchController";

const router = Router();

router.get("/", watchController.getAllWatch);

router.get("/:watchId", watchController.getDetailWatch);

export default router;
