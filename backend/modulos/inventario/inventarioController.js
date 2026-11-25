// este archivo atendera la solicitud HTTP, utiliza el modelo y devuelve una respuesta al cliente
// Importamos la función del modelo que consulta el inventario en MySQL.
import { consultarInventario } from "./inventarioModelo.js";

// Esta función atiende la solicitud para consultar el inventario.
async function obtenerInventario(req, res) {

  try {
    // Solicitamos al modelo los registros del inventario.
    const inventario = await consultarInventario();
    // si la consulta funciona, devolvemos los datos al cliente.
    // el código 200 indica que la solicitud fue atendida correctamente.
    return res.status(200).json(inventario);

  } catch (error) {
    // si ocurre un error inesperado, lo mostramos en la terminal.
    console.error("Error al consultar el inventario:", error);

    // informamos al cliente que no fue posible completar la consulta.
    return res.status(500).json({
      mensaje: "No se pudo consultar el inventario. Intenta nuevamente.",
    });
  }
}
// exportamos la función para utilizarla desde las rutas.
export { obtenerInventario };
