import axios from "axios";
import { 
    FILTER_BY_ACTIVITY, 
    FILTER_BY_CONTINENTE, 
    GET_ACTIVITY, 
    GET_ALL, 
    GET_BY_ID, 
    GET_BY_NAME,
    GET_BY_CONTINENTE,
    ORDER_BY_NAME, 
    ORDER_BY_POPULATION, 
    POST_FORM ,
    RESET_ID
} from "../actionTypes/actionTypes";

export function getAll(payload){
    return async(dispatch)=>{
        let json = await axios.get("http://localhost:3001/countries")
        return dispatch ({
            type: GET_ALL,
            payload: json.data
        })
    }
}

export function getActivity(payload){
    return async (dispatch)=>{
        let json = await axios.get("http://localhost:3001/Activity")
        console.log(json.data)
        return dispatch({
            type: GET_ACTIVITY,
            payload: json.data
        })
    }
}

export function getById(id){
    return async (dispatch)=>{
        let json = await axios.get(`http://localhost:3001/countries/`+id)
        return dispatch({
            type: GET_BY_ID,
            payload: json.data
        })
    }
}

export function getByName(name){
    return async (dispatch)=>{
        let json = await axios.get(`http://localhost:3001/countries?name=${name}`)
        return dispatch({
            type: GET_BY_NAME,
            payload: json.data
        })
    }
}

export function getByContinente (){
    return async (dispatch)=>{
        let json = await axios.get("http://localhost:3001/continente")
        return dispatch({
            type:GET_BY_CONTINENTE,
            payload: json.data
        })
    }
}

export function postActivity(payload){
    return async (dispatch)=>{
        let json = await axios.post("http://localhost:3001/activity", payload)
        return json
    }
}

export function filterByActivity(payload){
    return {
        type:FILTER_BY_ACTIVITY,
        payload
    }
}

export function filterByContinente(payload){
    return{
        type:FILTER_BY_CONTINENTE,
        payload
    }
}

export function orderByName(payload){
    return{
        type:ORDER_BY_NAME,
        payload
    }
}

export function orderByPopulation(payload){
    return{
        type:ORDER_BY_POPULATION,
        payload
    }
}

export function resetId(payload){
    return{
        type: RESET_ID,
        payload,
    }
}
