
// Importamos Router de Express.
// Nos permite definir las rutas del módulo Productos.
import { Router } from "express";

// Importamos la función del controlador.
// crearProducto recibe los datos y solicita el registro.
import { crearProducto } from "./productoController.js";


// Creamos el enrutador de Productos.
const router = Router();

// Cuando llegue una solicitud POST,
// Express ejecutará la función crearProducto.
// POST http://localhost:3000/api/productos
router.post("/", crearProducto);

// Exportamos el enrutador para conectarlo
// con nuestra aplicación en servidor.js.
export { router };
