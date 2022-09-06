import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { getRecipe } from '../../redux/Actions';
import s from './SearchBar.module.css'

export default function SearchBar() {
    let dispatch = useDispatch();
  const [name, setName] = useState("");
  
  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  
  function HandleSubmit(e) {
    e.preventDefault();
    dispatch(getRecipe(name));
    setName("")
  }

  return (
  <div class={s.container}>
    <div class={s.div}>
      <input onChange={(e) => handleInputChange(e)} type="text" placeholder='Type a recipe here...' value={name}/>
      <button type='submit' onClick={(e) => HandleSubmit(e)}>Search</button>
    </div>
  </div> )
};