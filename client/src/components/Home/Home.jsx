import CardDogs from "../CardDogs/CardDogs"
import * as actions from "../../redux/actions"
import { useDispatch } from "react-redux"
import style from "./Home.module.css"
import Filtros from "./Filtros"
import Ordenador from "./Ordenador"


const Home = (props) => {
    const dispatch = useDispatch()
    //Estados importados
    const {allDogs, temperamentos, intermedia} = props
    // Limpiador de filtros
    const clearFilters = () => {
        dispatch(actions.clearFilter())
      };
    // Rendereizado
    return (
        <div className={style.general}>
            <div className={style.contenedor}>
                <Filtros allDogs={allDogs} temperamentos= {temperamentos} />
                <Ordenador/>
            </div>
            <div className={style.divboton}>
                <button className={style.botonclean} onClick={clearFilters}> Clear filters and orders </button>
            </div>
            <CardDogs dogs = {allDogs} intermedia = {intermedia} temperamentos = {temperamentos} />
        </div>
    )
}; export default Home