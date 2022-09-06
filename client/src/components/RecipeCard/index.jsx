import React from 'react';
import s from './RecipeCard.module.css'

export default function RecipeCard(props){
   
    return (
        <div className={s.div}>
            <h3>{props.name}</h3>
            <div className={s.img}>
            <img src={props.img} alt = 'no image'></img>
            </div>
            <div className={s.div2}>
            <p class={s.p}>{typeof props.id === 'string' ? props.diets.map( d => d.name + (' ')) : props.diets.join(', ')}</p>
            </div>
        </div>
    )
}