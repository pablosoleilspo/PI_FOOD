import React from 'react'
import { useEffect, useState } from "react";
import {Link,useHistory} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { createRecipes, getDiets } from '../../redux/actions';
import style from '../RecipeCreate/RecipeCreate.module.css';

export default function RecipeCreate() {
    const dispatch = useDispatch();
    const history = useHistory();
    const diets = useSelector((state) => state.diets);

    function validate(input) {
        let whitespacesParameter =  /(?!^\s+$)^.*$/m; //expresiones regulares, espacios en blanco
        let alphabeticalPattern = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;//patron alfa
      
      
        let errors = {};
        if (!whitespacesParameter.test(input.name) || !alphabeticalPattern.test(input.name)){
          errors.name= "Name cannot contain special characters or numbers"
        }
        if (!input.name) {
          errors.name = "Name required";
        }
        if (!input.summary) {
          errors.summary = "summary required";
        }
        if (input.healthScore.toString().includes('e')){
          errors.healthScore = "HealthScore cannot contain letters"
        }
        if (input.healthScore > 100 || input.healthScore < 0) {
          errors.healthScore = "HealthScore value must be (0-100)";
        }
        if (!input.healthScore) {
          errors.healthScore = "HealthScore required";
        }
        if (input.steps.length === 0) {
          errors.steps = "At least one step required";
        }
        if (input.diets.length === 0) {
          errors.diets = "At least one diet required";
        }
        if(input.image.length !== 0 && !/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(input.image)){
          errors.image='invalid URL'
        }

        return errors;
      }

    const [input, setInput] = useState({
        name: '',
        image: "",
        healthScore: '',
        diets: [],
        summary: '',
        steps: '',
      
    });

    const [errors, setErrors] = useState({
        name: '',
        healthScore: '',
        diets: [],
        summary: '',
        steps: '',
    });

    useEffect(() => {
        dispatch(getDiets()); 
    }, [dispatch]);
    

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        }); 
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
        })); 
    }

    
    function handleSelect(e) {
      if(!input.diets.includes(e.target.value)){
        setInput({
          ...input,
          diets: [...input.diets,e.target.value]
      }); 
      }else{
        setInput({
          ...input,
      })

      setErrors(validate({
        ...input, 
        diets: [...input.diets, e.target.value]
    }));
   
    }}


    async function handleSubmit(e) {
        e.preventDefault(); 
        dispatch(createRecipes(input))
        alert('Recipe created successfully')
        setInput({
            name: '',
            image: "",
            healthScore: '',
            diets: [],
            summary: '',
            steps: '',
        })
        history.push('/home')
    }

    function handleDelete(e) {
        setInput({
            ...input,
            diets: input.diets.filter(diet => diet !== e)
        }); 
    }


    
  return (
    <div className={style.container}>
 <h1 className={style.title}>Create your own recipe and delight your imagination</h1>
 <form onSubmit={handleSubmit}>
 <div className={style.form}>
    <div>
        <label className={style.form__label}>Nombre: </label>
        <input
        className={errors.name ? style.form__input__error : style.form__input} 
        type="text"
        value = {input.name}
        name = "name"
        placeholder='Name of de Recipe...'
        onChange={handleChange}
        />
    {errors.name && <p className={style.form__error}>{errors.name}</p>}
                <br/>
    </div>
    <div>
        <label className={style.form__label}>Summary: </label>
        <input 
        className={errors.name ? style.form__input__error : style.form__input} 
        type="text"
        value = {input.summary}
        name = "summary"
        placeholder='Write a summary...'
        onChange={handleChange}
        />
        {errors.summary && <p  className={style.form__error}>{errors.summary}</p>}
                <br/>
    </div>
    <div>
        <label  className={style.form__label}>Imagen: </label>
        <input 
         className={errors.name ? style.form__input__error : style.form__input} 
        type="text"
        value = {input.image}
        name = "image"
        placeholder='Example http://...'
        onChange={handleChange}
        />
         {errors.image && <p  className={style.form__error}>{errors.image}</p>}
                <br/>
    </div>
    <div>
        <label className={style.form__label}>step by step: </label>
        <input 
         className={errors.name ? style.form__input__error : style.form__input} 
        type="text"
        value = {input.steps}
        name = "steps"
        placeholder='Write your steps...'
        onChange={handleChange}
        />
        {errors.steps && <p  className={style.form__error}>{errors.steps}</p>}
                <br/>
    </div>
    <div>
        <label className={style.form__label}>healthScore: </label>
        <input 
         className={errors.name ? style.form__input__error : style.form__input} 
        type="number"
        value = {input.healthScore}
        name = "healthScore"
        placeholder='Health Score of the Recipe...'
        onChange={handleChange}
        />
        {errors.healthScore && <p  className={style.form__error}>{errors.healthScore}</p>}
                <br/>

    </div>
    <label className={style.form__label}>Diets</label>
    <div className={style.form__diets__container}>
    <select  className={errors.name ? style.form__input__error : style.form__input_diet}  onChange={handleSelect}>
        {diets.map((diet) => (
            <option  value={diet.name}>{diet.name}</option>
        ))}
     {errors.diets && <p  className={style.form__error}>{errors.diets}</p>}
                <br/>
    </select>
    </div>

    {input.diets.map(el => 
    <div>
        <p>{el}</p>
        <button className='' onClick={() => handleDelete(el)}>X</button>
    </div>
    )}
  
    <button className={style.button2} disabled={Object.keys(errors).length}  type='submit'>Create</button>
    <Link to = '/home'><button className={style.button2}>Back</button></Link>
    </div>
 </form>

</div>
  )
}
