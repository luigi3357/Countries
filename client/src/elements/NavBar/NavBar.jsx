import { React } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAll } from "../../action/action";
import FilterActivity from "../FilterActivity/FilterActivity";
import FilterContinente from "../FilterContinente/FilterContinente";
import OrderName from "../OrderByName/OrderName";
import SearchBar from "../SearchBar/SearchBar";
import OrderPoblacion from "../OrderByPopulation/OrderPoblacion"
import "./NavBar.css"

export default function NavBar({ name, setName, setOrden, setCurrentPage, setMaxPageNumberLimit, setMinPageNumberLimit, pageNumberLimit,maxPageNumberLimit,minPageNumberLimit, currentCountry }) {
    const dispatch = useDispatch();

    function handleClick(e) {
        e.preventDefault();
        dispatch(getAll());
        setCurrentPage(1)
    }


    return (
        <div className="containerNav">
            <div className="containerBtn">
                <div className="containerCrear">
                <Link to='/home/activity'>
                    <button className="btnCrear" >Crear actividades</button>
                </Link>
                </div>
                <div className="containerVolver">
                <Link to="/">
                    <button className="btnVolver" >Volver</button>
                </Link>
                </div>
                <div className="containerRefresh">
                <Link to="">
                <button className="btnRefresh" onClick={e => { handleClick(e) }}>Recargar los Paises</button>
                </Link>
                </div>
               
               
               
            </div>

            <div>
                <SearchBar 
                name={name} 
                setName={setName} 
                setCurrentPage={setCurrentPage} 
                pageNumberLimit={pageNumberLimit}
                currentCountry={currentCountry}
                minPageNumberLimit={minPageNumberLimit}
                maxPageNumberLimit={maxPageNumberLimit}
                setMaxPageNumberLimit={setMaxPageNumberLimit}
                setMinPageNumberLimit={setMinPageNumberLimit}
                />
            </div>

            <div>
                <FilterActivity 
                setCurrentPage={setCurrentPage}
                pageNumberLimit={pageNumberLimit}
                minPageNumberLimit={minPageNumberLimit}
                maxPageNumberLimit={maxPageNumberLimit}
                setMaxPageNumberLimit={setMaxPageNumberLimit}
                setMinPageNumberLimit={setMinPageNumberLimit}
                />
            </div>

            <div>
                <FilterContinente
                setCurrentPage={setCurrentPage}
                pageNumberLimit={pageNumberLimit}
                minPageNumberLimit={minPageNumberLimit}
                maxPageNumberLimit={maxPageNumberLimit}
                setMaxPageNumberLimit={setMaxPageNumberLimit}
                setMinPageNumberLimit={setMinPageNumberLimit}
                 />
            </div>

            <div>
                <OrderName 
                setOrden={setOrden} 
                setCurrentPage={setCurrentPage} 
                pageNumberLimit={pageNumberLimit}
                minPageNumberLimit={minPageNumberLimit}
                maxPageNumberLimit={maxPageNumberLimit}
                setMaxPageNumberLimit={setMaxPageNumberLimit}
                setMinPageNumberLimit={setMinPageNumberLimit}
                />
            </div>

            <div>
                <OrderPoblacion 
                setOrden={setOrden} 
                setCurrentPage={setCurrentPage} 
                pageNumberLimit={pageNumberLimit}
                minPageNumberLimit={minPageNumberLimit}
                maxPageNumberLimit={maxPageNumberLimit}
                setMaxPageNumberLimit={setMaxPageNumberLimit}
                setMinPageNumberLimit={setMinPageNumberLimit}
                />
            </div>

        </div>

    )
}
