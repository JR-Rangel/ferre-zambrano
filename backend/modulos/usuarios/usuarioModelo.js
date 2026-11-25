//usuarioModelo.js responde:qué usuario existe en nuestra base de datos con este correo ?
import { conexion } from "../../config/conexion.js";

//función cuya responsabilidad será buscar un usuario por su correo electrónico
async function buscarUsuarioPorCorreo(correo) {
  // Consulta los datos necesarios para la autenticación.
  const sql = `
    SELECT id_usuario, nombre, correo, contrasena, rol, estado
    FROM usuario
    WHERE correo = ?
  `;
  // Ejecuta la consulta enviando el correo como parámetro
  const [filas] = await conexion.execute(sql, [correo]);

  // Devuelve el usuario encontrado o null si no existe.
  return filas[0] ?? null;
}

export { buscarUsuarioPorCorreo };