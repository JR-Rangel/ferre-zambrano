/*este archivo se encargará de:
aplicar las reglas necesarias para comprobar las credenciales.
responderá: este usuario cumple las condiciones necesarias para autenticarse
*/
import bcrypt from "bcrypt"; //nos permite verificar contraseñas
import { buscarUsuarioPorCorreo } from "./usuarioModelo.js"; //reutiliza la consulta que ya construimos

// Comprueba las credenciales y el estado de un usuario.
async function autenticarUsuario(correo, contrasena) {
  // Consulta el usuario registrado con ese correo.
  const usuario = await buscarUsuarioPorCorreo(correo);

  // Rechaza el acceso si la cuenta no existe o está inactiva.
  if (!usuario || usuario.estado !== 1) {
    return null;
  }

  // Compara la contraseña ingresada con el hash almacenado.
  const contrasenaValida = await bcrypt.compare(
    contrasena,
    usuario.contrasena
  );

  // Rechaza el acceso si la contraseña es incorrecta.
  if (!contrasenaValida) {
    return null;
  }

  // Devuelve únicamente los datos necesarios del usuario autenticado.
  return {
    id_usuario: usuario.id_usuario,
    nombre: usuario.nombre,
    correo: usuario.correo,
    rol: usuario.rol,
  };
}

export { autenticarUsuario };
