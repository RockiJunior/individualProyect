import React from "react";
import styles from './styles/CardVideoGame.module.css';

export default function CardVideoGame(props) {
  const {
    name,
    image,
    genres,
  } = props;


  const { cardVG, cardName, cardImage, cardGenres } = styles;

  console.log(JSON.stringify(genres));
  return (

    <div className={cardVG}>

      <div className={cardName}>
        <h5>{name}</h5>
      </div>

      <div className={cardImage} style={{backgroundImage: `url(${image})`}}>
        {/* <img src={image} alt="" /> */}
      </div>

      <div className={cardGenres}>
        <h5>{genres}</h5>
      </div>

    </div>
  );
}
