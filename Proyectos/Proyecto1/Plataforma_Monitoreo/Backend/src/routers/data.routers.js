import { Router } from "express";
import { enviarIps, getInicio, matarProceso, obtenerDatos, obtenerDatosGraficaTotal, obtenerIps, obtenerProcesos } from "../controllers/data.controllers.js";
const router = Router();

router.get('/', getInicio);
router.post('/datos', obtenerDatos);
router.post('/ips', obtenerIps);
router.get('/vms', enviarIps);
router.post('/matar', matarProceso);
router.post('/historial', obtenerDatosGraficaTotal)
router.post('/procesos', obtenerProcesos)
export default router;