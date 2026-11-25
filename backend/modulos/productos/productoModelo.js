
//  Importamos la conexión a MySQL que ya tenemos configurada.
// Así reutilizamos el mismo pool y no creamos otra conexión.
import { conexion } from "../../config/conexion.js";

// Esta función recibe los datos de un producto
// y se encarga de registrarlo en la tabla producto.
async function registrarProducto(nombre, precioCompra, precioVenta, idCategoria) {
  // Indicamos los campos donde guardaremos la información.
  // Los signos ? representan los cuatro valores que vamos a enviar.
  const sql = `
    INSERT INTO producto (nombre, precio_compra, precio_venta, id_categoria)
    VALUES (?, ?, ?, ?)
  `;

  // Ejecutamos el INSERT enviando los datos en el mismo orden
  // en que aparecen las columnas de nuestra consulta.
  const [resultado] = await conexion.execute(sql, [
    nombre,
    precioCompra,
    precioVenta,
    idCategoria,
  ]);

  // Devolvemos el ID que MySQL asignó al producto registrado.
  return resultado.insertId;
}

// 6. Exportamos la función para utilizarla desde otro archivo.
export { registrarProducto };
