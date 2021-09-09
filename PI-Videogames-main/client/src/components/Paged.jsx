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
              <div className='numbersButtons' key={n}>
                  <button className="pagedButtons" onClick={()=> paged(n)}>{n}</button>
              </div>
          ))}
      </ul>
    </nav>
  );
}
