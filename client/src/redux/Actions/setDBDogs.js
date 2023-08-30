import {SET_DB_DOGS} from "../action-types"
import axios from "axios"
export const dbDogs = () => {
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