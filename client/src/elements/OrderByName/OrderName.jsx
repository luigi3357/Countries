import React from "react";
import { useDispatch } from "react-redux";
import { orderByName } from "../../action/action";


export default function OrderName({setOrden, setCurrentPage}){
    const dispatch = useDispatch()
    function handleChangeName(e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`);
    }
    return (
        <div>
            <select defaultValue="disabled" onChange={e=>handleChangeName(e)} >
                <option value="disabled" disabled>Ordenar A/Z o Z/A</option>
                <option value="asc">A/Z</option>
                <option value="desc">Z/A</option>
            </select>
        </div>
    )
}