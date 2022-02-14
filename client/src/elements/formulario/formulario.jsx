import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getActivity, getAll, postActivity } from "../../action/action";
import "./formulario2.css"

const PatternValidation = (name) => {
    const regex = new RegExp(/^[A-Z]+$/i);
    return regex.test(name);
};

export default function Formulario() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [errors, setErrors] = useState({});
    const [disabled, setDisabled] = useState(true);
    const allCountry = useSelector((state) => state.Country)
    const [input, setInput] = useState({
        name: "",
        dificultad: "",
        duracion: "",
        descripcion: "",
        temporada: "",
        paises: []
    })

const allCountries = allCountry.sort((a, b)=>{
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;})

    
    useEffect(() => {
        dispatch(getAll())
        dispatch(getActivity())
    }, [dispatch])

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
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
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
    }

    function handleSelect(e) {
        if (e.target.value) {
            if(!input.paises.includes(e.target.value)){
                setInput({
                    ...input,
                    paises: [...input.paises, e.target.value]
                })
            }            
        }
        if (!e.target.value) {
            input.paises.splice(input.paises.indexOf(e.target.value), 1);
            setInput({
                ...input,
            });
        } setErrors(
            validate({
                ...input,
                [e.target.paises]: e.target.value
            })
        )
    }


    function handleDelete(el) {
        setInput({
            ...input,
            paises: input.paises.filter(occ => occ !== el)
        })
    }



    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postActivity(input));
        alert('Creado Con Exito');
        setInput({
            name: "",
            dificultad: "",
            duracion: "",
            descripcion: "",
            temporada: "",
            paises: []
        })
        navigate('/home')
    }

    function validate(input) {
        let errors = {};       
        if (!input.name) errors.name="Campo Requerido";
        if (input.name && !PatternValidation(input.name))errors.name = "Solo Letras";       
        if(!input.descripcion)errors.descripcion = "Campo Requerido";
        if(!input.duracion)errors.duracion = "Campo Requerido";
        if(input.duracion && Number(input.duracion) > 12) errors.duracion="maximo 12"
        if(!input.dificultad)errors.dificultad = "Campo Requerido";
        if(input.dificultad && Number(input.dificultad) > 5) errors.dificultad="maximo 5"
        // if(!input.temporada)errors.temporada = "Campo Requerido";
        
        return errors;
    }
  
    useEffect(() => {
        if (
            !input.paises.length -1 &&
            !input.temporada.length -1 &&
            !errors.hasOwnProperty("name") &&
            !errors.hasOwnProperty("descripcion") &&
            !errors.hasOwnProperty("dificultad") &&
            !errors.hasOwnProperty("duracion") 
            // !errors.hasOwnProperty("temporada")
            // !errors.hasOwnProperty("paises")
        ) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [errors, setDisabled,input.temporada.length,input.paises]);


    return (
        <div className="containerForm">
            <div className="containerTotal">   

            <h1 className="h1Form">CREA TU ACTIVIDAD TURISTICA</h1>
  
            <div className="containerTotal2">  

            
            <div className="containerBtnForm">
            <Link  to="/home">
                <button className="containerFormLink">Volver</button>
            </Link>
            </div>


            <form onSubmit={handleSubmit}>
                <div className="containerNameForm">
                    <label>Nombre: </label>
                    <input
                    className="inputName"
                        value={input.name}
                        name="name"
                        type="text"
                        autoComplete="off"
                        onChange={handleChange}
                    />
                    {errors.name && (
                        <p className="errors" >{errors.name}</p>
                    )}
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
                    {errors.dificultad && (
                        <p className="errors" >{errors.dificultad}</p>
                    )}
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
                    {errors.duracion && (
                        <p className="errors">{errors.duracion}</p>
                    )}
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
                {errors.descripcion && (
                    <p className="errors" >{errors.descripcion}</p>
                )}

                </div>               

                <div className="containerSelect">
                    <select className="selectChild" defaultValue="disabled" onChange={e => handleSelect(e)}>
                        <option value="disable">Seleccione al menos 1 Pais</option>
                        {allCountries?.map(el => {
                            return (
                                <option key={el.id} name={el.name} value={el.name} >{el.name}</option>
                            )
                        })}
                    </select>
                    {errors.paises && (
                        <p className="errorsPaises" >{errors.paises}</p>
                    )}
                    {!input.paises.length ? (
                        <p className="errorsPaises">Campo Requerido</p>
                        
                    ) : null}
                </div>

                <div className="ContainerPaises">
            {
                input.paises.map(el =>
                    <div className="childPaises" key={el}>
                        <p>{el}</p>
                        <button
                            onClick={() => handleDelete(el)}
                        >x</button>
                    </div>
                )}
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
                    {!input.temporada.length?(<p className="errorsTemporada">Campo Requerido</p>): null}
                    {input.temporada.length > 1 ? (
                        <p className="errorsTemporada">Seleccione Máximo 1 Temporada</p>
                        
                    ) : null}
                    </div>
                </div>
              
               <div className="containerButonFormCreated">
                <button
                className="butonFormCreated"
                    type="submit"
                    disabled={disabled}
                >Crear</button>
                </div>

            </form>            
                </div>
                </div>
        </div>

    )
}