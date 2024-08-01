import { Router } from "express";
import * as testController from "../controllers/testController";

const router = Router();

router.get("/ping", testController.getPong);

export default router;
