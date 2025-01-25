import { Router } from "express";
import { products } from "../data/products";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authenticate, (req, res) => {
  res.json(products);
});

export default router;
