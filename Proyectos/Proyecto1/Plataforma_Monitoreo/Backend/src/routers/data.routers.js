import { Router } from "express";
import { getDatos, getInicio } from "../controllers/data.controllers.js";
const router = Router();

router.get('/', getInicio);
router.get('/datos', getDatos);

export default router;