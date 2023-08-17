// ¿Qué debe cumplir esta ruta? 
// Obtiene un arreglo de objetos, donde cada objeto es la raza de un perro.

// Importación de la API_KEY para el endpoint por medio de las variables de entorno Y axios
require('dotenv').config();
const  axios = require("axios")
const {Dog} = require("../db")

const getDogsDB = async (req,res) => {
    try {
        const dogs = await Dog.findAll()
        if (dogs) { // Si la API envía información
            return res.status(200).json(dogs)
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

module.exports = getDogsDB