import { Router } from "express";
import UserRouter from "./userRoutes.js";
import PostRouter from "./postRoutes.js";
import CommentRouter from "./commentRoutes.js";

const router = Router();

router.use("/api/user", UserRouter);
router.use("/api/post", PostRouter);
router.use("/api/comment", CommentRouter);

export default router;
