import CardDogs from "../CardDogs/CardDogs"
import * as actions from "../../redux/actions"
import { useState } from "react"
import { useDispatch } from "react-redux"

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
    // Rendereizado
    return (
        <div>
            <div>
                <h2> Filters </h2>
                <select onChange={handleFilterOrigin} defaultValue={selectedFilter}>
                    <option value="All">All</option>                
                    <option value="DB">Created</option>
                    <option value="API">Imported</option>
                </select>
                <select onChange={handleFilterTemp} multiple>
                {temperamentos.map((temp) => (
                <option value={temp.temperamento}> {temp.temperamento} </option>))}
                </select>
                <button onClick={clearTempFilter}>Clear</button>
                <p>{tempFilter}</p>
                <button onClick={filtradoTemp}> Filtrar </button>
                <select onChange={handleOrderName} defaultValue={ordenName}>
                    <option value="UN">Unsorted</option>
                    <option value="A-Z">A-Z order</option>
                    <option value="Z-A">Z-A order</option>
                </select>
                <select onChange={handleOrdenPeso} defaultValue={ordenPeso}>
                    <option value="UN">Unsorted</option>
                    <option value="MenorAMayor"> Min to max order</option>
                    <option value="MayorAMenor">Max to min order</option>
                </select>
            </div>
            <CardDogs dogs = {allDogs} />
        </div>
    )
}; export default Home