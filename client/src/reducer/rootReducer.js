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
    POST_FORM,
    RESET_ID
} from "../actionTypes/actionTypes";
const initialState = {
    Country: [],
    CountryAux: [],
    continente: [],
    activity: [],
    paramsd: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL:
            return {
                ...state,
                Country: action.payload,
                CountryAux: action.payload
            };
        case GET_ACTIVITY:
            return {
                ...state,
                activity: action.payload
            };
        case GET_BY_NAME:
            return {
                ...state,
                Country: action.payload
            };
        case GET_BY_ID:
            return {
                ...state,
                paramsd: action.payload
            }
        case GET_BY_CONTINENTE:
            return {
                ...state,
                continente: action.payload
            }
            case POST_FORM:
                return{
                    ...state
                }
        case FILTER_BY_ACTIVITY:
            const all = state.CountryAux            
            const filtros = action.payload === "All" ? all : all.filter(e => e.Activities.map(el => el.name).toString() === action.payload)
              return {
                ...state,
                Country: filtros
            }
        case FILTER_BY_CONTINENTE:
            const allContinente = state.CountryAux;
            const filtro = action.payload === "All" ? allContinente : allContinente.filter(e => e.continente === action.payload)
            return {
                ...state,
                Country: filtro
            }
            case ORDER_BY_NAME:
                              
                const order = action.payload === "asc" ?    state.Country.sort((a, b)=>{
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                }): state.Country.sort((a, b)=>{
                    if (a.name > b.name) return -1;
                    if (a.name < b.name) return 1;
                    return 0;
                })
                return{
                    ...state,
                    Country: order
                }
                case ORDER_BY_POPULATION:
                    const order2 = action.payload === "asc" ?    state.Country.sort((a, b)=>{
                        if (a.poblacion > b.poblacion) return -1;
                        if (a.poblacion < b.poblacion) return 1;
                        return 0;                      
                    }): state.Country.sort((a, b)=>{
                        if (a.poblacion > b.poblacion) return 1;
                        if (a.poblacion < b.poblacion) return -1;
                        return 0;
                    })
                    return{
                        ...state,
                        Country: order2
                    }
                    case RESET_ID:
                        return{
                            ...state,
                            paramsd: []
                        }
                    
        default:
            return state
    }
}
export default rootReducer