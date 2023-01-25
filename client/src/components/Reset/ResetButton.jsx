import React from "react";
import { useDispatch } from "react-redux";
import { getAllRecipes } from "../../redux/actions/index.js";
import style from "../Reset/ResetButton.module.css";

export default function ResetButton() {
  const dispatch = useDispatch();

  function clickHandler(e) {
    // e.preventDefault();
    dispatch(getAllRecipes());
  }

  return (
    <div className={style.cont}>
      <button className={style.resetButton} onClick={clickHandler}> Reset
  <div class={style.icon}>
    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path></svg>
  </div>
</button>
    </div>
  );
}
