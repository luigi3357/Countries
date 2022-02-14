import React from "react";
import './Paginado.css'

export  const Paginado = ({ allCountry, paginado, currentPage, setCurrentPage, setCountryPerPage, CountryPerPage, setMaxPageNumberLimit, setMinPageNumberLimit, pageNumberLimit,maxPageNumberLimit,minPageNumberLimit })=>{

    const pageNumber = []
    if(currentPage === 1){
        setCountryPerPage(CountryPerPage = 10)
    }else{
        setCountryPerPage(CountryPerPage = 9)        
    }
    for (let i = 0; i <= Math.ceil(allCountry/CountryPerPage); i++) {
        pageNumber.push(i);               
    }

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

   const renderPage = pageNumber.map(n =>{
       if(n < maxPageNumberLimit + 1 && n > minPageNumberLimit){
        return(
            <li key={n} className={currentPage === n? "active": null} onClick={()=> paginado(n)} >
            <p>{n}</p>
            </li>           
        )
       }else{
           return null
       }     
     })

 
    return (     
            <ul key="alt"className='pageNumbers'>
               <li><button className 
               onClick={()=>{handlePrevBtn()}}
               disabled={currentPage === pageNumber[1] ? true: false}
               ><p className="pButton">&#8920;</p></button></li>   
                {renderPage}
               <li>
               <button 
               onClick={()=>{handleNextBtn()}}
               disabled={currentPage === pageNumber[pageNumber.length - 1] ? true: false}

               ><p className="pButton">&#8921;</p></button>
               </li>
            </ul>       
    )
}