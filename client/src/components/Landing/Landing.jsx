import React from "react";
import { Link } from "react-router-dom";
import videoBg from "../Landing/VideoGastronomico.mp4";
import style from '../Landing/Landing.module.css';

export default function Landing() {
  return (
    <div>
      <div className={style.main}> <video src={videoBg} autoPlay loop muted/></div>
        <div className={style.start}>
        <Link to="/home">
        <button className={style.button}>Start</button>
      </Link>
        </div>
   
    </div>
  );
}
