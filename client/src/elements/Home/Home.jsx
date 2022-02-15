import React, { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAll, getActivity, getByContinente } from "../../action/action";
import { Card } from "../Card/Card";
import { Paginado } from "../Paginate/Paginado";
import NavBar from "../NavBar/NavBar";
import "./Home.css"
export default function Home() {

    const dispatch = useDispatch()

    const allCountry = useSelector(state => state.Country)
    const [name, setName] = useState(""); 
    const [orden, setOrden] = useState(``);


    const [currentPage, setCurrentPage] = useState(1);
    const [CountryPerPage, setCountryPerPage] = useState(9);
    const indexLastCountry = currentPage * CountryPerPage;
    const indexFirstCountry = indexLastCountry - CountryPerPage;
    const currentCountry = allCountry.slice(indexFirstCountry, indexLastCountry);

    const [pageNumberLimit, setPageNumberLimit] = useState(5)
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)

    console.log(currentCountry.length ? currentCountry : "hola")

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    useEffect(() => {
        dispatch(getAll())
        dispatch(getActivity())
        dispatch(getByContinente())
    }, [dispatch])

    return (
        <div >

            <div className="navBar">
                <NavBar
                    orden={orden}
                    name={name}
                    setName={setName}
                    setOrden={setOrden}
                    setCurrentPage={setCurrentPage}
                    pageNumberLimit={pageNumberLimit}
                    minPageNumberLimit={minPageNumberLimit}
                    maxPageNumberLimit={maxPageNumberLimit}
                    setMaxPageNumberLimit={setMaxPageNumberLimit}
                    setMinPageNumberLimit={setMinPageNumberLimit}
                    setPageNumberLimit={setPageNumberLimit}
                    currentCountry={currentCountry}
                />
            </div>


            <div>
                <Paginado
                    CountryPerPage={CountryPerPage}
                    allCountry={allCountry.length}
                    paginado={paginado}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setCountryPerPage={setCountryPerPage}
                    pageNumberLimit={pageNumberLimit}
                    minPageNumberLimit={minPageNumberLimit}
                    maxPageNumberLimit={maxPageNumberLimit}
                    setMaxPageNumberLimit={setMaxPageNumberLimit}
                    setMinPageNumberLimit={setMinPageNumberLimit}
                />
            </div>

            <div className="containerCardHome" >
                {
                    currentCountry?.map(e => {
                        return (
                            <div
                                className="CardHome"
                                key={e.id}>
                                <Card
                                    id={e.id}
                                    name={e.name}
                                    image={e.image}
                                    continente={e.continente}
                                />
                            </div>
                        )
                    }) 
                }
            </div>
            <img src="https://besthqwallpapers.com/Uploads/24-6-2019/97100/thumb2-glass-world-map-blue-background-world-map-concept-artwork-creative.jpg" alt="" className="imgHome" />

            <div className="footer"><p >Copyright © 2018</p></div>
        </div>
    )


}