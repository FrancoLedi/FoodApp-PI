require('dotenv').config();
const { Router } = require('express');
const { v4: UUIDV4 } = require('uuid'); // Esto sirve para crear el ID de las recetas creadas
const { Recipe, Diet } = require('../db');
const { getDbInfo, getAllInfo, getDetail } = require('./AuxFunctions') // Las funciones auxiliares que procesan la info

const router = Router();


 router.get('/', async (req, res) => {
       
       const { name } = req.query;
       const data = await getAllInfo()
      

       if (name){
        
        // Paso el string nombre todo a minuscula y despues filtro en data (todas las recetas)
         const resultByName = data.filter( el =>  el.name.toLowerCase().includes(name.toLowerCase()));
        
         if (resultByName.length){
            // Si encuentra coincidencias las contesta
             return res.send(resultByName)
         } else{
            
             return res.status(400).send('No se encontro receta con ese nombre')
         }
         
       }
    
      res.json(data)
});


router.get('/:idRecipe', async (req, res) => {
    
  const { idRecipe } = req.params;
  const detailApi = await getDetail(idRecipe);
  const dataDB = await getDbInfo()
  const detailDB = await dataDB.find( el =>  el.id == idRecipe);

      if (detailApi) return res.send(detailApi);

      else if (detailDB) return res.send(detailDB);
       
      else return res.send('ID inexistente');
      });


router.post('/', async (req, res) => {

    let { name, resume, healthScore, steps, createdInDb, diets } = req.body;
    if (!name || !resume || !steps) return res.send('Faltan datos obligatorios');
    // Los steps me vienen en un array pero yo los transformo en un unico string para almacenarlos correctamente en la DB...
    steps = steps.join('|')   
    
  try {
   const newRecipe = await Recipe.create({
    id: UUIDV4(),
    name, 
    resume, 
    healthScore, 
    steps,
    createdInDb
   })

   // Busco las diets que coincidan con las que me pasaron por req en la DB
   const dietDb = await Diet.findAll({
    where: { name: diets } 
   })

   // Y las asocio con la nueva receta creada
   newRecipe.addDiet(dietDb)
   res.json(newRecipe)

  } catch (error) {res.send(error)} 
});



module.exports = router;