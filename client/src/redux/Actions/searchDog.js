import {SEARCH_DOG} from "../action-types"
import axios from "axios"
export const search = (name) => {
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