import React, { useState } from "react";
import './Paginado.css'

export  const Paginado = ({allCountry, paginado, currentPage, setCurrentPage, setCountryPerPage, CountryPerPage })=>{
    
  

    const [pageNumberLimit, setPageNumberLimit] = useState(5)
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)


    const pageNumber = []
    if(currentPage === 1){
        setCountryPerPage(CountryPerPage = 10)
    }else{
        setCountryPerPage(CountryPerPage = 9)        
    }
    for (let i = 0; i <= Math.ceil(allCountry/CountryPerPage); i++) {
        pageNumber.push(i);               
    }
  

   const renderPage = pageNumber.map(n =>{
       if(n < maxPageNumberLimit + 1 && n > minPageNumberLimit){
        return(
            <li key={n} className={currentPage === n? "active": null} onClick={()=> paginado(n)} >
            {n}
            </li>           
        )
       }else{
           return null
       }     
     })

     function handleNextBtn (){
        setCurrentPage(currentPage + 1)
        if(currentPage +1 > maxPageNumberLimit){
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        }
     }

     function handlePrevBtn (){
        setCurrentPage(currentPage-1)
        if((currentPage - 1)%pageNumberLimit === 0){
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
        }
     }
     
    return (     
            <ul key="alt"className='pageNumbers'>
               <li><button 
               onClick={()=>{handlePrevBtn()}}
               disabled={currentPage === pageNumber[1] ? true: false}
               >&#8810;</button></li>               
                
                {renderPage} 

               <li>
               <button 
               onClick={()=>{handleNextBtn()}}
               disabled={currentPage === pageNumber[pageNumber.length - 1] ? true: false}

               >&#8811;</button>
               </li>
            </ul>       
    )
}