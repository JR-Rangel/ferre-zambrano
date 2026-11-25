/*
Este controlador tendrá la responsabilidad de recibir los datos enviados(react-postman) y comprobar que sean válidos, llamar a registrarProducto() y devolver una respuesta HTTP
*/
// Importamos la función del modelo que registra productos en MySQL.
import { registrarProducto } from "./productoModelo.js";

// Esta función recibe los datos enviados.
// y comprueba que sean válidos antes de registrar el producto.
async function crearProducto(req, res) {
  //Obtenemos los cuatro datos enviados en el JSON.
  const { nombre, precio_compra, precio_venta, id_categoria } = req.body ?? {};

  //Comprobamos que el nombre sea texto, no esté vacío
  // y no supere los 100 caracteres de nuestra tabla.
  if (
    typeof nombre !== "string" ||
    !nombre.trim() ||
    nombre.trim().length > 100
  ) {
    return res.status(400).json({
      mensaje: "El nombre del producto debe tener entre 1 y 100 caracteres",
    });
  }

  // Comprobamos que los precios sean números válidos
  // y que no tengan valores negativos.
  if (
    typeof precio_compra !== "number" ||
    !Number.isFinite(precio_compra) ||
    precio_compra < 0 ||
    typeof precio_venta !== "number" ||
    !Number.isFinite(precio_venta) ||
    precio_venta < 0
  ) {
    return res.status(400).json({
      mensaje: "Los precios deben ser números válidos y no negativos",
    });
  }

  // Comprobamos que la categoría tenga un identificador
  // numérico entero y positivo.
  if (!Number.isInteger(id_categoria) || id_categoria <= 0) {
    return res.status(400).json({
      mensaje: "El identificador de la categoría no es válido",
    });
  }

  try {
    //Utilizamos nuestro modelo para registrar el producto.
    const idProducto = await registrarProducto(
      nombre.trim(),
      precio_compra,
      precio_venta,
      id_categoria
    );

    //Respondemos con 201 y el ID generado por MySQL.
    return res.status(201).json({
      mensaje: "Producto registrado correctamente",
      id_producto: idProducto,
    });
  } catch (error) {
    // Si la categoría no existe, MySQL rechaza la inserción.
    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        mensaje: "La categoría seleccionada no existe",
      });
    }
    //Mostramos otros errores en la terminal del backend.
    console.error("Error al registrar producto:", error);

    return res.status(500).json({
      mensaje: "No se pudo registrar el producto. Intenta nuevamente.",
    });
  }
}
//Exportamos la función para utilizarla desde las rutas.
export { crearProducto };
