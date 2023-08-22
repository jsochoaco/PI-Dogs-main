import CardDogs from "../CardDogs/CardDogs"
import * as actions from "../../redux/actions"
import { useState } from "react"
import { useDispatch } from "react-redux"
import style from "./Home.module.css"

const Home = (props) => {
    const dispatch = useDispatch()
    //Estados importados
    const {allDogs, temperamentos} = props
    //Ciclo de vida de filtro origen
    const [selectedFilter, setSelectedFilter] = useState("All");
    const handleFilterOrigin = (evento) => {
        dispatch(actions.filterOrigen(evento.target.value))
        setSelectedFilter(evento.target.value);}
    // Ciclo de vida del filtro temperamento
    const [tempFilter, setTempFilter] = useState([])
    const handleFilterTemp = (evento) => {
        const selectedOptions = evento.target.selectedOptions
        const temp = [];
        for (let i = 0; i < selectedOptions.length; i++) {
        temp.push(selectedOptions[i].value);}
        setTempFilter(temp)}
    const filtradoTemp = () => {
        dispatch(actions.filterTemp(tempFilter))}
    const clearTempFilter = () => {
        setTempFilter([]);
        dispatch(actions.filterTemp([]))};
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
            <div className={style.contenedor}>
                <div className={style.filtros}>
                    <h5>Filters</h5>
                    <div className={style.filOrigen}>
                        <p className={style.textosecun} >Filter by data origin</p>
                        <select onChange={handleFilterOrigin} defaultValue={selectedFilter}>
                            <option value="All">All</option>                
                            <option value="DB">Created</option>
                            <option value="API">Imported</option>
                        </select>
                    </div>
                    <div className={style.filTemp}>
                        <p className={style.textosecun} >Filter by Temperament</p>
                        <select onChange={handleFilterTemp} multiple>
                            {temperamentos.map((temp) => (
                            <option value={temp.temperamento}> {temp.temperamento} </option>))}
                        </select>
                        <button onClick={clearTempFilter}>Clear</button>
                        <div className={style.filTemp2}>
                            <p>{tempFilter}</p>
                            <button onClick={filtradoTemp}> Filtrar </button>
                    </div>
                    </div>

                </div>
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