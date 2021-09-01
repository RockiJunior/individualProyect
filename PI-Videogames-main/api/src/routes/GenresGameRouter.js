// const { Router } = require('express');
// const ruoter = Ruoter();


// const getApiGenres = async() => {
//     let genres = [];
//     try {
//         const response = await axios.get(`${API_URL}genres?key=${API_KEY}`);
//         games = await response.data.results.map(el => {
//             return {
//                 id: el.id,
//                 name: el.name,
//                 description: el.description,
//                 released: el.released,
//                 rating: el.rating,
//                 platforms: el.platforms.map(p => p.platform.name)
//             }
//         });
//         // console.log(games)
//     } catch (err) {
//         games = {
//             error: "Can't Fetch Video Games",
//             originalError: err
//         }
//     } finally {
//         return games;
//     }
// };