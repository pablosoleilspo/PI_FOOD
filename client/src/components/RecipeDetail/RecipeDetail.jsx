import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRecipe, cleanDetail } from "../../redux/actions/index.js";
import Loading from "../../components/Loading/Loading.jsx";
import { Link } from "react-router-dom";
import style from "../RecipeDetail/RecipeDetail.module.css";

export default function RecipeDetail(props) {
  const dispatch = useDispatch();
  const id = props.match.params.id; //acceder al id por las props del componennte
  const recipe = useSelector((state) => state.recipe);

  useEffect(() => {
    dispatch(getRecipe(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch, id]);

  return (
    <div className={style.recipedetail}>
      {!recipe.name && <Loading />}
      <div>
        <div>
          {recipe.image ? <img className={style.image} src={recipe.image} alt={recipe.name} /> : null}
        </div>
        <br/>
        <div>
          <h1>{recipe.name}</h1>
          <br/>
          <div>
            <h2>
              Healthscore: <br/>
              {recipe.healthScore}
            </h2>
            </div>
            <br/>
        <div className={style.diets}>
            {recipe.diets
              ? recipe.diets.map((diet) => diet.name).join(' | ')
              : null}
          </div>
          <br/>
          <div className={style.text}>
          {recipe.summary ? recipe.summary.replace(/<[^>]+>/g, "") : null}
           </div>
           <br/>
           <div className={style.text}>
           <p>{recipe.steps}</p>
          </div>

          <br/>
          <br/>
          <br/>

          <Link to="/home">
            <button className={style.button}>Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// (/<[^>]+>/g, '') Devuelve una nueva cadena con todos los guiones bajos en la cadena de origen reemplazados por espacios.
