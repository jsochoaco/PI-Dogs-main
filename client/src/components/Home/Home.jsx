import CardDogs from "../CardDogs/CardDogs"
import * as actions from "../../redux/actions"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import style from "./Home.module.css"
import Filtros from "./Filtros"
import { NavBar } from "../NavBar/NavBar"

const Home = (props) => {
    const dispatch = useDispatch()
    //Estados importados
    const {allDogs, temperamentos} = props
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
    // Limpiador de filtros
    const clearFilters = () => {
        setSelectedFilter("All");
        setTempFilter([]);
        setOrdenName("UN");
        setOrdenPeso("UN");
        dispatch(actions.clearFilter())
      };
    // Rendereizado
    return (
        <div className={style.general}>
            <NavBar/>
            <div className={style.contenedor}>
                <Filtros allDogs={allDogs} temperamentos= {temperamentos} />
                <div className={style.divor}>
                    <div className= {style.tituloorder}>
                        <h5 className={style.texto}>Orders</h5>
                    </div>
                    <div className={style.ordenadores}>
                        <div className={style.orName}>
                            <p className={style.textosecun}>Order by name</p>
                            <select className={style.select} onChange={handleOrderName} defaultValue={ordenName}>
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
            </div>
            <div>
                <button onClick={clearFilters}> Clear filters </button>
            </div>
            <CardDogs dogs = {allDogs} />
        </div>
    )
}; export default Home