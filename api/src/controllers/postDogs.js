// ¿Qué debe cumplir esta ruta? 
// Esta ruta recibirá todos los datos necesarios para crear un nuevo perro y relacionarlo con los temperamentos asociados. Toda la información debe ser recibida por body. Debe crear la raza de perro en la base de datos, y esta debe estar relacionada con los temperamentos indicados (al menos uno).

// Importa el modelo Dog de la DB y Temperaments
const {Dog, Temperaments} = require("../db")

const postDogs = async (req,res) => {
    try {
        const {name, height, weight, life_span, temperaments} = req.body

        if (!name || !height || !weight || !life_span || !temperaments) {
            return res.status(400).send("Faltan datos")
            // Status 404: No encontrado
        }
        const [dog, creado] = await Dog.findOrCreate({
            where: {name},
            defaults: { height, weight, life_span}
        })
        const arrayTemperamentos = temperaments.split(",").map(word => {
            const lowerCaseWord = word.toLowerCase();
            const capitalizedWord = lowerCaseWord.charAt(0).toUpperCase() + lowerCaseWord.slice(1);
            return capitalizedWord;})
        arrayTemperamentos.forEach(async (temperamento) => {
            await Temperaments.findOrCreate({
                where: {temperamento},}
                )
        });
        arrayTemperamentos.forEach(async (temperamento) => {
            const [temperament, _] = await Temperaments.findOrCreate(
                {where: { temperamento }});
            await dog.addTemperament(temperament);
        })
        if (!creado) {
            return res.status(409).send("El perro ya existe");
            // Status 409: Conflicto
        }
        else {
            return res.status(200).json([dog, creado])
            // Stautos 200: Correcto; OK
        }

    } 
    catch (error) {
        return res.status(500).json({error: error.message})
        // Status 500: Indica un error interno en el servidor 
    }
};

module.exports = postDogs