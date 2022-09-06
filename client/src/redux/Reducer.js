
import { GET_ALL_RECIPES, GET_RECIPE, GET_DIETS, CREATE_RECIPE, FILTER, SORT, DETAIL, CLEAN } from './Actions';

const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    recipe: {},
};

function rootReducer(state = initialState, action){
    switch (action.type) {
        case GET_ALL_RECIPES:
            return { ...state, recipes: action.payload, allRecipes: action.payload};

        case GET_RECIPE:
            return { ...state, recipes: action.payload};

        case GET_DIETS:
            return { ...state, diets: action.payload};

        case CREATE_RECIPE:
            return { ...state};

        case FILTER:
            const allRecipes = state.allRecipes;
            
            if (action.payload === 'db' || action.payload === 'api'){
                
                const filtered = action.payload === 'db' ? allRecipes.filter( el => el.createdInDb ) : allRecipes.filter( el => !el.createdInDb )
                
                return { ...state, recipes: filtered };
            }
            
            
            const filtered = action.payload === 'all' ? allRecipes : allRecipes.filter( el => typeof el.id === 'string' ? el.diets.map(el => el.name).includes(action.payload) :el.diets.includes(action.payload) ) 
            
            
            
            return { ...state, recipes: filtered };

        case SORT:
            var sortedRecipes = [];  
            
            switch (action.payload) {
               
                case 'a-z':
                    
                     sortedRecipes = state.recipes.sort(function (a, b) {
                             if (a.name > b.name){
                                 return 1;
                             }
                             if (b.name > a.name){
                                 return -1;
                             }
                             return 0;
                         }) 
                         
                         return {
                            ...state,
                            recipes: sortedRecipes
                        }

                case 'z-a':
                    
                     sortedRecipes = state.recipes.sort(function (a, b) {
                                if (a.name > b.name){
                                    return -1;
                                }
                                if (b.name > a.name){
                                    return 1;
                                }
                                return 0;
                            }) 

                            return {
                                ...state,
                                recipes: sortedRecipes
                            };

                case 'asc':
                    
                     sortedRecipes = state.recipes.sort(function (a, b) {
                        if (a.healthScore > b.healthScore){
                            return 1;
                        }
                        if (b.healthScore > a.healthScore){
                            return -1;
                        }
                        return 0;
                    }) 

                    return {
                        ...state,
                        recipes: sortedRecipes
                    }

               case 'desc':
                
                     sortedRecipes = state.recipes.sort(function (a, b) {
                        if (a.healthScore > b.healthScore){
                            return -1;
                        }
                        if (b.healthScore > a.healthScore){
                            return 1;
                        }
                        return 0;
                    }) 

                    return {
                        ...state,
                        recipes: sortedRecipes
                    }

                    default:
                        return state;

            }

        case DETAIL:
            
            return {
                ...state, recipe: action.payload
            }

        case CLEAN:

            return{
                ...state, recipe: {}
            }
            
        default:
            return state;
    }
}

export default rootReducer;