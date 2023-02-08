const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videoGameRouter = require('./games/game-router.js');
const genresRouter = require('./genres/genre-router.js');
// const { getGenresGames } = require('./genresGameRouter.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use(`/videogames`, videoGameRouter);
router.use(`/genres`, genresRouter);


module.exports = router;