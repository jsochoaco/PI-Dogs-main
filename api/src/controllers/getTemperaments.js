// ¿Qué debe cumplir esta ruta? 
// Obtiene todos los temperamentos existentes. Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo). Luego de obtenerlos de la API, deben ser guardados en la base de datos para su posterior consumo desde allí.

// Importación de la API_KEY para el endpoint por medio de las variables de entorno Y axios
require('dotenv').config();
const {API_KEY} = process.env;
const  axios = require("axios")
const {Temperaments} = require("../db")
// URL definida de la API 
const URL = "https://api.thedogapi.com/v1/breeds"

const getTemperaments = async(req,res) => {
    try {
        const response = await axios.get(URL, { 
            headers: { 
                "x-api-key": API_KEY
            }
        });
        const dogs = response.data
        let temperamentos = []
        dogs.forEach(async (dog) => {
            if (dog.temperament) {
                const temp = dog.temperament
                const separado = temp.split(',').map((word) => ({ temperamento: word.trim() }));
                temperamentos = [...temperamentos, ...separado]
            }
        });
        if (temperamentos.length> 0) {
            temperamentos.forEach(async (temp) => {
                const temperamento = temp.temperamento
                await Temperaments.findOrCreate({
                    where: {temperamento: temperamento}})
            })
            return res.status(200).json("Enviado")
            // Stautos 200: Correcto; OK
            }
        else {
            return res.status(400).json("No hay data") 
        }

    } 
    catch (error) { 
        return res.status(500).json({error: error.message})
        // Status 500: Indica un error interno en el servidor
    }
}


module.exports = getTemperaments