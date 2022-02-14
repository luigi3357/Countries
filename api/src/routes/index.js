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
  try{  
    const valdidateact = await Activity.findOne({
      where: {
        name: name,
      },
    });
  
    if (!valdidateact) {
      const addAct = await Activity.create({
        name: name.toLowerCase(),
        dificultad: dificultad,
        duracion: duracion,
        temporada: temporada.toString(),
        descripcion: descripcion,
      });
      const countrymatch = await Country.findAll({
        where: {
          name: paises,
        },
      });
  
      const resact = await addAct.addCountries(countrymatch);
  
      return res.send(resact);
    }
    
    const countrymatch = await Country.findAll({
      where: {
        name: paises,
      },
    });
    // console.log(addAct)
    // console.log(countrymatch)
  
    const resact = await valdidateact.addCountries(countrymatch);
  
    return res.send(resact);
  
   }catch(error){
     console.log(error)
   }
  });

 

router.get("/Activity", async (req, res) => {
  const infoALL = await getActivity()
  res.send(infoALL)
})

router.get("/continente", async (req, res)=>{
  const infoALL = await filterContinente()
  res.send(infoALL)
})

router.get("/order/:order", async (req, res)=>{
  let countryTotal = await infoDb()
const {order} = req.params
if(order ==="All"){
  return res.send(countryTotal)
}
if(order === "asc"){
 let ascendente = countryTotal.sort((a, b)=>{
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
})
return res.send(ascendente)
}
if(order === "desc"){
  let descendiente = countryTotal.sort((a, b)=>{
    if (a.name > b.name) return -1;
    if (a.name < b.name) return 1;
    return 0;
})
return res.send(descendiente)
}
})

router.get("/filter/:continente", async (req, res)=>{
  let countryTotal = await infoDb()
  let { continente }=req.params
  if(continente==="All"){
    res.send(countryTotal)
  }else{
    let filtro = countryTotal.filter(el=> el.continente.toLowerCase() === continente.toLowerCase())
   return res.send(filtro)
  }
})

router.put("/activity", async (req, res)=>{
  const {
    
    name,
    dificultad,
    duracion,
    descripcion,
    temporada,   
  } = req.body
  let getactividad= await getActivity()
let search = getactividad.filter(e=> e.name === name.toString()) 
console.log(search)

if(search.length){
  const result = await Activity.update(
    { 
      dificultad: dificultad? dificultad: search.dificultad,
      duracion: duracion? duracion: search.duracion,
      descripcion: descripcion?descripcion: search.descripcion,
      temporada: temporada?temporada.toString(): search.descripcion,     
     }, //what going to be updated
    { where: { name: name }} // where clause
  ) 
  
console.log(result,"mmmm")
 return res.send(result)
}else{
  return res.send("La actividad no existe")
}
})

module.exports = router;