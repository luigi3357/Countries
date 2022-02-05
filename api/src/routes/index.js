const { Router } = require('express');
const { Country, Activity } = require('../db')
const { infoApi, infoDb, getAll, convert, getActivity,filterContinente, createActivity } = require('../services/services');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/countries", async (req, res) => {  
  
    let countryTotal = await infoDb()
    const name = req.query.name
    if (name) {
      const filterDb = countryTotal.filter(el => el.name.toLowerCase() === name.toLowerCase())
      filterDb.length ?
        res.status(200).json(filterDb) :
        res.status(404).json('No se encuentra su pais')
    } else {
      return res.json(countryTotal)
    } 
})

router.get("/countries/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let countryTotal = await infoDb()
    if (id && !Number(id)) {
      const filterId = countryTotal.filter(el => el.id.toLowerCase() === id.toLowerCase())
      filterId.length > 0 ?
        res.status(200).json(filterId) :
        res.status(404).json("No se encuentra su pais")
    } else {
      res.status(404).json("error el id esta formado por 3 letras")
    }
  } catch (error) {
    console.log(error)
  }
})

router.post("/activity", async (req, res, next) => {
  const {
    name,
    dificultad,
    duracion,
    descripcion,
    temporada,
    paises,
  } = req.body
  try {
    const activityC ={
      name: name.toLowerCase(),
      dificultad,
      duracion,
      descripcion,
      temporada,
      paises,
    }
    const activityCreated = await createActivity(activityC)
    res.send("Creacion Exitosa")
  } catch (error) {
    next(error)
  }
})

router.get("/Activity", async (req, res) => {
  const infoALL = await getActivity()
  res.send(infoALL)
})

router.get("/continente", async (req, res)=>{
  const infoALL = await filterContinente()
  res.send(infoALL)
})

module.exports = router;