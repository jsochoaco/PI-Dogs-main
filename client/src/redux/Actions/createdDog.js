import {CREATE_DOG, CREADO} from "../action-types"
import axios from "axios"
export const create = (dog) => {
    try {
        const endpoint = 'http://localhost:3001/dogs'
        return async (dispatch)=> {
            const response = await axios.post(endpoint, dog)
            const mensaje = response.data.existe
            if (mensaje === true) {
                const data = response.data
                dispatch({
                    type: CREATE_DOG,
                    payload: data});
            }
            else if (mensaje === false) {
                dispatch({
                    type: CREADO,
                    payload: mensaje
                })
            }       
        }
    } 
    catch (error) {
        return {error: error.message}
        // Status 500: Indica un error interno en el servidor 
    }
}