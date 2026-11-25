//config/conexion.js intenta establecer la conexión con MySQL.
//// Configura y exporta el pool de conexiones a MySQL.S
import mysql from "mysql2/promise";


process.loadEnvFile(); //nos permite cargar las variables declaradas en archivo .env


const configuracionBD = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}; // process.env proporciona acceso a las variables declaradas

//crea un pool de conexiones reutilizables con MySQL.
const conexion = mysql.createPool(configuracionBD);
//permite que otros módulos utilicen ese administrador
export { conexion };



