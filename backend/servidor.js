// servidor.js inicia la aplicación y permite recibir solicitudes HTTP
import express from "express";
import { conexion } from "./config/conexion.js";
// Traemos las rutas del módulo Usuarios para conectarlas al servidor.
import { router as usuarioRutas } from "./modulos/usuarios/usuarioRutas.js";
// Importamos las rutas del modulo Categorías.
import { router as categoriaRutas } from "./modulos/categorias/categoriaRutas.js";
// Traemos las rutas del modulo Productos.
import { router as productoRutas } from "./modulos/productos/productoRutas.js";
// Traemos las rutas del módulo Inventario.
import { router as inventarioRutas } from "./modulos/inventario/inventarioRutas.js";


const app = express();
const PUERTO = 3000;

//permite que express lea los datos json enviados
app.use(express.json());
//conectamos  las rutas de Usuarios bajo la dirección /api/usuarios.
//Cuando una solicitud llegue a una dirección que comience por /api/usuarios, utiliza las rutas definidas en usuarioRutas.js
app.use("/api/usuarios", usuarioRutas);
// Conectamos las rutas de Categorías con nuestro servidor.
app.use("/api/categorias", categoriaRutas);
// Conectamos las rutas de Productos con nuestro servidor.
app.use("/api/productos", productoRutas);
// Conectamos las rutas del módulo Inventario con Express.
app.use("/api/inventario", inventarioRutas);

async function verificarConexionBD() {
  try {
    await conexion.query("SELECT 1");
    console.log("Conexión con MySQL verificada correctamente");
    return true;
  } catch (error) {
    console.error("Error al conectar con MySQL:", error.message);
    return false;
  }
}
/*
La función iniciarServidor() coordina el arranque:
- Primero ejecuta verificarConexionBD().
- Espera el resultado mediante await.
- Si el resultado es false, no inicia Express.
- Si es true, ejecuta app.listen().
*/
async function iniciarServidor() {
  const conexionCorrecta = await verificarConexionBD();
  if (!conexionCorrecta) {
    return;
  }
  app.listen(PUERTO, () => {
    console.log(`Servidor ejecutándose en el puerto ${PUERTO}`);
  });
}
iniciarServidor();
