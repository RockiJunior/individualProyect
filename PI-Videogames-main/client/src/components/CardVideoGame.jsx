import React from "react";

export default function CardVideoGame({
  name,
  image,
  description,
  released,
  rating,
  platforms,
  genres
}) {
  return (
    <div>
      <h5>{name}</h5>
      <img src={image} alt="" width="200px" height="250px" />
      <h5>{description}</h5>
      <h5>{released}</h5>
      <h5>{rating}</h5>
      <h5>{platforms}</h5>
      <h5>{genres}</h5>
    </div>
  );
}
