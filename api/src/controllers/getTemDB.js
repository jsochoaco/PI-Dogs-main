// ¿Qué debe cumplir esta ruta? 
// Obtiene un arreglo de objetos, donde cada objeto es un temperamento.

// Importación de la API_KEY para el endpoint por medio de las variables de entorno Y axios
require('dotenv').config();
const {Temperaments} = require("../db")

const getTemDB = async (req,res) => {
    try {
        const temp = await Temperaments.findAll({
            attributes: ['temperament']
        })
        if (temp) { // Si la API envía información
            return res.status(200).json(temp)
            // Stautos 200: Correcto; OK
        }
        else { // Si la API no envía información
            return res.status(404).send("Not found");
            // Status 404: No encontrado
        }
    } 
    catch (error) { 
        return res.status(500).json({error: error.message})
        // Status 500: Indica un error interno en el servidor
    }
}; 

module.exports = getTemDB