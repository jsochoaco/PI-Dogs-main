import {FILTRO_ORIGEN, FILTRO_TEMP, SET_API_DOGS, SET_DB_DOGS, SET_INTERMEDIA, SET_TEMPERAMENTOS} from "./action-types"
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
            const temp = response.data
                  return dispatch({
                      type: SET_TEMPERAMENTOS,
                      payload: temp,
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
