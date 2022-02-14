require("dotenv").config();
const { Country, Activity } = require('../db.js');
const axios = require('axios')

async function infoApi(){
    const countryData = await axios.get("https://restcountries.com/v3/all")
 
    const infoapis = await countryData.data.map(e=>{
        return{
            id: e.cca3,
            name: e.name.common.toLowerCase(),
            image: e.flags[1],
            continente: e.region,
            capital: e.capital? e.capital:"No tiene",
            subRegion: e.subregion? e.subregion: "No tiene",
            area: e.area,
            poblacion: e.population,
        }
    })   
    return infoapis
}


async function infoDb(){
    return await Country.findAll({
        include:{
            model: Activity,
            attributes:["name", "id", "descripcion","dificultad","duracion","temporada"],            
            through:{
                attributes:[]
            }
        }
    })
}



async function getAll(){
    const apiInfo = await infoApi();
    const dbInfo = await infoDb();
    const getAllCountry = apiInfo.concat(dbInfo);
    return getAllCountry
}

function convert (str){
    return str.charAt(0).toUpperCase() + str.slice(1);
 }

 async function getActivity(){
    let activities = await Activity.findAll({})
    let info2 = await activities.map(e=>e.dataValues)  
      
    return info2
 }

 async function createActivity(activity){
    let { name, descripcion, dificultad, duracion, temporada, paises } = activity;
     
    
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
 }
}

 async function filterContinente(){
     const info = await infoDb()
     const info2 = info.map(e=> e.continente)
     
     const unicos = info2.filter((valor, indice) => {
        return info2.indexOf(valor) === indice;
      } );
      
      return unicos
   
        //   infoapi.push(info2[i].split(', '))
 }

module.exports = { infoApi, infoDb, getAll, convert, getActivity, createActivity,filterContinente }