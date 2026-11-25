/*
Aquí utilizamos -- para comentarios porque estamos escribiendo instrucciones SQL dentro de una cadena de texto de JavaScript.
*/
// importamos la conexión que ya configuramos para MySQL.
import { conexion } from "../../config/conexion.js";
// Esta función consulta las existencias de los productos
// traer todos los registros del inventario
async function consultarInventario() {
  // Seleccionamos los datos que necesitamos de las tablas.
  const sql = `
    SELECT
      inventario.id_inventario,
      producto.nombre,
      inventario.stock_actual,
      inventario.stock_minimo,
      inventario.id_producto
    -- Consultamos la tabla inventario.
    FROM inventario
    -- Relacionamos inventario con producto para obtener su nombre.
    INNER JOIN producto
      ON inventario.id_producto = producto.id_producto
    -- Organizamos los resultados por nombre del producto.
    ORDER BY producto.nombre ASC
  `;
  // Ejecutamos la consulta SQL en MySQL.
  // "filas" contiene los registros encontrados.
  const [filas] = await conexion.execute(sql);

  // Devolvemos los registros para que puedan utilizarse
  // desde otras partes de nuestro backend.
  return filas;
}

// Exportamos la función para utilizarla desde el controlador.
export { consultarInventario };
