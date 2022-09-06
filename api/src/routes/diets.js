require('dotenv').config();
const { Router } = require('express');
const { Diet } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;

const router = Router();

// Esta ruta nos carga todas las diets en la DB

router.get('/', async (req, res) => {
    const respuesta = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`)
    const diets = await respuesta.data.results.map(recipe => recipe.diets).flat() // Primero procesamos toda la info
    // para que nos quede un array con las dietas de todas las recetas

    // Y despues recorremos el array y preguntamos si la dieta ya esta cargada en la DB... de no ser asi la crea y sino la ignora
    diets.forEach(el => {
        Diet.findOrCreate({
            where: { name: el }
        })
    })
    // Por ultimo contesta con el resultado
    const allDiets = await Diet.findAll();
         res.send(allDiets);
    });

    module.exports = router;

    