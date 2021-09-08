import React from "react";

export default function Paged({ videoGamesPP, allVideoGames, paged }) {

  let pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allVideoGames / videoGamesPP); i++) {
    pageNumbers.push(i);
}

return (
    <nav>
      <ul className='paged'>
          {pageNumbers && pageNumbers.map(n=>(
              <li className='number' key={n}>
                  <a onClick={()=> paged(n)}>{n}</a>
              </li>
          ))}
      </ul>
    </nav>
  );
}
