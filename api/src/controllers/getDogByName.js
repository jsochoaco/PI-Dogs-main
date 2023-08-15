// ¿Qué debe cumplir esta ruta? 
// Esta ruta debe obtener todas aquellas razas de perros que coinciden con el nombre recibido por query. (No es necesario que sea una coincidencia exacta). Debe poder buscarlo independientemente de mayúsculas o minúsculas. Si no existe la raza, debe mostrar un mensaje adecuado. Debe buscar tanto los de la API como los de la base de datos.

// Importación de la API_KEY para el endpoint por medio de las variables de entorno
require('dotenv').config();
const {API_KEY} = process.env;
// Importación de axios 
const  axios = require("axios")
// URL definida de la API para buscar por raza
const URL = "https://api.thedogapi.com/v1/breeds/search?q="

//Creación y construcción del controlador
const getDogByName = async (req, res) => {
    try {
        // Definimos el nombre de la raza por query y lo pasamos a minusculas
        const {name} = req.query
        const namePartial = name.toLowerCase()
        const response = await axios.get(`${URL}${namePartial}`, { 
            headers: { 
                "x-api-key": API_KEY
            }
        });
        const filtradoDogs = response.data
        if (filtradoDogs) {
            return res.status(200).json(filtradoDogs)
            // Retorna el arreglo con los objetos
            // Stautos 200: Correcto; OK
        }
        else { // Si la API no recibe info o no hay coincidencias
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
module.exports = getDogByName

// Nota de axios
// Usamos get para incluir como otro parametro encabezados opcionales, como la APIKEY
// La documentación indica pasarla como un objeto en el cual la propiedad es "x-api-key" y el value es la APIKEY
// Los encabezados (headers) son información adicional que se envía junto con la solicitud para proporcionar detalles específicos