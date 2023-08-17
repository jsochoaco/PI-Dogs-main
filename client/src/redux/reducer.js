import {FILTRO_ORIGEN, FILTRO_TEMP, LOADING, ORDEN_NAME, ORDEN_PESO, SET_API_DOGS, SET_DB_DOGS} from "./action-types"

const initialState = {
    apiDogs: [],
    dbDogs: [],
    filterTemp: null,
    filterOrigen: null,
    allDogs: [],
    orderDogs: [],
}

export const reducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_API_DOGS:
            return {
                ...state,
                apiDogs: action.payload,
                allDogs: [...state.allDogs, ...action.payload]
            }
        case SET_DB_DOGS: {
            return {
                ...state, 
                dbDogs: action.payload,
                allDogs: [...state.allDogs, ...action.payload]
            }
        }
        case FILTRO_ORIGEN: {
            if (action.payload === "All"){
                return {
                    ...state,
                    allDogs: state.apiDogs.concat(state.dbDogs)
                }
            }
            else {
                const filter= state.apiDogs.concat(state.dbDogs)
                return {
                    ...state, 
                    allDogs: filter.filter((dog) => dog.origen === action.payload)
                }
            }
            }
        default:
            return {
                ...state
            }
    }
}