import React from 'react'
import{useState} from "react";
import { useDispatch} from "react-redux";
import {getRecipesName} from "../../redux/actions/index.js";
import style from '../SearchBar/SearchBar.module.css'

export default function SearchBar(){
    const dispatch = useDispatch();
    const [input, setInput] = useState("");
   

    function handleChange(e) {
        e.preventDefault()
        setInput(e.target.value); 
        console.log(input)
       
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getRecipesName(input)); //actualización de atributo
        setInput("");
    } 

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input className={style.input} type="text" placeholder="Search a recipe...🔎" value={input} onChange={(e) => handleChange(e)} />
                <button className={style.button} type="submit">Search</button>
            </form> 
        </div>
    ); 
}

