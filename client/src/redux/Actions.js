import axios from "axios";
export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const CREATE_RECIPE = 'CREATE_RECIPE';
export const GET_RECIPE = 'GET_RECIPE';
export const GET_DIETS = 'GET_DIETS';
export const FILTER = 'FILTER';
export const SORT = 'SORT';
export const DETAIL = 'DETAIL';
export const CLEAN = 'CLEAN';

export function cleanRecipe(){

    return async function(dispatch) {
        return dispatch({
            type: CLEAN
        })
    }
}

export function getAllRecipes(){
    
     return async function(dispatch) {
        var json = await axios('http://localhost:3001/recipes')
            return dispatch({
                type: GET_ALL_RECIPES, 
                payload: json.data
            })
         }
}

export function getRecipe(name){

    return async function(dispatch) {
        try {
            
            var recipes = await axios('http://localhost:3001/recipes?name=' + name)
            
           return dispatch({
               type: GET_RECIPE, 
               payload: recipes.data
           })
        }
         catch (err) {
           return err
        }
    }
}

export function getDiets() {
    return async function(dispatch) {
      var diets = await axios('http://localhost:3001/diets')
      return dispatch({
        type: GET_DIETS, 
        payload: diets.data
        })
    }
}

export function createRecipe(payload){
    return async function(dispatch) {
        var recipe = await axios.post('http://localhost:3001/recipes', payload)
        
        return recipe
      }
}

export function filterRecipesBy(payload) {
    return {
        type: FILTER, payload: payload
    }
}
 
export function sortRecipesBy(payload) {
    return {
        type: SORT, payload: payload
    }
}

export function getDetail(id) {
    return async function (dispatch){
        var detail = await axios('http://localhost:3001/recipes/' + id);
        return dispatch({
            type: DETAIL,
            payload: detail.data
        })
    }
}