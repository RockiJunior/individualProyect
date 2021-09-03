const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videoGameRouter = require('./videoGameRouter.js');
const getGenresGames = require('./genresGameRouter.js');
// const { getGenresGames } = require('./genresGameRouter.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use(`/videogames`, videoGameRouter);
router.use(`/genres`, getGenresGames);


module.exports = router;