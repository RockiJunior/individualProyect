//instalations
import React from "react";
import { useState, useReducer, useEffect } from "react";
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

//Styles
import styles from './styles/Home.module.css';

export default function Home() {
  //en vez de llamar el useEffect en el home, lo haces en el app.js
  //el dispatcher de redux que ejecuta el get, pasado al useEffect

  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  // traigo el dispatch
  const dispatch = useDispatch(); //dispatch para el redux


  //Todos los juegos del estado.
  const allVideoGames = useSelector((state) => state.videogames);
  const genres = useSelector((state) => state.genres);

  //Estado local vacio para el ordenamiento por nombre
  const [, setOrderName] = useState('');

  //Estado local vacio para el ordenamiento por rating
  const [, setOrderRating] = useState('');

  //======PAGINADO=====
  //Estado de la pagina actual y la cantitad.
  const [currentPage, setCurrentPage] = useState(1);
  const [videoGamesPP, ] = useState(15);

  
  // resultados de la cantidad por pagina
  const indexOfLastVideoGame = currentPage * videoGamesPP; // 1 *  15
  const indexOfFirstVideoGame = indexOfLastVideoGame - videoGamesPP; // 0 


  const [current, setCurrent] = useState([]);


  useEffect(() => {
    setCurrent(
      allVideoGames.slice(indexOfFirstVideoGame, indexOfLastVideoGame))}, [allVideoGames, indexOfFirstVideoGame, indexOfLastVideoGame]);


  //division del array por la cantidad necesaria por pagina

  // 1 => 15
  // 2 => 15


  const paged = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };
  //======PAGINADO=====//

  //Functions & Methods
  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideoGames());
    forceUpdate();
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

  //styles
  const {
    gral,
    containerCard,
    filterBar,
    containerRefreshButton,
    refreshButton,
    title,
    linkCreate,
    loading
  } = styles;

  return (
    <div>
      <div className={gral}>
        <div className={filterBar}>

          <select onChange={(e) => { handleOrderByName(e) }}>
            <option>--Order Alphabetically--</option>
            <option value="asc">Ascendant</option>
            <option value="desc">Descendent</option>
          </select>

          <select onChange={(e) => { handleOrderByRating(e) }}>
            <option>--Rating--</option>
            <option value="max">Max Rating</option>
            <option value="min">Min Rating</option>
          </select>

          <select onChange={(e) => { handleFilterGenres(e) }}>
            <option>--Genres--</option>
            {genres.map((el) => (
              <option key={el.id} value={el.name}>{el.name}</option>
            ))}
          </select>

          <select onChange={(e) => { handleFilterCreated(e) }}>
            <option>--Filter Games--</option>
            <option value="All">All Games</option>
            <option value="Created">Created Games</option>
            <option value="From Api">Api Games</option>
          </select>

          <div>
            <Link to="/videogame" className={linkCreate}>Create Videogame</Link>
          </div>

          <SearchBar />
        </div>

        <div className={title}>
          <h1>Video Game Api</h1>
        </div>

        <div className={containerRefreshButton}>
          <button className={refreshButton} onClick={(e) => { handleClick(e) }}>Refresh</button>
        </div>

        <Paged
          videoGamesPP={videoGamesPP}
          allVideoGames={allVideoGames.length}
          paged={paged}
        />

        <div className={containerCard}>
          {current.length > 0 ?
            current.map((vg) => {
              return (
                <div key={vg.id} style={{ maxWidth: "30%", margin: "20px" }}>
                  <Link to={`/videogames/${vg.id}`} style={{ textDecoration: "none" }}>
                    <CardVideoGame
                      name={vg.name}
                      image={vg.image ? vg.image : "https://media.rawg.io/media/games/a8b/a8bf6f31bfbdaf7d4b86c1953c62cee0.jpg"}
                      genres={vg.createdInDB ? vg.genres.map((el) => el.name).join(' ') : vg.genres.join(' - ')}
                    />
                  </Link>
                </div>
              );
            }) :
            <div className={loading}>
              <div></div>
            </div>
          }

        </div>

      </div>

    </div>
  );
}
