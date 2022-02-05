import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByContinente } from "../../action/action";



export default function FilterContinente({setCurrentPage}){
const dispatch = useDispatch()

function handleChangeContinente(e){
    e.preventDefault()
    dispatch(filterByContinente(e.target.value))
    setCurrentPage(1)
}

    const allCountry = useSelector((state)=> state.continente)
    return (
        <div>
            <select defaultValue="disabled" onChange={e=>handleChangeContinente(e)}  >
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