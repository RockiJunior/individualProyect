//instalations
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
//Components
import { getVideoGames } from "../actions/index.js";
import CardVideoGame from "./CardVideoGame";

export default function Home() {
  const dispatch = useDispatch(); //dispatch para el redux

  useEffect(() => {
    dispatch(getVideoGames());
  }, [dispatch]);

  const allVideoGames = useSelector((state) => state.videogames);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideoGames);
  }

  return (
    <div>
      <Link to="/videogames">Create Videogame</Link>
      <h1>Hola Mundo</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Volver a cargar los videoJuegos
      </button>
      <div>
        <select>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <select>
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Shooter">Shooter</option>
          <option value="Simulation">Simulation</option>
        </select>
        <select>
          <option value="All">All Games</option>
          <option value="Created">Created Games</option>
          <option value="From Api">Api Games</option>
        </select>

        {allVideoGames?.map((vg) => {
          return (
            <div key={vg.id} >
                <CardVideoGame name={vg.name} image={vg.image} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
