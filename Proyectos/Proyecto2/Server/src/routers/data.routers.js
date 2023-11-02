import { Router } from "express";
import { getAprobacion, getData, getInicio, getTop3, getTopPromedios } from "../controllers/data.controllers.js";
const router = Router();

router.get('/', getInicio);
router.get('/data', getData);
router.post('/aprobados', getAprobacion)
router.post('/top3', getTop3)
router.post('/top5', getTopPromedios)

export default router;