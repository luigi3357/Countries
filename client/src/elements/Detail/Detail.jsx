import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getById, resetId } from "../../action/action";
import "./Detail.css"


export const Detail = (props) => {
    const dispatch = useDispatch();
    const { id } = useParams()

    useEffect(() => {
        dispatch(getById(id))
    }, [dispatch, id])

    const myCountry = useSelector((state) => state.paramsd)

    function handleReset() {
        dispatch(resetId())
    }   

    const renderActivity = myCountry.length > 0 ? myCountry[0].Activities.map(e => {
        return (
            <div key={e.id} className="containerActividad"> 
            <div>
            <div className="nameTemp">               
                <p>Nombre: {e.name}</p>
                <p>Temporada: {e.temporada}</p>
                </div>
                
                <div className="durDifDetail">
                <p>Duracion: {e.duracion}</p>
                <p>Dificultad: {e.dificultad}</p>
                </div>

                </div>
                <div className="descripcionDetail"><p>Descripcion: </p>
                <p>{e.descripcion}</p>
                <Link  to ="/home/activity/update">
                    <button className="linkHomeBtn">Actualizar</button>
                </Link>
                </div>
              

            </div>
        )
    }) : "no tiene"

    return (
        <div className="containerDetail">
            <div className="linkHome">
            <Link  to="/home">
                <button className="linkHomeBtn" onClick={e => { handleReset() }} >Volver</button>
            </Link>
            <Link to ="/activity" ><button className="linkHomeBtn2">Crear Actividad</button></Link>
            </div>
            {
                myCountry.length > 0 ?
                <div>
                    <div className="containerCardDetail">
                        <img className="imageDetail" src={myCountry[0].image} alt="Not Found" />
                        <p className="idDetail" >Codigo de pais: {myCountry[0].id}</p>                        
                        <b className="nameDetail">{myCountry[0].name}</b>
                        <div className="containerCapCon">
                        <p className="continenteDetail">continente: {myCountry[0].continente}</p>
                        <p className="capitalDetail">Capital: {myCountry[0].capital}</p>
                        </div>
                        <div className="areaPoblacionDetail">
                        <p className="areaDetail">Area: {myCountry[0].area} km2</p>
                        <p className="poblacionDetail">Poblacion: {myCountry[0].poblacion}</p>
                        </div>
                        <p className="subRegionDetail">{myCountry[0].subRegion ?myCountry[0].subRegion: "No Posee Sub Region" }</p>
                        <b>Actividades Turisticas: <br /></b>
                        </div>
                        <div className="renderActivityDetail">{renderActivity.length ? renderActivity: <p className="pNotiene">Este pais no tiene actividades conocidas si conoces alguna agregala tocando el boton crear actividad</p>}</div>
                     </div>
                    
                    : <img className="imgDetailBackground2" src="https://i.gifer.com/EXfb.gif" alt="Not Found"/>
            }
            <img className="imgDetailBackground" src="https://media.slidesgo.com/storage/16786918/conversions/35-world-countries-lesson-thumb.jpg" alt="Not Found"/>

        </div>
    )

}