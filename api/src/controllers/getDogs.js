// ¿Qué debe cumplir esta ruta? 
// Obtiene un arreglo de objetos, donde cada objeto es la raza de un perro.

// Importación de la API_KEY para el endpoint por medio de las variables de entorno
require('dotenv').config();
const {API_KEY} = process.env;
// Importación de axios 
const  axios = require("axios")
// URL definida de la API 
const URL = "https://api.thedogapi.com/v1/breeds"
// Creación y construcción del controlador
const getDogs = async (req,res) => {
    try {
        const response = await axios.get(URL, { 
            headers: { 
                "x-api-key": API_KEY
            }
        });
        // Guarda en una constante a response.data para extraer la data que envía el EndPoint
        const dogs = response.data
        if (dogs) { // Si la API envía información
            return res.status(200).json(dogs)
            // Retorna el arreglo con los objetos
            // Stautos 200: Correcto; OK
        }
        else { // Si la API no envía información
            return res.status(404).send("Not found");
            // Retorna un mensaje de error si no se recibe info
            // Status 404: No encontrado
        }
    } 
    catch (error) { // Manejo de error
        return res.status(500).json({error: error.message})
        // Retorna un mensaje de error asociado al estado 500
        // Status 500: Indica un error interno en el servidor
    }
}; 
// Puesta a disposición del controller
module.exports = getDogs

// Nota de axios.
// Usamos get para incluir como otro parametro encabezados opcionales, como la APIKEY.
// La documentación indica pasarla como un objeto en el cual la propiedad es "x-api-key" y el value es la APIKEY.
// Los encabezados (headers) son información adicional que se envía junto con la solicitud para proporcionar detalles específicos.