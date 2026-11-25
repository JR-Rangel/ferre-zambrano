
// Importamos Router para definir las rutas del módulo Inventario.
import { Router } from "express";
// Importamos la función del controlador que atiende
// las solicitudes de consulta del inventario.
import { obtenerInventario } from "./inventarioController.js";
// Creamos el enrutador del módulo Inventario.
const router = Router();
// Cuando llegue una solicitud GET, Express ejecutará
// la función obtenerInventario del controlador.
router.get("/", obtenerInventario);
// Exportamos el enrutador para conectarlo con servidor.js.
export { router };
