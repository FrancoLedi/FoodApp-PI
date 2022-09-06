import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, cleanRecipe } from "../../redux/Actions";
import { Link } from "react-router-dom";
import s from './RecipeDetail.module.css'

export function RecipeDetail(props){

    

    let dispatch = useDispatch()

    useEffect( () => {
        dispatch(getDetail(props.match.params.idRecipe))
        return () => {
            dispatch(cleanRecipe())
        }
    }, [])

    let detail = useSelector(state => state.recipe)
    
    

    return(
        <div>
        <Link class={s.link} to= '/home'>{'< Home'}</Link>
            {
                detail.id ? 
                <div class={s.div}>
                    <h1>{detail.name}</h1>
                    <div class={s.div2}>
                    <img width='250px' height='250px' src = {detail.img? detail.img: <h3>No image</h3>}></img>
                    <h4>Resume{detail.resume && <p class={s.p}>{detail.resume.replace(/<\/?[^>]+(>|$)/g, ' ')}</p>}</h4>
                   
                    <h4 class={s.diets}>Steps <p class={s.p}>{detail.steps ? detail.steps.map( s => s + (' ')) : <h4>No steps</h4>}</p></h4>
                    </div>
                    <div class={s.div3}>
                    <h4 class={s.hs}>HS: {detail.healthScore}</h4>
                    <h4 class={s.hs}>Diets: {typeof detail.id === 'string' ? detail.diets.map( d => d.name + (' ') ): detail.diets.map( d => d + (', '))}</h4>
                    </div>
                </div>: <h1>Loading...</h1>
            }
        </div>
    )
}



