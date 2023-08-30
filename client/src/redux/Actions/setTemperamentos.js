import {SET_DB_TEMP} from "../action-types"
import axios from "axios"
export const temperamentos = () => {
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