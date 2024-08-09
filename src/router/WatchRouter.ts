import { Router } from "express";
import * as watchController from "../controllers/watchController";

const router = Router();

router.get("/", watchController.getAllWatch);

export default router;
