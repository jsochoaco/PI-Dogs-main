// ¿Qué debe cumplir esta ruta? 
// Esta ruta recibirá todos los datos necesarios para crear un nuevo perro y relacionarlo con los temperamentos asociados. Toda la información debe ser recibida por body. Debe crear la raza de perro en la base de datos, y esta debe estar relacionada con los temperamentos indicados (al menos uno).

// Importa el modelo Dog de la DB y Temperaments
const {Dog, Temperaments} = require("../db")
// Creación y configuaración del controlador
const postDogs = async (req,res) => {
    try {
        // Requerimos por body los input del formulario
        const {name, height, weight, life_span, temperaments} = req.body
        //Confirmamos que si se envié la información minima
        if (!name || !height || !weight || !life_span || !temperaments) {
            return res.status(400).send("Faltan datos")
            // Retorna un mensaje de error si no se recibe info
            // Status 404: No encontrado
        }
        const [dog, creado] = await Dog.findOrCreate({
            where: {name},
            defaults: { height, weight, life_span}
        })
        const arrayTemperamentos = temperaments.split(",")
        arrayTemperamentos.forEach(async (temperamento) => {
            await Temperaments.findOrCreate({
                where: {temperamento},}
                )
            });
        for (const temperamento of arrayTemperamentos) {
            const [temperament, _] = await Temperaments.findOrCreate(
                {where: { temperamento }});
            await dog.addTemperament(temperament);
            }
        if (!creado) {
            return res.status(409).send("El perro ya existe");
            // Retorna un mensaje de conflicto si el perro ya existe
            // Status 409: Conflicto
        }
        else {
            return res.status(200).json([dog, creado])
            // Retorna el arreglo con los objetos
            // Stautos 200: Correcto; OK
        }

    } 
    catch (error) {
        return res.status(500).json({error: error.message})
        // Retorna un mensaje de error asociado al estado 500
        // Status 500: Indica un error interno en el servidor 
    }
}; 

module.exports = postDogs