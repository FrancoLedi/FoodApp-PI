import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { filterRecipesBy, sortRecipesBy } from "../../redux/Actions";
import s from './Filters.module.css'


function Filters({paginado, refreshComponent}) {
    
    const dispatch = useDispatch();
    const diets = useSelector( (state) => state.diets );
    
    const handleFilterBy = (e) =>{
        e.preventDefault();

        dispatch(filterRecipesBy(e.target.value))

        paginado(1);
        refreshComponent(`Actualizado ${e.target.value}`)
    }

    function handleSortBy (e) {
        e.preventDefault();
        
        dispatch(sortRecipesBy(e.target.value));
        
        paginado(1);
        refreshComponent(`Actualizado ${e.target.value}`)
    }

    return (
      <div class={s.container}>
        <select class={s.select} onChange={e => handleFilterBy(e)}>
            <optgroup label = "Conection">
                <option value = 'all'>All</option>
                <option value = 'db'>Created</option>
                <option value = 'api'>Existing</option>
            </optgroup>
            <optgroup label = "Diets">
            {diets && diets.map(d => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                ))}
            </optgroup>
        </select>
        <select class={s.select} onChange={e => handleSortBy(e)}>
                
            <optgroup label = "Health Score">
                <option selected disabled hidden>Select order</option>
                <option value = 'asc'>Ascendente</option>
                <option value = 'desc'>Descendente</option>
            </optgroup>
            <optgroup label = "Alfabeto">
                <option value = 'a-z'>A - Z</option>
                <option value = 'z-a'>Z - A</option>
            </optgroup>
        </select>
      </div>
    );
  }
  
  export default Filters;