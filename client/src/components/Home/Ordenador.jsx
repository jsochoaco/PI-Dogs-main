import CardDogs from "../CardDogs/CardDogs"
import * as actions from "../../redux/actions"
import { useState } from "react"
import { useDispatch } from "react-redux"
import style from "./Home.module.css"


const Ordenador = (props) => {
    const dispatch = useDispatch()
    // Ciclo de vida del orden por nombre
    const [ordenName, setOrdenName] = useState("UN")
    const handleOrderName = (evento) => {
        dispatch(actions.ordenName(evento.target.value))
        setOrdenName(evento.target.value)
    }
    // Ciclo de vida del orden por peso
    const [ordenPeso, setOrdenPeso] = useState("UN")
    const handleOrdenPeso = (evento) => {
        dispatch(actions.ordenPeso(evento.target.value))
        setOrdenPeso(evento.target.value)
    }
    // Rendereizado
    return (
        <div className={style.divor}>
                    <div className= {style.tituloorder}>
                        <h5 className={style.texto}>Orders</h5>
                    </div>
                    <div className={style.ordenadores}>
                        <div className={style.orName}>
                            <p className={style.textosecun}>Order by name</p>
                            <select className={style.select} onChange={handleOrderName} defaultValue={ordenName}>
                                <option value="UN">Unsorted</option>
                                <option value="A-Z">A-Z order</option>
                                <option value="Z-A">Z-A order</option>
                            </select>
                        </div>
                        <div className={style.orPeso}>
                            <p className={style.textosecun}>Order by weight</p>
                            <select className={style.select} onChange={handleOrdenPeso} defaultValue={ordenPeso}>
                                <option value="UN">Unsorted</option>
                                <option value="MenorAMayor"> Min to max order</option>
                                <option value="MayorAMenor">Max to min order</option>
                            </select>
                        </div>
                    </div>
        </div>
    )
}; export default Ordenador