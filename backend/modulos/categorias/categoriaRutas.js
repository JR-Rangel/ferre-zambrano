
import { Router } from "express";

// Importamos las funciones del controlador de Categorías.
import { obtenerCategorias, crearCategoria } from "./categoriaController.js";

// Creamos el enrutador del módulo Categorías.
const router = Router();

// GET permite consultar todas las categorías registradas.
// GET http://localhost:3000/api/categorias
router.get("/", obtenerCategorias);

// POST permite registrar una nueva categoría.
// POST http://localhost:3000/api/categorias
router.post("/", crearCategoria);

// Exportamos las rutas para utilizarlas desde servidor.js.
export { router };
