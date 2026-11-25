// su responsabilidad sera llamar a funcion consultarCategoias y devolver las categorias mediante mediante respuesta http en formato json.

//  Importamos la función que ya construimos en categoriaModelo.js.
// Esta función consulta MySQL y devuelve las categorías registradas.
import { 
    consultarCategorias,
    registrarCategoria,
} from "./categoriaModelo.js";

// Creamos la función que atenderá la solicitud HTTP.
// req representa la solicitud y res permite enviar la respuesta.
async function obtenerCategorias(req, res) {
  try {
    //Llamamos al modelo y esperamos las categorías de MySQL.
    const categorias = await consultarCategorias();
    // respondemos con código 200 y las categorías en formato JSON.
    return res.status(200).json(categorias);
  } catch (error) {
    // Si ocurre un error, lo registramos en la terminal del backend.
    console.error("Error al consultar categorías:", error);
    // Informamos al cliente sin mostrar detalles internos.
    return res.status(500).json({
      mensaje: "Error interno al consultar categorías",
    });
  }
}

/*
  Esta función recibe el nombre de una nueva categoría
  desde Postman, comprueba los datos y solicita
  al modelo que la registre en MySQL.
*/
async function crearCategoria(req, res) {
  // 1. Obtenemos el nombre enviado en el JSON del cliente.
  const { nombre_categoria } = req.body ?? {};

  // 2. Comprobamos que sea texto y que no esté vacío.
  if (
    typeof nombre_categoria !== "string" ||
    !nombre_categoria.trim()
  ) {
    return res.status(400).json({
      mensaje: "El nombre de la categoría es obligatorio",
    });
  }

  // 3. Comprobamos que no supere los 100 caracteres
  // permitidos por nuestra columna VARCHAR(100) de MySQL.
  if (nombre_categoria.trim().length > 100) {
    return res.status(400).json({
      mensaje: "El nombre no puede superar los 100 caracteres",
    });
  }

  try {
    //  Enviamos el nombre al modelo sin espacios sobrantes.
    // El modelo registra la categoría y devuelve su nuevo ID.
    const idCategoria = await registrarCategoria(nombre_categoria.trim());

    // Respondemos indicando que la categoría fue creada.
    // El código 201 significa que se registró un nuevo recurso.
    return res.status(201).json({
      mensaje: "Categoría registrada correctamente",
      id_categoria: idCategoria,
    });
  } catch (error) {
    // Mostramos el error en la terminal del backend.
    console.error("Error al registrar categoría:", error);

    // Informamos al cliente sin mostrar detalles internos.
    return res.status(500).json({
      mensaje: "No se pudo registrar la categoría. Intenta nuevamente.",
    });
  }
}

// exportamos la función para utilizarla desde las rutas
export { obtenerCategorias, crearCategoria  };
