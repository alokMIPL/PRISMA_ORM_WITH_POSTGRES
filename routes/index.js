import { Router } from "express";
import UserRouter from "./userRoutes.js";

const router = Router();

router.use("/api/user", UserRouter);

export default router;