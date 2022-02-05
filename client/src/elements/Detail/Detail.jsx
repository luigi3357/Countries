import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getById, resetId } from "../../action/action";



export const Detail = (props) => {
    const dispatch = useDispatch();
    const { id } = useParams() 
  
    useEffect(() => {
        dispatch(getById(id))
    }, [dispatch, id])    

    const myCountry = useSelector((state) => state.paramsd) 
    function handleReset(){
        dispatch(resetId())
    }
    const renderActivity = myCountry.length > 0 ? myCountry[0].Activities.map(e=>{
        return(
            <div key={e.id}>
               <b>Actividades Turisticas: <br/></b>
               <b>Tipo: {e.name}</b>
               <p>Temporada: {e.temporada}</p>
               <p>Duracion: {e.duracion}</p>
               <p>Dificultad: {e.dificultad}</p>
               <p>Descripcion: {e.descripcion}</p>
            </div>
        )
    }): "no tiene"

    return (
        <div>            
            <Link to="/home">
                <button onClick={e=>{handleReset()}} >Volver</button>                 
            </Link> 
                        {
                myCountry.length > 0 ?
                <div>
                    <b>{myCountry[0].name}</b>
                    <p>Codigo de pais: {myCountry[0].id}</p>
                    <p>continente: {myCountry[0].continente}</p>
                    <p>Capital: {myCountry[0].capital}</p>
                    <p>{myCountry[0].subRegion}</p>
                    <p>Area: {myCountry[0].area} km2</p>
                    <p>Poblacion: {myCountry[0].poblacion}</p>
                    <img src={myCountry[0].image} alt="Not Found"/>
                    <div>{renderActivity}</div>
                </div>
                    : <p>Loading...</p>
            }
             
        </div>
    )

}

// [ ] Actividades turísticas con toda su información asociada
