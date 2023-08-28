import * as actions from "../../redux/actions"
import { useState } from "react"
import { useDispatch } from "react-redux"
import style from "./Home.module.css"

const Filtros = (props) => {
    const dispatch = useDispatch()
    //Estados importados
    const {temperamentos} = props
    //Ciclo de vida de filtro origen
    const [selectedFilter, setSelectedFilter] = useState("All");
    const handleFilterOrigin = (evento) => {
        dispatch(actions.filterOrigen(evento.target.value))
        setSelectedFilter(evento.target.value);}
    // Ciclo de vida del filtro temperamento
    const [tempFilter, setTempFilter] = useState([])
    const handleFilterTemp = (evento) => {
        const selectedOption = evento.target.value;
        setTempFilter(prevTempFilter => [...prevTempFilter, selectedOption]);}
    const filtradoTemp = () => {
        dispatch(actions.filterTemp(tempFilter))}
    const clearTempFilter = () => {
        setTempFilter([]);
        dispatch(actions.filterTemp([]))};
    // Rendereizado
    return (
        <div className={style.divor}>
                    <div className= {style.tituloorder}>
                        <h5 className={style.texto}>Filters</h5>
                    </div>
                    <div className={style.filtros}>
                        <div className={style.filOrigen}>
                            <p className={style.textosecun} >Filter by data origin</p>
                            <select className={style.select} onChange={handleFilterOrigin} defaultValue={selectedFilter}>
                                <option value="All">All</option>                
                                <option value="DB">Created</option>
                                <option value="API">Imported</option>
                            </select>
                        </div>
                        <div className={style.filTemp}>
                            <div className={style.filTemp2}>
                            <p className={style.textosecun} >Filter by Temperament</p>
                            <select className={style.select} onChange={handleFilterTemp}>
                                {temperamentos.map((temp) => (
                                <option value={temp.temperament}> {temp.temperament} </option>))}
                            </select>
                            <button onClick={clearTempFilter} className={style.botones}>Clear</button>
                            <button onClick={filtradoTemp} className={style.botones}> Filtrar </button>
                            </div>
                            <div className={style.tempfil}>
                                {/* {tempFilter.length > 0 ? (<p className={style.textosecun}>Temperaments selected</p>): ("")} */}
                                {tempFilter.map((temp) => ( <h6 className={style.tempfiltemp}> {temp}</h6>))}
                            </div>
                        </div>

                    </div>
        </div>
    )
}; export default Filtros