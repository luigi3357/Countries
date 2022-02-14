import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getActivity, getAll, putActivity } from "../../action/action";
import "./formulario2.css"



export default function FormularioPut() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const allActivity = useSelector((state) => state.activity)

    const [input, setInput] = useState({
        name: [],
        dificultad: "",
        duracion: "",
        descripcion: "",
        temporada: "",
    })

    useEffect(() => {
        dispatch(getAll())
        dispatch(getActivity())
    }, [dispatch])

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }
    console.log(input.name, "hola")

    function handleSelect(e) {
        if (e.target.value) {
            if (!input.name.includes(e.target.value)) {
                console.log("entre")
                setInput({
                    ...input,
                    name: [e.target.value]
                })
            }  
            if (!e.target.value) {
                input.name.splice(input.name.indexOf(e.target.value), 1);
                setInput({
                    ...input,
                });
            }
        }
    }
        function handleCheckTemporada(e) {
            if (e.target.checked) {
                setInput({
                    ...input,
                    temporada: [...input.temporada, e.target.value],
                });
            }
            if (!e.target.checked) {
                input.temporada.splice(input.temporada.indexOf(e.target.value), 1);
                setInput({
                    ...input,
                });
            }
        };

        function handleSubmit(e) {
            e.preventDefault();
            dispatch(putActivity(input));
            alert('Actualizado Con Exito');
            setInput({
                dificultad: "",
                duracion: "",
                descripcion: "",
                temporada: "",
            })
            navigate('/home')
        }


        return (
            <div className="containerForm">
                <div className="containerTotal">
                    <h1 className="h1Form">ACTUALIZA LA ACTIVIDAD TURISTICA</h1>
                    <div className="containerTotal2">

                        <div className="containerBtnForm">
                            <Link to="/home">
                                <button className="containerFormLink">Volver</button>
                            </Link>
                        </div>


                        <form onSubmit={handleSubmit}>

                            <div className="containerSelect">
                                <select className="selectChild" defaultValue="disabled" onChange={e => handleSelect(e)}>
                                    <option value="disabled" disabled>Selecciona Actividad</option>

                                    {
                                        allActivity?.map(e => {
                                            return <option key={e.id} value={e.name}>{e.name}</option>
                                        })
                                    }

                                </select>
                            </div>
                            <div className="containerDificultad">
                                <label>Dificultad: </label>
                                <input
                                    className="inputDificultad"
                                    value={input.dificultad}
                                    name="dificultad"
                                    type="number"
                                    autoComplete="off"
                                    min="1" max="5"
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="containeDuracion">
                                <label>Duracion: </label>
                                <input
                                    className="inputDuracion"
                                    value={input.duracion}
                                    name="duracion"
                                    type="number"
                                    autoComplete="off"
                                    min="1" max="12"
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="containerDescripcion">

                                <label>Descripcion: </label><br />
                                <textarea
                                    className="textArea"
                                    value={input.descripcion}
                                    name="descripcion"
                                    type="text"
                                    autoComplete="off"
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="containerChecbox">
                                <b >Seleccionar una Temporada: </b>
                                <div className="checkboxChild">
                                    <label>Invierno</label>
                                    <input

                                        type="checkbox"
                                        id="Invierno"
                                        value="Invierno"
                                        onChange={handleCheckTemporada}
                                    />
                                    <label>Primavera</label>
                                    <input
                                        type="checkbox"
                                        id="Primavera"
                                        value="Primavera"
                                        onChange={handleCheckTemporada}
                                    />
                                    <label>Verano</label>
                                    <input type="checkbox"
                                        id="Verano"
                                        value="Verano"
                                        onChange={handleCheckTemporada}
                                    />
                                    <label>Otoño</label>
                                    <input
                                        type="checkbox"
                                        id="Otoño"
                                        value="Otoño"
                                        onChange={handleCheckTemporada}
                                    />
                                </div>
                            </div>

                            <div className="containerButonFormCreated">
                                <button
                                    className="butonFormCreated"
                                    type="submit"

                                >Actualizar</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        )
    }