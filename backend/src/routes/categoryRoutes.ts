import { Router } from "express";
import { categories } from "../data/categories";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authenticate, (req, res) => {
  res.json(categories);
});

export default router;
