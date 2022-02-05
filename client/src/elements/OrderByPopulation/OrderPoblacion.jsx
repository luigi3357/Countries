import React from "react";
import { useDispatch } from "react-redux";
import { orderByPopulation } from "../../action/action";


export default function OrderPoblacion({setCurrentPage, setOrden}){
    const dispatch = useDispatch()
    function handleChangePopulation(e){
        e.preventDefault()
        dispatch(orderByPopulation(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`);
    }
    return(
        <div>
            <select defaultValue="disabled" onChange={e=>handleChangePopulation(e)}>
                <option value="disabled" disabled>Ordenar segun Poblacion</option>
                <option value="asc">Mayor Poblacion</option>
                <option value="desc">Menor Poblacion</option>
            </select>
        </div>
    )
}