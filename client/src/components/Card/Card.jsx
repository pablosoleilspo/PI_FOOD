import React from 'react'
import style from '../Card/Card.module.css'

export default function Card({name, image, healthScore, diets}) {
  return (
      <div className={style.Card}>
       <h2>{name}</h2>
        <img src={image} alt='img' className={style.image} width="312px" height="231px"/>
        <p>HealthScore: {healthScore}</p>
        <p>Diets: {diets.map((diet) => diet.name).join(" | ")}</p>
    </div>
  )
}