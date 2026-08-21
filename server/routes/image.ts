import { Router } from "express";

import { createImage, getImages, deleteImage } from "../controllers/image";

const router = Router();

router.post("/", createImage).get("/", getImages);
router.delete("/:id", deleteImage);

export default router;
