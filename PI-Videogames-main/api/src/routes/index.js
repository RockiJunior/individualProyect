const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videoGameRouter = require('./videoGameRouter');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use(`/videogames`, videoGameRouter);
router.use(`/videogames/:id`, videoGameRouter);



module.exports = router;