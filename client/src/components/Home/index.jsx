import  React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getAllRecipes, getDiets } from '../../redux/Actions';
import RecipeCard from '../RecipeCard';
import Filters from '../Filters';
import Paginado from '../Paginado';
import SearchBar from '../SearchBar';
import { Link } from 'react-router-dom';
import s from './Home.module.css'

 const Home = () => {

    let dispatch = useDispatch();
    const recipes = useSelector( (state) => state.recipes);

    const  [refresh, setRefresh] = useState('');
    const  [currentPage, setCurrentPage] = useState(1);
    const  [recipesPerPage, setRecipesPerPage] = useState(9);
    const  indexOfLastRecipe = currentPage * recipesPerPage;
    const  indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const  currentRecipes = recipes.slice(indexOfFirstRecipe,indexOfLastRecipe);
    
    const refreshComponent = (msg) => {
        setRefresh(msg)
    }

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect( () => {
        dispatch(getDiets());
        dispatch(getAllRecipes());
    }, []);

    

    return (
        <div class={s.container}>
            <div class={s.son1}>
            <h2 class={s.or}>or</h2>
            <Link id={s.link} to= '/recipe/create'>Create new recipe</Link>
            <Filters paginado={paginado} refreshComponent={refreshComponent}></Filters>
            <Paginado recipesPerPage={recipesPerPage} recipes={recipes.length} paginado={paginado} />
            <SearchBar></SearchBar>
            </div>
            <div class={s.son2}>
            {currentRecipes.length > 0 ? (currentRecipes.map((recipe) => {
                
                return ( <Link class={s.a} key={recipe.id} to= {'/recipes/' + recipe.id}>
                    <RecipeCard
                    key={recipe.id}
                    id={recipe.id}
                    name={recipe.name}
                    img={recipe.img}
                    diets={recipe.diets.map( r => r )} /> </Link>)
            })) : <h1>Loading...</h1>}
            </div>
        </div>
    );
};

export default Home;
