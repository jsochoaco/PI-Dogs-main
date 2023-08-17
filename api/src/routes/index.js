const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getDogs = require("../controllers/getDogs");
const getDogById = require('../controllers/getDogById');
const getDogByName = require('../controllers/getDogByName');
const postDogs = require('../controllers/postDogs');
const getTemperaments = require('../controllers/getTemperaments');
const getDogsDB = require('../controllers/getDogDB');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/dogs", getDogs )
router.get("/dogs/:id", getDogById )
router.get("/dog", getDogByName)
router.post("/dogs", postDogs)
router.get("/temperaments", getTemperaments)
router.get("/dogDB", getDogsDB)


module.exports = router;
