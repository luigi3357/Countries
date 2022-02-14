import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByContinente } from "../../action/action";
import "./FilterContinente.css"



export default function FilterContinente({setMaxPageNumberLimit, setMinPageNumberLimit,setCurrentPage}){
const dispatch = useDispatch()

function handleChangeContinente(e){
    e.preventDefault();
    dispatch(filterByContinente(e.target.value));
    setCurrentPage(1);
    setMaxPageNumberLimit(5);
    setMinPageNumberLimit(0);
}

    const allCountry = useSelector((state)=> state.continente)
    return (
        <div>
            <select className="continente" defaultValue="disabled" onChange={e=>handleChangeContinente(e)}  >
                <option value="disabled" disabled>Buscar Continente</option>
                <option value="All">Todos</option>
                
                {
                  allCountry.map(e=>{
                      return(
                          <option  key={e} value={e}>{e}</option>
                      )
                  })
                }
                
            </select>
        </div>
    )
}