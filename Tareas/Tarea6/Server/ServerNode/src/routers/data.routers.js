import { Router } from "express";
import { getAlbumes, getInicio } from "../controllers/data.controllers.js";
const router = Router();

router.get('/', getInicio);
router.get('/albumes', getAlbumes);

export default router;