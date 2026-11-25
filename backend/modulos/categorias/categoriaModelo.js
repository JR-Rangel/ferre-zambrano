
import { conexion } from "../../config/conexion.js";

// Consulta todas las categorías registradas en MySQL.
async function consultarCategorias() {
  // Seleccionamos el identificador y nombre de cada categoría.
  const sql = `
    SELECT id_categoria, nombre_categoria
    FROM categoria
    ORDER BY nombre_categoria ASC
  `;
//ORDER BY nombre_categoria ASC :organiza las categorías alfabéticamente de forma ascendente
  // Ejecutamos la consulta utilizando la conexión existente.
  const [filas] = await conexion.execute(sql);

  // Devolvemos las categorías encontradas.
  return filas;
}

// Recibe el nombre de una categoría y la registra en MySQL.
async function registrarCategoria(nombreCategoria) {
  // Indicamos en qué tabla y columna guardaremos el nombre.
  // El signo ? representa el dato que recibimos como parámetro.
  const sql = `
    INSERT INTO categoria (nombre_categoria)
    VALUES (?)
  `;
  // Ejecutamos el INSERT enviando el nombre de la categoría.
  const [resultado] = await conexion.execute(sql, [nombreCategoria]);
  // Devolvemos el identificador que MySQL asignó al nuevo registro.
  return resultado.insertId;
}

export { consultarCategorias, registrarCategoria };
