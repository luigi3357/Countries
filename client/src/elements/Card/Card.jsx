import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export function Card({ image, name, id, continente, poblacion, Activities }) {
    const name2 = name.split(" ").slice(0, 2).join(" ")
    return (
        <div className="containerCard">
            <Link to={"/home/" + id}>
                <div className= "containerHiden">
                    <b className="nameCard">{name2}</b>
                    <img className="imageCard" src={image} alt="Not Found" width="250px" height="250" />
                    <p className="continenteCard">Continente: {continente}</p>                    
                </div>
            </Link>
        </div>
    )
}