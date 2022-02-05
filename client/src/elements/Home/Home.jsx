import React, { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAll, getActivity, getByContinente } from "../../action/action";
import { Card } from "../Card/Card";
import {Paginado} from "../Paginate/Paginado";
import NavBar from "../NavBar/NavBar";
import "./Home.css"
export default function Home(){

    const dispatch = useDispatch()

    const allCountry = useSelector(state => state.Country)
    const [name, setName]=useState("");
    const [orden, setOrden] = useState(``);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [CountryPerPage, setCountryPerPage] = useState(9);
    const indexLastCountry = currentPage * CountryPerPage;
    const indexFirstCountry = indexLastCountry - CountryPerPage;    
    const currentCountry = allCountry.slice(indexFirstCountry, indexLastCountry);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)       
    };
 


    useEffect(()=>{        
        dispatch(getAll())
        dispatch(getActivity())
        dispatch(getByContinente())
    },[dispatch])

    return(
        <div >

            <div>
                <NavBar 
                orden={orden}
                name={name} 
                setName={setName} 
                setOrden={setOrden} 
                setCurrentPage={setCurrentPage} />
            </div>

        <div>
        <Paginado
             CountryPerPage = {CountryPerPage} 
             allCountry = {allCountry.length} 
             paginado = {paginado}
             currentPage = {currentPage}
             setCurrentPage = {setCurrentPage}             
             setCountryPerPage ={setCountryPerPage}
             />
        </div>

        <div>
            {
                currentCountry?.map(e=>{
                    return (
                        <div key={e.id}>
                            <Card 
                            name={e.name} 
                            image ={e.image} 
                            id={e.id}
                            continente={e.continente}
                            poblacion ={e.poblacion}
                            Activities={e.Activities.name}
                            />
                        </div>
                    )
                })
            }
        </div>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROPCGVRN29QlVxl5PiMnrMGL-5uU5oqOTL1JbYQQ21ShPbvBHaqIdsdoMWMEnyrWYoCz0&usqp=CAU" alt="" className="imgHome" />
        
        </div>
    )

}