import { Router } from "express";
import {login, logout, getCurrentUser, addAdmin} from "../controllers/auth";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/me", getCurrentUser);
router.post("/addAdmin", addAdmin);

export default router;