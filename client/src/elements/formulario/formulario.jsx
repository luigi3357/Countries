import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getActivity, getAll, postActivity } from "../../action/action";

const PatternValidation = (name) => {
    const regex = new RegExp("^ [0-9] * $");
    return regex.test(name);
};
export default function Formulario() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [errors, setErrors] = useState({});
    const [disabled, setDisabled] = useState(true);

    const allCountry = useSelector((state)=>state.Country)

    const [input, setInput] = useState({
        name: "", 
        dificultad: "", 
        duracion: "", 
        descripcion: "",
         temporada: "", 
         paises:[] 
    })
    

    useEffect(()=>{        
        dispatch(getAll())
        dispatch(getActivity())
    },[dispatch])

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
           paises:[] 
        })
        navigate('/home')
    }

    function handleSelect(e) {
        if(e.target.value){
            setInput({
                ...input,
                paises: [...input.paises, e.target.value]
            })          
        }
        if(!e.target.value){
            input.paises.splice(input.paises.indexOf(e.target.value), 1);
                  setInput({
                    ...input,
                  });
        }setErrors(
            validate({
                ...input,
                [e.target.paises]: e.target.value
            })
        )     
    }

    function handleCheckTemporada(e) {
        //Para seleccionar los tipos del pokemon
        if (e.target.checked) {
          //cuando este es seleccionado guarda el tipo en un arreglo
          setInput({
            ...input,
            temporada: [...input.temporada, e.target.value],
          });
        }
        if (!e.target.checked) {
          //cuando el tipo es deselecconado, lo saca del array de tipos
          input.temporada.splice(input.temporada.indexOf(e.target.value), 1);
          setInput({
            ...input,
          });
        }
        setErrors(
          validate({ //validamos errores
            ...input,
            [e.target.name]: e.target.value,
          })
        );
      }
    function handleDelete(el){
        setInput({
            ...input,
            paises : input.paises.filter(occ => occ !== el) 
        })
    }

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        console.log(input)
    }


    function validate(input) {
        let errors = {};
        if (!input.name) errors.name="Campo Requerido";
        if(Number(input.name) === !NaN) errors.name="Solo Letras";
        if(!input.descripcion)errors.descripcion = "Campo Requerido";
        if(!input.duracion)errors.duracion = "Campo Requerido";
        if(!input.dificultad)errors.dificultad = "Campo Requerido";
        if(!input.temporada)errors.temporada = "Campo Requerido";
        if (PatternValidation(Number(input.name)))errors.name = "Solo Letras";
       
        return errors;
    }

    useEffect(() => {
        if (           
            input.temporada.length > 1 &&
            !errors.hasOwnProperty("name")&&
            !errors.hasOwnProperty("descripcion")&&
            !errors.hasOwnProperty("dificultad")&&
            !errors.hasOwnProperty("duracion")&&
            !errors.hasOwnProperty("temporada")
        ) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [errors, input, setDisabled]);


    return (
        <div>
            <Link to="/home">
                <button>Volver</button>
            </Link>
            <h1>CREA TU ACTIVIDAD TURISTICA</h1>


            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre: </label>
                    <input
                        value={input.name}
                        name="name"
                        type="text"
                        autoComplete="off"
                        onChange={handleChange}
                    />
                      {errors.name && (
                            <p >{errors.name}</p>
                        )}
                </div>

                <div>
                    <label>Dificultad: </label>
                    <input
                        value={input.dificultad}
                        name="dificultad"
                        type="number"
                        autoComplete="off"
                        min="1" max="5"
                        onChange={handleChange}
                    />
                     {errors.dificultad && (
                            <p >{errors.dificultad}</p>
                        )}
                </div>

                <div>
                    <label>Duracion: </label>
                    <input
                        value={input.duracion}
                        name="duracion"
                        type="number"
                        autoComplete="off"
                        min="1" max="12"
                        onChange={handleChange}
                    />
                     {errors.duracion && (
                            <p >{errors.duracion}</p>
                        )}
                </div>

                <div>
                    <b>Seleccionar una Temporada: </b>
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
                {input.temporada.length > 1 ? (
              <p c>Seleccione Máximo 1 Temporada</p>
            ) : null}
                </div>             

                <div>
                    <select onChange={e=> handleSelect(e)}>
                        {allCountry?.map(el=>{
                                return(                                 
                                        <option key={el.id}
                                        name={el.name}
                                        value={el.name}
                                                                              
                                        >{el.name} </option>
                                                                         
                                )})}
                    </select>
                    {errors.paises && (
                            <p >{errors.paises}</p>
                        )}
                </div>
                <label>Descripcion: </label><br/>
                <textarea 
                           value={input.descripcion}
                           name="descripcion"
                           type="text"
                           autoComplete="off"
                           onChange={handleChange}                                               
                />
                  {errors.descripcion && (
                            <p >{errors.descripcion}</p>
                        )}  
                <br/>
             
                <button 
                type="submit"
                disabled={disabled}
                >Crear</button>

            </form>
            {
            input.paises.map(el => 
                <div key={el}>
                    <p>{el}</p>                    
                    <button 
                    onClick={() => handleDelete(el)}
                    ><p>x</p></button>                     
                </div>
            )}

        </div>
        
        )        
}
