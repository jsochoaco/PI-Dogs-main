import {FILTRO_ORIGEN, FILTRO_TEMP, SET_API_DOGS, SET_DB_DOGS, SET_INTERMEDIA, SET_DB_TEMP, SET_API_TEMPERAMENTOS, ORDEN_NAME, ORDEN_PESO } from "./action-types"

const initialState = {
    apiDogs: [],
    dbDogs: [],
    filterTemp: null,
    filterOrigen: null,
    allDogs: [],
    orderDogs: [],
    dbTemperamentos: [],
    apiTemperamentos: [],
    allTemperamentos: [],
    intermedia: []
}

export const reducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_API_DOGS:
            return {...state, apiDogs: action.payload, allDogs: [...state.allDogs, ...action.payload]}

        case SET_DB_DOGS: {
            return {...state, dbDogs: action.payload, allDogs: [...state.allDogs, ...action.payload]}}

        case SET_DB_TEMP: {
            return {...state, dbTemperamentos: action.payload, allTemperamentos: [...state.allTemperamentos, ...action.payload]}}

        case SET_API_TEMPERAMENTOS: {
            return {...state, apiTemperamentos: action.payload, allTemperamentos: [...state.allTemperamentos, ...action.payload]}}

        case SET_INTERMEDIA : {
            return {...state, intermedia: action.payload}}

        case FILTRO_ORIGEN: {
            if (action.payload === "All"){
                return {...state,allDogs: [...state.apiDogs,...state.dbDogs]}}
            else {const filtrado= state.apiDogs.concat(state.dbDogs)
                return {...state, allDogs: filtrado.filter((dog) => dog.origen === action.payload)}}}

        case FILTRO_TEMP: {
            const payloadact = action.payload
            if (payloadact.length < 1) {
                return {
                    ...state,
                    allDogs: [...state.apiDogs,...state.dbDogs]
                }
            }
            else if (payloadact.length >= 1) {
                let cumplen = []
                state.allDogs.forEach((dog) => {
                    if(dog.origen === "DB") {
                        const filtro = state.intermedia.filter((obj) => obj.dogId === dog.id)
                        const indexTemp = filtro.map((obj) => obj.temperamentId)
                        const buscar = (id) => {
                            const tempFind = state.temperamentos.find((temp)=> temp.id === id);
                            if (tempFind) return tempFind}
                        const dbtemp = indexTemp.map((id) => buscar(id))
                        if (dbtemp != undefined){
                            const contiene = payloadact.every((el) => dbtemp.includes(el))
                            if (contiene) {
                                cumplen.push(dog)}}
                    }
                    if (dog.origen === "API") {
                        const apitemp = dog.temperament
                        if (apitemp != undefined) {
                            const array = apitemp.split(',')
                            const text = array.map((word) => word.trim());
                            const contiene = payloadact.every((elem) => text.includes(elem))
                            if (contiene) cumplen.push(dog)}
                    }})
                if (cumplen.length < 0) {
                    return {...state, allDogs: []}
                }
                else {
                    return {...state, allDogs: cumplen}
                }
            }
        }
        case ORDEN_NAME: {
            const ordenar = state.allDogs
            if (action.payload === "UN") {
                return {...state, allDogs: [...state.allDogs]}
            }
            else {
                const sortDogs = ordenar.sort((a,b)=> {
                    if (action.payload === "A-Z") {
                        if(a.name < b.name) return -1
                        if (b.name < a.name) return 1
                        return 0
                    }
                    if (action.payload === "Z-A") {
                        if(a.name < b.name) return 1
                        if (b.name < a.name) return -1
                        return 0
                    }
                });
                return {...state, allDogs: sortDogs}
            }
        }
        case ORDEN_PESO: {
            const ordenar = state.allDogs
            ordenar.map((dog)=> {
                const minimo = dog.weight?.metric
                if (minimo[1] === " ") dog["min"] = parseInt(minimo[0])
                if (minimo[1] != " ") dog["min"] = parseInt(minimo[0]+minimo[1])
                const maximo = dog.weight?.metric
                if (maximo[maximo.length - 2] === " ") dog["max"] = parseInt(maximo[maximo.length-1])
                if (maximo[maximo.length - 2] != " ") dog["max"] = parseInt(maximo[maximo.length-2]+maximo[maximo.length-1])
            })
            if (action.payload === "UN") {
                return {...state, allDogs: [...state.allDogs]}   
            }
            else {
                const sortDogs = ordenar.sort((a, b) => {
                    if (action.payload === "MenorAMayor") {
                        return a.min - b.min;
                    } 
                    else if (action.payload === "MayorAMenor") {
                        return b.max - a.max;
                    } 
                    else {
                        return 0;
                    }
                
                })
                return {...state, allDogs: sortDogs}
            }
        }
        default:
            return {
                ...state
            }
    }
}