import {FILTRO_ORIGEN, SET_API_DOGS, SET_DB_DOGS} from "./action-types"
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
