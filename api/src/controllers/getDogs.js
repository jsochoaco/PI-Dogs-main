// ¿Qué debe cumplir esta ruta? 
// Obtiene un arreglo de objetos, donde cada objeto es la raza de un perro.
// Importación de la API_KEY para el endpoint por medio de las variables de entorno Y axios
require('dotenv').config();
const {API_KEY} = process.env;
const  axios = require("axios")
// URL definida de la API 
const URL = "https://api.thedogapi.com/v1/breeds"
const getDogs = async (req,res) => {
    try {
        const response = await axios.get(URL, { 
            headers: { 
                "x-api-key": API_KEY
            }});
        const dogs = response.data
        if (dogs) { // Si la API envía información
            return res.status(200).json(dogs)
            // Stautos 200: Correcto; OK
        }
        else { // Si la API no envía información
            return res.status(404).send("Not found");
            // Status 404: No encontrado
        }} 
    catch (error) { 
        return res.status(500).json({error: error.message})
        // Status 500: Indica un error interno en el servidor
    }
}; 
module.exports = getDogs
// Nota de axios.
// Usamos get para incluir como otro parametro encabezados opcionales, como la APIKEY.
// La documentación indica pasarla como un objeto en el cual la propiedad es "x-api-key" y el value es la APIKEY.
// Los encabezados (headers) son información adicional que se envía junto con la solicitud para proporcionar detalles específicos.