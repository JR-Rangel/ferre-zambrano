
// Importamos Router de Express.
// Es como un recepcionista que recibe las solicitudes
// y sabe a qué controlador debe enviarlas.
import { Router } from "express";

// Importamos iniciarSesion desde usuarioController.js.
// Esta función recibe los datos del login y llama
// al servicio que comprueba las credenciales.
import { iniciarSesion } from "./usuarioController.js";

// Creamos nuestro enrutador.
// Aquí iremos definiendo las rutas del módulo Usuarios.
const router = Router();

// Si llega una solicitud POST a /login,
// Express la enviará a la función iniciarSesion.
router.post("/login", iniciarSesion);

//  Exportamos el enrutador para poder utilizarlo
// desde nuestro servidor principal.
export { router };

