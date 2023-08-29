import {FILTRO_ORIGEN, FILTRO_TEMP, SET_API_DOGS, SET_DB_DOGS, SET_INTERMEDIA, SET_DB_TEMP, CLEAR, ORDEN_NAME, ORDEN_PESO, CREATE_DOG, SEARCH_DOG} from "./action-types"
import axios from "axios"

export const setTemperamentos = () => {
    return async (dispatch) => {
        try {
            const endpoint = `http://localhost:3001/temperaments`;
            const response = await axios.get(endpoint);
            if (response.status === 200) {
                const endpoint2 = `http://localhost:3001/tempDB`;
                const response2 = await axios.get(endpoint2);
                
                if (response2.status === 200) {
                    const data2 = response2.data;
                    return dispatch({
                        type: SET_DB_TEMP,
                        payload: data2,
                    });
                }
            }
        } catch (error) {
            return { error: error.message };
            // Status 500: Indica un error interno en el servidor
        }
    };
};
// Pendiente
export const setIntermedia = ()=> {
    try {
        const endpoint = 'http://localhost:3001/inter'
        return async (dispatch)=> {
            const response = await axios.get(endpoint)
            const inter = response.data
                  return dispatch({
                      type: SET_INTERMEDIA,
                      payload: inter,
                   });
        }
    } 
    catch (error) {
        return {error: error.message}
        // Status 500: Indica un error interno en el servidor 
    }
}
//Está bien
export const setApiDogs = () => {
    try {
        const endpoint = 'http://localhost:3001/dogs';
        return async (dispatch) => {
           const response = await axios.get(endpoint)
           const data = response.data
           data.map ((dog)=> {
            dog["origen"] = "API"
           })
              return dispatch({
                  type: SET_API_DOGS,
                  payload: data,
               });
            };
    }
    catch (error) { 
        return {error: error.message}
        // Status 500: Indica un error interno en el servidor
    }
}
//Está bien
export const setDBDogs = () => {
    try {
        const endpoint = 'http://localhost:3001/dogDB'
        return async (dispatch)=> {
            const response = await axios.get(endpoint)
            const data = response.data
            data.map ((dog)=> {
                dog["origen"] = "DB"
               })
                  return dispatch({
                      type: SET_DB_DOGS,
                      payload: data,
                   });
        }        
    } 
    catch (error) {
        return {error: error.message}
        // Status 500: Indica un error interno en el servidor
    }
}
//Está bien
export const filterOrigen= (origen) => {
    return {
        type: FILTRO_ORIGEN,
        payload: origen
    }
}
// Está bien
export const filterTemp = (temperamentos) => {
    return {
        type: FILTRO_TEMP,
        payload: temperamentos
    }
}
// Está bien
export const ordenName = (orden) => {
    return {
        type: ORDEN_NAME,
        payload: orden
    }
}
// Está bien
export const ordenPeso = (orden) => {
    return {
        type: ORDEN_PESO,
        payload: orden
    }
}

//Está bien
export const clearFilter = () => {
    return {
        type: CLEAR
    }
}


//Está bien
export const createDog = (dog) => {
    try {
        const endpoint = 'http://localhost:3001/dogs'
        return async (dispatch)=> {
            const response = await axios.post(endpoint, dog)
            if (response.data !== "El perro ya existe") {
                const data = response.data
                const dog = data[0]
                dispatch({
                    type: CREATE_DOG,
                    payload: dog});
            }        
        }
    } 
    catch (error) {
        return {error: error.message}
        // Status 500: Indica un error interno en el servidor 
    }
}
//Está bien
export const searchDog = (name) => {
    return async (dispatch) => {
        try {
            if (name !== undefined && name !== null) {
                const endpoint = `http://localhost:3001/dog/?name=${name}`;
                const response = await axios.get(endpoint);
                if (response.data.length > 0) {
                    const data = response.data;
                    return dispatch({
                        type: SEARCH_DOG,
                        payload: data
                    });
                }
            }
        } catch (error) {
            return {error: error.message}
            // Status 500: Indica un error interno en el servidor 
        }
    };
};