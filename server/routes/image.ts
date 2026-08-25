import { Router } from "express";

import { createImage, getImages, deleteImage } from "../controllers/image";
import { requireRole } from "../middleware/auth";

const router = Router();

router.post("/", requireRole("pr"), createImage).get("/", getImages);
router.delete("/:id", requireRole("pr"), deleteImage);

export default router;
