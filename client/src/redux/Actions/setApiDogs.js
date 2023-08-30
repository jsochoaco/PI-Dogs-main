import {SET_API_DOGS} from "../action-types"
import axios from "axios"
export const apiDogs = () => {
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