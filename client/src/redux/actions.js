import {FILTRO_ORIGEN, FILTRO_TEMP, SET_API_DOGS, SET_DB_DOGS, SET_INTERMEDIA, SET_DB_TEMP, SET_API_TEMPERAMENTOS, ORDEN_NAME, ORDEN_PESO} from "./action-types"
import axios from "axios"

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
        return res.status(500).json({error: error.message})
        // Status 500: Indica un error interno en el servidor
    }
}
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
        return res.status(500).json({error: error.message})
        // Status 500: Indica un error interno en el servidor
    }
}
export const filterOrigen= (origen) => {
    return {
        type: FILTRO_ORIGEN,
        payload: origen
    }
}
export const setTemperamentos = () => {
    try {
        const endpoint = 'http://localhost:3001/tempDB'
        return async (dispatch)=> {
            const response = await axios.get(endpoint)
            const data = response.data
                  return dispatch({
                      type: SET_DB_TEMP,
                      payload: data,
                   });
        }        

    } 
    catch (error) {
        return res.status(500).json({error: error.message})
        // Status 500: Indica un error interno en el servidor 
    }
}

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
        return res.status(500).json({error: error.message})
        // Status 500: Indica un error interno en el servidor 
    }
}


export const filterTemp = (temperamentos) => {
    return {
        type: FILTRO_TEMP,
        payload: temperamentos
    }
}

export const setTempAPI = () => {
    try {
        const endpoint = 'http://localhost:3001/temperaments'
        return async (dispatch)=> {
            const response = await axios.get(endpoint)
            const data = response.data
                  return dispatch({
                      type: SET_API_TEMPERAMENTOS,
                      payload: data,
                   });
        }        
    } 
    catch (error) {
        return res.status(500).json({error: error.message})
        // Status 500: Indica un error interno en el servidor 
    }
}

export const ordenName = (orden) => {
    return {
        type: ORDEN_NAME,
        payload: orden
    }
}

export const ordenPeso = (orden) => {
    return {
        type: ORDEN_PESO,
        payload: orden
    }
}