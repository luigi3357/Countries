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

export default function NavBar({ name, setName, setOrden, setCurrentPage }) {
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
                <Link to='/activity'>
                    <a className="btnCrear" >Crear actividades</a>
                </Link>
                </div>
                <div className="containerVolver">
                <Link to="/">
                    <a className="btnVolver" >Volver</a>
                </Link>
                </div>
                <div className="containerRefresh">
                <Link to="">
                <a className="btnRefresh" onClick={e => { handleClick(e) }}>Recargar los Paises</a>
                </Link>
                </div>
               
               
               
            </div>

            <div>
                <SearchBar name={name} setName={setName} setCurrentPage={setCurrentPage} />
            </div>

            <div>
                <FilterActivity setCurrentPage={setCurrentPage} />
            </div>

            <div>
                <FilterContinente setCurrentPage={setCurrentPage} />
            </div>

            <div>
                <OrderName setOrden={setOrden} setCurrentPage={setCurrentPage} />
            </div>

            <div>
                <OrderPoblacion setOrden={setOrden} setCurrentPage={setCurrentPage} />
            </div>

        </div>

    )
}
