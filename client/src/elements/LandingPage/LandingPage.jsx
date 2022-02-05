import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import {Link} from "react-router-dom"
import { getActivity, getAll, getByContinente } from "../../action/action"
import Home from "../Home/Home"
import "./LandingPage.css"


export default function LandingPage(){

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAll());
    }, [Home])


    return(
        <div>
            <h1 className="landingTitle"><span className="landingSpan">BIENVENIDOS</span></h1>
            <div className="landingContainer" ><Link to="/home" className="landingLink"><a className="landingButton">Comencemos</a></Link>                </div>
            <img className="landingImage" src="https://images5.alphacoders.com/312/thumb-1920-312766.jpg" alt="Not Found"/>
        </div>
    )
}
