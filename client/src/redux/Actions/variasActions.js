import {FILTRO_ORIGEN, FILTRO_TEMP, ORDEN_NAME, ORDEN_PESO, CLEAR} from "../action-types"
export const filterOri= (origen) => {
    return {
        type: FILTRO_ORIGEN,
        payload: origen
    }
}
export const filterTem = (temperamentos) => {
    return {
        type: FILTRO_TEMP,
        payload: temperamentos
    }
}
export const ordenN = (orden) => {
    return {
        type: ORDEN_NAME,
        payload: orden
    }
}
export const ordenP = (orden) => {
    return {
        type: ORDEN_PESO,
        payload: orden
    }
}
export const clearF = () => {
    return {
        type: CLEAR
    }
}