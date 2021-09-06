import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideoGames } from "../actions/index.js";

export default function Home() {
  const dispatch = useDispatch();
  const allVideoGames = useSelector((state) => state.videoGames);

  useEffect(() => {
    dispatch(getVideoGames());
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getVideoGames);
  };

  return (
    <div>
      <Link to="/videogames"></Link>
      <h1>Hola Mundo</h1>
      <button
        onClick={(e) => {handleClick(e);}}>Volver a cargar los videoJuegos</button>
      <div>
        <select>
            <option value='asc' >Ascendente</option>
            <option value='desc'>Descendente</option>
        </select>
        <select>
            
        </select>
      </div>
    </div>
  );
}
