import React from "react";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllRecipes,getDiets,orderRecipesByName,orderRecipesByScore,filterRecipesByDiet} from "../../redux/actions";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import ResetButton from '../Reset/ResetButton'
import Loading from "../Loading/Loading";
import SearchBar from "../SearchBar/SearchBar";
import style from '../Home/Home.module.css';
import logo from '../Home/logo.png';

export default function Home() {
  const dispatch = useDispatch(); //useDispacth  facilita la actualización de algún atributo

  const recipes = useSelector((state) => state.recipes); //useSelect  permite acceder a cualquier almacén de estado
  const diets = useSelector((state) => state.diets);

const [currentpage, setCurrentPage] = useState(1); //lo seteo en un 1 porque siempre arranco por la primer pagina
const [order, setOrder] = useState("")
const recipesPerPage = 9; // cantidad de recetas por pagina

  const indexOfLastRecipe = currentpage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;

  let currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe); //para dividir la cantidad de recetas por pagina

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {// si esta presente el componente  define efectos 
    dispatch(getAllRecipes());
    dispatch(getDiets());
  }, [dispatch]);

//   


function handlerSortName(e){ 
    e.preventDefault();
    dispatch(orderRecipesByName(e.target.value)); 
    setCurrentPage(1);
    order? setOrder(false) : setOrder(e.target.value)//para modificar el estado local cuanto setee la pag en 1
};

function handlerSortScore(e){ 
  e.preventDefault();
  dispatch(orderRecipesByScore(e.target.value)); 
  setCurrentPage(1);
  setOrder(`ordenado ${e.target.value}`)//para modificar el estado local cuanto setee la pag en 1
}
function handlerFilterDiets (e) {
  dispatch(filterRecipesByDiet(e.target.value));

}

  return (
    <div>
      <div className={style.principal}>
      <img className={style.logo} height="200" src={logo} alt="" />
      <div>
      <SearchBar/>
      </div>

      <div>
      <Link to="/recipe">
          <button className={style.button} type="button">Create recipe</button>
        </Link>
      </div>
      </div>

      <div className={style.filterscontainer}>
      <select className={style.select}   onChange={handlerFilterDiets}>
            <option disabled selected>--Select a Diet--</option>
            {diets.map((e) => {
              return (
                <option value={e.name} key={e.id}>
                  {e.name}
                </option>
              );
            })}
          </select>
        
        <select className={style.select} onChange={handlerSortScore}>
          <option disabled selected value=" ">--Sort by health score--</option>
          <option value="MHS">Mayor puntaje de salud</option>
          <option value="mHS">Menor puntaje de salud</option>
        </select>

        <select className={style.select} onChange={handlerSortName}>
          <option disabled selected value=" ">--Sort by Name--</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>
     <div>
        <ResetButton/>
      </div>
      <div>
        <Paginado
          recipesPerPage={recipesPerPage}
          recipes={recipes.length}
          paginado={paginado}
        />
      </div>

      <div className={style.card}>
        {recipes.length === 0 && <Loading />}

        {
            currentRecipes?.map(e => {
                return (
                    <div key={e.id}>
                        <Link to={`/recipes/${e.id}`} className={style.detailink}>
                              <Card
                                name={e.name}
                                image={e.image}
                                diets={e.diets}
                                healthScore={e.healthScore}
                            />
                        </Link>
                    </div>
                )
            })
        }
      </div>
    </div>
  );
}
