//instalations
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
//Actions
import {
  getVideoGames,
  filterVideoGamesByGenres,
  filterCreated,
  orderByName,
  orderByRating,
} from "../actions/index.js";
//Components
import CardVideoGame from "./CardVideoGame";
import Paged from "./Paged";
import SearchBar from "./SearchBar";

export default function Home() {
  // traigo el dispatch
  const dispatch = useDispatch(); //dispatch para el redux
  //el dispatcher de redux que ejecuta el get, pasado al useEffect
  useEffect(() => {
    dispatch(getVideoGames());
  }, [dispatch]);

  //Todos los juegos del estado.
  const allVideoGames = useSelector((state) => state.videogames);
  const genres = useSelector((state) => state.genres);

  //Estado local vacio para el ordenamiento por nombre
  const [orderName, setOrderName] = useState('');

  //Estado local vacio para el ordenamiento por rating
  const [orderRating, setOrderRating] = useState('');

  //======PAGINADO=====
  //Estado de la pagina actual y la cantitad.
  const [currentPage, setCurrentPage] = useState(1);
  const [videoGamesPP, setvideoGamesPP] = useState(15);

  // resultados de la cantidad por pagina
  const indexOfLastVideoGame = currentPage * videoGamesPP; //15
  const indexOfFirstVideoGame = indexOfLastVideoGame - videoGamesPP; //0

  //division del array por la cantidad necesaria por pagina
  let currentVideoGames = allVideoGames.slice(
    indexOfFirstVideoGame,
    indexOfLastVideoGame
  );

  const paged = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };
  //======PAGINADO=====//

  //Functions & Methods

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideoGames());
  }

  function handleFilterGenres(e) {
    dispatch(filterVideoGamesByGenres(e.target.value));
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  function handleOrderByName(e) {
    e.preventDefault(e);
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrderName(`Ordered ${e.target.value}`);
  }

  function handleOrderByRating(e) {
    dispatch(orderByRating(e.target.value));
    setOrderRating(`Ordered ${e.target.value}`);
  }

  return (
    <div>
      <Link to="/videogame">Create Videogame</Link>
      <h1>Hola Mundo</h1>
      <button onClick={(e) => { handleClick(e) }}>Refresh all Videogames</button>

      <div>

        <select onChange={(e) => { handleOrderByName(e) }}>
          <option value="">--Order Alphabetically--</option>
          <option value="asc">Ascendant</option>
          <option value="desc">Descendent</option>
        </select>

        <select onChange={(e) => { handleOrderByRating(e) }}>
          <option value="">--Rating--</option>
          <option value="max">Max Rating</option>
          <option value="min">Min Rating</option>
        </select>

        <select required onChange={(e) => { handleFilterGenres(e) }}>
            {genres.map((el)=>(
              <option key={el.id} value={el.name}>{el.name}</option>
            ))}
        </select>


        <select onChange={(e) => { handleFilterCreated(e) }}>
          <option value="">--Filter Games--</option>
          <option value="All">All Games</option>
          <option value="Created">Created Games</option>
          <option value="From Api">Api Games</option>
        </select>

        <SearchBar />

        <Paged
          videoGamesPP={videoGamesPP}
          allVideoGames={allVideoGames.length}
          paged={paged}
        />

        {currentVideoGames?.map((vg) => {
          return (
            <div key={vg.id}>
              <Link to={`/videogames/${vg.id}`}>
                <CardVideoGame
                  name={vg.name}
                  image={vg.image ? vg.image : <img src="https://media.rawg.io/media/games/a8b/a8bf6f31bfbdaf7d4b86c1953c62cee0.jpg" />}
                  genres={vg.genres.map((el) => el).join(" ")}
                />
              </Link>
            </div>
          );
        })}

      </div>

    </div>
  );
}
