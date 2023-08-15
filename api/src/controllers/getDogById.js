// ¿Qué debe cumplir esta ruta? 
// Esta ruta obtiene el detalle de una raza específica. Es decir que devuelve un objeto con la información pedida en el detalle de un perro.La raza es recibida por parámetro (ID). Tiene que incluir los datos de los temperamentos asociadas a esta raza. Debe funcionar tanto para los perros de la API como para los de la base de datos.

// Importamos la API_KEY para el endpoint por medio de las variables de entorno
require('dotenv').config();
const {API_KEY} = process.env;
// Importamos axios 
const  axios = require("axios")
// URL definida de la API 
const URL = "https://api.thedogapi.com/v1/breeds"

// Creación y construcción del controlador
const getDogById = async(req,res) => {
    try {
        // Trae el id por params y lo concatena a la URL
        const { id } = req.params
        const response = await axios.get(`${URL}/${id}`, { 
            headers: { 
                "x-api-key": API_KEY
            }
        });
        // Guarda en una constante a response.data para extraer la data que envía el EndPoint
        const dog = response.data
        if (dog) {
            return res.status(200).json(dog)
            // Retorna el arreglo con los objetos
            // Stautos 200: Correcto; OK
        }
        else {// Si la API no envía información o no existe ese ID
        return res.status(404).send("Not found");
        // Retorna un mensaje de error si no se recibe info
        // Status 404: No encontrado
        }
    } 
    catch (error) {
        return res.status(500).json({error: error.message})
        // Retorna un mensaje de error asociado al estado 500
        // Status 500: Indica un error interno en el servidor 
    }
}; 

module.exports = getDogById

// Nota de axios
// Usamos get para incluir como otro parametro encabezados opcionales, como la APIKEY
// La documentación indica pasarla como un objeto en el cual la propiedad es "x-api-key" y el value es la APIKEY
// Los encabezados (headers) son información adicional que se envía junto con la solicitud para proporcionar detalles específicos