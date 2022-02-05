import React from "react";
import { Link } from "react-router-dom";

export function Card({image, name, id, continente, poblacion, Activities }){
    return(
        <div>
            <Link to={"/home/"+id}>
            <p>code: {id}</p>          
            <b>{name}</b><br/>              
            <img src={image} alt="Not Found" width="250px" height="250"/>
            <p>Continente: {continente}</p>
            <p>Poblacion: {poblacion}</p>
            <p>{Activities}</p>
            </Link>
        </div>
    )
}