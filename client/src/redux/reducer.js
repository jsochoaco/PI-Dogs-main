import {FILTRO_ORIGEN, FILTRO_TEMP, SET_API_DOGS, SET_DB_DOGS, SET_INTERMEDIA, CLEAR, SET_DB_TEMP, SET_API_TEMPERAMENTOS, ORDEN_NAME, ORDEN_PESO, CREATE_DOG, SEARCH_DOG} from "./action-types"

const initialState = {
    completDogs: [],
    apiDogs: [],
    dbDogs: [],
    // filterTemp: null,
    filterOrigen: null,
    allDogs: [],
    // orderDogs: [],
    dbTemperamentos: [],
    apiTemperamentos: [],
    allTemperamentos: [],
    intermedia: []
}

export const reducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_API_DOGS:
            return {...state, apiDogs: action.payload, allDogs: [...state.allDogs, ...action.payload], completDogs: [...state.allDogs, ...action.payload] }

        case SET_DB_DOGS: {
            return {...state, dbDogs: action.payload, allDogs: [...state.allDogs, ...action.payload], completDogs: [...state.completDogs, ...action.payload]}}

        // case CREATE_DOG: {
        //     return {...state, dbDogs: [...state.dbDogs, ...action.payload], allDogs: [...state.allDogs, ...action.payload]}}
        
        case SET_DB_TEMP: {
            return {
                ...state,
                dbTemperamentos: action.payload,
                allTemperamentos: [...state.allTemperamentos, ...action.payload]};
        }
        case SET_INTERMEDIA : {
            return {...state, intermedia: action.payload}}

        case CLEAR: {
            return {...state, allDogs: [...state.dbDogs,...state.apiDogs]}
        }
        case SEARCH_DOG: {
            if (action.payload && action.payload.length > 0) {
                return { ...state, allDogs: [...action.payload] };
        }}

        case FILTRO_ORIGEN: {
            const filterOrigen = action.payload === "All" ? 
            state.completDogs : state.completDogs.filter((dog) => dog.origen === action.payload)
            return {...state, allDogs: filterOrigen, filterOrigen: action.payload}}

        case FILTRO_TEMP: {
            const payloadact = action.payload
            if (payloadact.length < 1) {
                return {
                    ...state,
                    allDogs: [...state.completDogs]
                }
            }
            else if (payloadact.length >= 1) {
                let cumplen = []
                state.allDogs.forEach((dog) => {
                    if(dog.origen === "DB") {
                        const filtro = state.intermedia.filter((obj) => obj.dogId === dog.id);
                        const indexTemp = filtro.map((obj) => obj.temperamentId);
                        let db = []
                        for (let i =0; i < indexTemp.length; i++) {
                            const temp = state.allTemperamentos[indexTemp[i]]
                            const tem = temp.temperament
                            db.push(tem)
                        }
                        if (db !== undefined){
                            const contiene = payloadact.every((el) => db.includes(el))
                            if (contiene) {
                                cumplen.push(dog)}}
                        // const filtro = state.intermedia.filter((obj) => obj.dogId === dog.id)
                        // const indexTemp = filtro.map((obj) => obj.temperamentId)
                        // const buscar = (id) => {
                        //     const tempFind = state.allTemperamentos.find((temp)=> temp.id === id);
                        //     if (tempFind) return tempFind}
                        // const dbtemp = indexTemp.map((id) => buscar(id))
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
            const ordenar = state.filterOrigen === "All" ? 
            [...state.completDogs] : [...state.allDogs]
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
            const ordenar = state.allDogs.map((dog) => {
                if (dog.origen === "API") {
                    const weightMetric = dog.weight?.metric;
                    const minimo = parseInt(weightMetric.split(" ")[0]);
                    const maximo = parseInt(weightMetric.split(" ")[2]);
                    return {
                        ...dog, 
                        min: minimo,
                        max: maximo,
                    };
                }
                if (dog.origen === "DB") {
                    const weightMetric = dog.weight;
                    const minimo = parseInt(weightMetric.split("-")[0]);
                    const maximo = parseInt(weightMetric.split("-")[1]);
                    return {
                        ...dog, 
                        min: minimo,
                        max: maximo,
                    };
                }
            });
        
            if (action.payload === "UN") {
                return { ...state, allDogs: state.allDogs };
            } else {
                const sortDogs = ordenar.sort((a, b) => {
                    if (action.payload === "MenorAMayor") {
                        return a.min - b.min;
                    } else if (action.payload === "MayorAMenor") {
                        return b.max - a.max;
                    } else {
                        return 0;
                    }
                });
                return { ...state, allDogs: sortDogs };
            }
        }
        default:
            return {
                ...state
            }
    }
}