import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
import { createRecipe, getDiets } from "../../redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import s from './CreateRecipe.module.css'

const CreateRecipe = () => {
    useEffect( () => {
        dispatch(getDiets());
    }, []);
    const dispatch = useDispatch()
    const diets = useSelector( (state) => state.diets )

    const [input, setInput] = useState({
        name: "", 
        resume: "", 
        healthScore: 0, 
        diets: [],
        steps: [], 
        createdInDb: true, 
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    
    function handleSelect(e) {
        e.preventDefault()
        if (!input.diets.find(d => d === e.target.value)){
            setInput({
                ...input,
                diets: input.diets.concat(e.target.value)
            })
        }
    }

    function HandleSteps(e) {
        setInput({
            ...input,
            steps: input.steps.concat(e.target.previousSibling.value)
        })
        e.target.previousSibling.value = '';
    }

    const validate = (input) => {
        let errors = {};
        if (!input.name) {
            errors.name = 'Recipe name is required';
        }
        
        if (!input.resume) {
            errors.resume = 'Resume is required';
        } 

        if (input.diets.length < 1) {
            errors.diets = 'At less 1 diet is required';
        } 

        if (input.steps.length < 1) {
            errors.steps = 'At less 1 step is required';
        } 

        return errors;
    }

    function handleSubmit(e) {
        e.preventDefault();
        let errors = validate(input)
        if (Object.values(errors).length) {
            return alert(Object.values(errors).join('\n'));
        }
        dispatch(createRecipe(input))
        setInput({
            name: "", 
            resume: "", 
            healthScore: 0, 
            diets: [],
            steps: [],
        })
        alert("Recipe created")
    }
    
    return (
        <div class={s.container}>
        <Link class={s.link} to= '/home'>{'< Home'}</Link>
            <form class={s.form} onSubmit={(e) => handleSubmit(e)}>
                <div class={s.item}>
                    <label>Name</label>
                    <input
                        class={s.input}
                        type = 'text'
                        value = {input.name}
                        name = 'name'
                        onChange={(e) => handleChange(e)}
                        
                    />
                </div>

                <div class={s.item} id={s.resume}>
                    <label>Resume</label>
                    <textarea
                        type = 'text'
                        value = {input.resume}
                        name = 'resume'
                        onChange={(e) => handleChange(e)}
                        
                    />
                </div>


                <div class={s.item}>
                    <label>Steps</label>
                    <div class={s.div}>
                    <input
                        id={s.steps}
                        class={s.input}
                        type = 'text'
                        name = 'steps'
                    />
                    <button class={s.button} type='button' onClick={(e) => HandleSteps(e)}>Add step</button>
                    </div>
                </div>


                <div class={s.item} id={s.aux}>
                <select id={s.diets} onChange={(e) => handleSelect(e)}>
                <optgroup label = "Dietas">
                <option selected disabled hidden>Select an option</option>
                {diets && diets.map(d => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                ))}
                 </optgroup>
                 </select>
                 
                    <label>Health Score</label> 
                    <input
                        id={s.healthScore}
                        type = "number"
                        min = "0" 
                        max = "100" 
                        value = {input.healthScore} 
                        name = 'healthScore'
                        onChange={(e) => handleChange(e)}
                    />
                 
                </div>

                
                    <button class={s.submit} type='submit'>Create recipe</button>
                    
                    
            </form>
            
            
                    
        </div>
    )
}

export default CreateRecipe;

/* 
    
    {input.genres.map(el =>
                    
                    <button class={s.genresBut} key={el} value={el} onClick={(e) => handleDelete(e)}>{el}</button>
                    
                    )}
*/