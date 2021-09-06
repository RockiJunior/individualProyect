import React from "react";

export default function CardVideoGame({
  name,
  image,
  description,
  released,
  rating,
  platforms,
}) {
  return (
    <div>
      <h3>{name}</h3>
      <img src={image} alt="Image Not Found" width="200px" height="250px" />
      <h3>{description}</h3>
      <h3>{released}</h3>
      <h3>{rating}</h3>
      <h3>{platforms}</h3>
    </div>
  );
}
