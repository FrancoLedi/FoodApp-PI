import React from "react";
import s from './Paginado.module.css'

export default function Paginado({recipes, recipesPerPage, paginado}){
    const pageNumbers = [];
    

    for (let i = 1; i <= Math.ceil(recipes/recipesPerPage); i++) {
       pageNumbers.push(i);
    }

    return(
        <nav class={s.nav}>
            <ul class={s.ul}>
                {pageNumbers && pageNumbers.map(number => (
                    <li class={s.li} key = {number}>
                    <a class={s.a} onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}