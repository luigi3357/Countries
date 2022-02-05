import React from "react";
// import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../action/action";
import "./SearchBar.css"
 
 export default function SearchBar({name, setName, setCurrentPage}){

    const dispatch = useDispatch();
    

 function handleInputChange (e){
     e.preventDefault();
     setName(e.target.value) 
 }

 function handleSubmit(e){
     e.preventDefault();
     dispatch(getByName(name));
     setCurrentPage(1)
     setName('')
 }

    return(
        <div>
            <div>
            <form onSubmit={ e=>{handleSubmit(e)} } >
               
            <input 
            className="inputSearch"
            value={name} 
            type="search" 
            key="unique" 
            onChange={e=>{handleInputChange(e)}} 
            ></input> 
            <button className="btnSearch" type="Submit">Buscar</button> 
                       
                
            </form>
            </div>
        </div>
    )
 }