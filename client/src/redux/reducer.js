import {FILTRO_ORIGEN, FILTRO_TEMP, LOADING, ORDEN_NAME, ORDEN_PESO, SET_API_DOGS, SET_DB_DOGS, SET_TEMPERAMENTOS, SET_INTERMEDIA} from "./action-types"

const initialState = {
    apiDogs: [],
    dbDogs: [],
    filterTemp: null,
    filterOrigen: null,
    allDogs: [],
    orderDogs: [],
    temperamentos: [],
    intermedia: []
}

export const reducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_API_DOGS:
            return {...state, apiDogs: action.payload, allDogs: [...state.allDogs, ...action.payload]}

        case SET_DB_DOGS: {
            return {...state, dbDogs: action.payload, allDogs: [...state.allDogs, ...action.payload]}}

        case SET_TEMPERAMENTOS: {
            return {...state,temperamentos: action.payload}}

        case SET_INTERMEDIA : {
            return {...state, intermedia: action.payload}}

        case FILTRO_ORIGEN: {
            if (action.payload === "All"){
                return {...state,allDogs: [...state.apiDogs,...state.dbDogs]}}
            else {const filtrado= state.apiDogs.concat(state.dbDogs)
                return {...state, allDogs: filtrado.filter((dog) => dog.origen === action.payload)}}}

        case FILTRO_TEMP: {const temperamento = action.payload
            let cumplen = []
            allDogs.forEach((dog) => {
                if(dog.origen === "DB") {
                   const filtro = state.intermedia.filter((obj) => obj.dogId === dog.id)
                   const indexTemp = filtro.map((obj) => obj.temperamento)
                   const buscar = (id) => {
                    const tempFind = state.temperamentos.find(temp => temp.id === id);
                    if (tempFind) {return tempFind}}
                    const dbtemp = indexTemp.map((id) => buscar(id))
                    const contiene = temperamento.every((el) => dbtemp.includes(el))
                    if (contiene) {
                        cumplen.push(dog)}}
                if (dog.origen === "API") {
                    const apitemp = dog.temperament.split(',').map((word) => (word.trim()));
                    const contiene = temperamento.every((el) => apitemp.includes(el))
                    if (contiene) {
                        cumplen.push(dog)}}});}
        default:
            return {
                ...state
            }
    }
}