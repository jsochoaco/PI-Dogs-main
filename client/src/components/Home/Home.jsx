import CardDogs from "../CardDogs/CardDogs"
import * as actions from "../../redux/actions"
import { useDispatch } from "react-redux"
import style from "./Home.module.css"
import Filtros from "./Filtros"
import Ordenador from "./Ordenador"
import { useState, useEffect } from "react"


const Home = (props) => {
    const dispatch = useDispatch()
    //Estados importados
    const {allDogs, temperamentos, intermedia, data} = props
    const refresh = () => {
        data();
      };
    const [len, setLen] = useState(0); const [len2, setLen2] = useState(0);
    // Actualizar len y len2 con las longitudes actuales
    useEffect(() => { setLen(allDogs.length); setLen2(temperamentos.length);}, [allDogs.length, temperamentos.length]);
    // Verificar len y len2 después de 3 segundos
    useEffect(() => {const timeoutId = setTimeout(() => {if (len === 0 && len2 === 0) {refresh();}}, 2000);return () => {clearTimeout(timeoutId);};}, [len, len2, refresh]);
    // Limpiador de filtros
    const clearFilters = () => {
        dispatch(actions.clearFilter())
      };
    // Paginado (
    const [pagina, setPagina] = useState(1)
    const porPagina = 8
    const ultimoElemento = pagina*porPagina
    const primerElemento = ultimoElemento - porPagina
    const actualDogs = allDogs.slice(primerElemento, ultimoElemento)
    const totalPages = Math.ceil(allDogs.length / porPagina);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    // Rendereizado
    return (
        <div className={style.general}>
            <div className={style.contenedor}>
                <Filtros temperamentos= {temperamentos} />
                <Ordenador/>
            </div>
            <div className={style.divboton}>
                <button className={style.botonclean} onClick={clearFilters}> Clear filters and orders </button>
                {/* <button className={style.botones} onClick={data}> Refresh data </button> */}
            </div>
            <div className={style.paginado}>
                <button className= {style.botonpag} onClick={() => setPagina(pagina - 1)} disabled={pagina === 1}> Previous</button>
                {pageNumbers.map((pageNumber) => (
                    <button key={pageNumber} className={pageNumber === pagina ? style.pagina : style.paginaboton} onClick={() => setPagina(pageNumber)}>{pageNumber}</button>
                ))}
                <button className= {style.botonpag} onClick={() => setPagina(pagina + 1)} disabled={ultimoElemento >= allDogs.length}>Next</button>
            </div>
            {actualDogs.length === 0 ? (<div className={style.loaddiv}> <div className={style.loader}></div><h1 className={style.h1}>Loading &#8986;</h1></div>): (<CardDogs dogs = {actualDogs} intermedia = {intermedia} temperamentos = {temperamentos} />)}
            <div className={style.paginado2}>
                <button className= {style.botonpag} onClick={() => setPagina(pagina - 1)} disabled={pagina === 1}> Previous</button>
                {pageNumbers.map((pageNumber) => (
                    <button key={pageNumber} className={pageNumber === pagina ? style.pagina : style.paginaboton} onClick={() => setPagina(pageNumber)}>{pageNumber}</button>
                ))}
                <button className= {style.botonpag} onClick={() => setPagina(pagina + 1)} disabled={ultimoElemento >= allDogs.length}>Next</button>
            </div>
        </div>
    )
}; export default Home