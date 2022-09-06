require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Recipe, Diet } = require('../db');

// Creo las funciones que me van a ayudar a traer los objetos que representan las recetas

const getDetail = async (id) => {
    
    try {
        // Hace el request para obtener detalles sobre una receta
        const respuesta = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
    
        // Aca tomo los datos que voy a usar
        const apiInfo = {
            id: respuesta.data.id,
            name: respuesta.data.title,
            img: respuesta.data.image,
            resume: respuesta.data.summary, 
            healthScore: respuesta.data.healthScore,
            steps: respuesta.data.analyzedInstructions[0] ? respuesta.data.analyzedInstructions[0].steps.map(el => el.step) : undefined,
            diets: respuesta.data.diets.map(el => el),
        }

        return apiInfo;
    
    } catch (error) { // EN CASO DE NO EXISTIR ID VA A PARAR AL CATCH Y RETORNA FALSO

        return false;
        }
        
    } 

const getDbInfo = async () => {
   
    // Esta funcion usa sequelize para buscar y traer las recetas almacenadas en postgre e incluye las dietas

    const result = await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
     })
     
     return result.map(el => { 
        // Aca modificamos la propiedad "steps" traida de la DB (unico string) 
        // y la separamos conviertiendola en un array con sus diferentes pasos
        el.dataValues.steps = el.dataValues.steps.split('|') 

        return el.dataValues})
}

const getApiInfo = async () => {
    // Esta funcion hace lo mismo que GetDetail solo que trae la info que necesitan las cards del Home 
    const respuesta = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    const apiInfo = await respuesta.data.results.map( el => {
        
        return {
            id: el.id,
            name: el.title,
            img: el.image,
            resume: el.summary,
            healthScore: el.healthScore,
            // Para la siguiente relacion preguntamos primero si es que hay pasos, (algunas recetas que trae la api no los tiene) 
            // en caso de no haber queda undefined
            steps: el.analyzedInstructions[0] ? el.analyzedInstructions[0].steps.map(el => el.step) : undefined,
            diets: el.diets.map(el => el)
        }
    })
    
    return apiInfo;
}

const getAllInfo = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
   
    const allInfo = apiInfo.concat(dbInfo); // Junto toda la informacion traida de la api y db
    
    return allInfo;
}

module.exports = {getApiInfo, getDbInfo, getAllInfo, getDetail}

