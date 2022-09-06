const { Router } = require('express');


// Importar todos los routers;
const RecipesRouter = require('./recipes.js');
const DietRouter = require('./diets.js')

const router = Router();


// Configurar los routers
router.use('/recipes', RecipesRouter);
router.use('/diets', DietRouter)
module.exports = router;
