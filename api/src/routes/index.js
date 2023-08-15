const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getDogs = require("../controllers/getDogs");
const getDogById = require('../controllers/getDogById');
const getDogByName = require('../controllers/getDogByName');
const postDogs = require('../controllers/postDogs');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/dogs", getDogs )
router.get("/dogs/:id", getDogById )
router.get("/dog", getDogByName)
router.post("/dogs", postDogs)


module.exports = router;
