/*
recibe las solicitudes HTTP, extrae los datos necesarios, llama al servicio correspondiente y prepara la respuesta HTTP
*/

import { autenticarUsuario } from "./usuarioServicio.js";

// Atiende las solicitudes HTTP de inicio de sesión.
async function iniciarSesion(req, res) {
  // Obtiene las credenciales enviadas por el cliente.
  const { correo, contrasena } = req.body ?? {};

  // Comprueba que los datos obligatorios sean cadenas no vacías.
  if (
    typeof correo !== "string" ||
    !correo.trim() ||
    typeof contrasena !== "string" ||
    !contrasena
  ) {
    return res.status(400).json({
      mensaje: "Correo y contraseña son obligatorios",
    });
  }

  try {
    // Reutiliza el servicio que comprueba las credenciales.
    const usuario = await autenticarUsuario(correo, contrasena);

    // Rechaza las credenciales que no permiten autenticarse.
    if (!usuario) {
      return res.status(401).json({
        mensaje: "Credenciales inválidas",
      });
    }

    // Responde con los datos permitidos del usuario autenticado.
    return res.status(200).json({
      mensaje: "Credenciales verificadas correctamente",
      usuario,
    });
  } catch (error) {
    // Registra el error en el servidor sin exponer detalles al cliente.
    console.error("Error al autenticar usuario:", error);

    return res.status(500).json({
      mensaje: "Error interno del servidor",
    });
  }
}

export { iniciarSesion };

