import { Router } from "express";
import UserRouter from "./userRoutes.js";
import PostRouter from "./postRoutes.js";

const router = Router();

router.use("/api/user", UserRouter);
router.use("/api/post", PostRouter);

export default router;
