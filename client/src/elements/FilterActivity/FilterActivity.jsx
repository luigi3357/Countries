import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByActivity } from "../../action/action";
import "./FilterActivity.css"


export default function FilterActivity({setMaxPageNumberLimit, setMinPageNumberLimit,setCurrentPage}){

 const allActivity = useSelector((state)=>state.activity)

 const dispatch = useDispatch();
 
 function handleChange(e){
     dispatch(filterByActivity(e.target.value));
     setCurrentPage(1);
     setMaxPageNumberLimit(5);
     setMinPageNumberLimit(0);
 }

    return(
        <div>
            <select className="activity" defaultValue="disabled" onChange={e=>handleChange(e)}>
                <option value="disabled" disabled>Buscar Actividad</option>
                <option value="All">Todos</option>
                {
                    allActivity?.map(e=>{
                        return  <option key={e.id} value={e.name}>{e.name}</option>
                    })
                }
               
            </select>

            
        </div>
    )
}