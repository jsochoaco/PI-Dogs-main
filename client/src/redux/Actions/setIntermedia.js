import {SET_INTERMEDIA} from "../action-types"
import axios from "axios"
export const intermedia = ()=> {
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