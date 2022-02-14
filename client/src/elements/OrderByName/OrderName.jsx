import React from "react";
import { useDispatch } from "react-redux";
import { orderByName } from "../../action/action";
import "./OrderName.css"


export default function OrderName({setMaxPageNumberLimit, setMinPageNumberLimit,setOrden, setCurrentPage}){
    const dispatch = useDispatch()
    
    function handleChangeName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setMaxPageNumberLimit(5);
        setMinPageNumberLimit(0);
        setOrden(`Ordenado ${e.target.value}`);
    }
    return (
        <div>
            <select className="Order" onChange={e=>handleChangeName(e)} >
                <option value="All" >Ordenar A/Z o Z/A</option>
                <option value="asc">A/Z</option>
                <option value="desc">Z/A</option>
            </select>
        </div>
    )
}