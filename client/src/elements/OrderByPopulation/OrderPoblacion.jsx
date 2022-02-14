import React from "react";
import { useDispatch } from "react-redux";
import { orderByPopulation } from "../../action/action";
import "./OrderPopulation.css"


export default function OrderPoblacion({setMaxPageNumberLimit, setMinPageNumberLimit,setOrden, setCurrentPage}){
    const dispatch = useDispatch()
    
    function handleChangePopulation(e){
        e.preventDefault();
        dispatch(orderByPopulation(e.target.value));
        setCurrentPage(1);
        setMaxPageNumberLimit(5);
        setMinPageNumberLimit(0);
        setOrden(`Ordenado ${e.target.value}`);
    }
    return(
        <div>
            <select className="population" defaultValue="disabled" onChange={e=>handleChangePopulation(e)}>
                <option value="disabled" disabled>Ordenar segun Poblacion</option>
                <option value="asc">Mayor Poblacion</option>
                <option value="desc">Menor Poblacion</option>
            </select>
        </div>
    )
}