// ¿Qué debe cumplir esta ruta? 
// Esta ruta debe obtener todas aquellas razas de perros que coinciden con el nombre recibido por query. (No es necesario que sea una coincidencia exacta). Debe poder buscarlo independientemente de mayúsculas o minúsculas. Si no existe la raza, debe mostrar un mensaje adecuado. Debe buscar tanto los de la API como los de la base de datos.

// Importación de la API_KEY para el endpoint por medio de las variables de entorno y axios
require('dotenv').config();
const {API_KEY} = process.env;
const  axios = require("axios")
// URL definida de la API para buscar por raza
const URL = "https://api.thedogapi.com/v1/breeds/search?q="
const {Dog} = require("../db");
const { Op } = require('sequelize');

const getDogByName = async (req, res) => {
    try {
        const {name} = req.query
        const namePartial = name.toLowerCase()
        const response = await axios.get(`${URL}${namePartial}`, { 
            headers: { 
                "x-api-key": API_KEY 
            }
        });
        const dbDogs = await Dog.findAll({
            where: {
                name: {
                    [Op.iLike] : `%${namePartial}%`
                }
            }
        })
        const apidogs = response.data
        apidogs.map ((dog)=> {
            dog["origen"] = "API"
           })
        // dbDogs.map ((dog)=> {
        //     return {
        //         ...dog,
        //         origen: "DB"
        // }})
        const filtradoDogs = [...apidogs,...dbDogs]
        if (filtradoDogs.length > 0) {
            return res.status(200).json(filtradoDogs)
            // Stautos 200: Correcto; OK
        }    
    } 
    catch (error) { 
        return res.status(500).json({error: error.message})
        // Status 500: Indica un error interno en el servidor
    }
};
module.exports = getDogByName

// Nota de axios
// Usamos get para incluir como otro parametro encabezados opcionales, como la APIKEY
// La documentación indica pasarla como un objeto en el cual la propiedad es "x-api-key" y el value es la APIKEY
// Los encabezados (headers) son información adicional que se envía junto con la solicitud para proporcionar detalles específicos