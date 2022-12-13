import React from "react";
import style from '../Paginado/Paginado.module.css'
export default function Paginado({ recipesPerPage, recipes, paginado }) {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(recipes / recipesPerPage); i++) {
    //Math.ceil() devuelve el entero mayor o igual más próximo a un número dado.
    pageNumbers.push(i + 1);
    //i <= 100/9 = 11.11 => Math.ceil(11.11) = 12
  }
  return (
    <nav className={style.paginado}>
      <div className={style.container}>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <div key={number}>
              <button className={style.btn} onClick={() => paginado(number)}>{number}</button>
            </div>
          ))}
      </div>
    </nav>
  );
}
