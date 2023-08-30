import Menu from "../Menu/Menu"
import * as actions from "../../redux/actions"
import { useDispatch } from "react-redux" 
import { useState, useEffect } from "react"
import style from "./NavBar.module.css"
import { NavLink, useLocation } from "react-router-dom"

const NavBar = () => {
    //Use location para cambiar Nav según la ubicación
    const {pathname} = useLocation()
    const dispatch = useDispatch()
    //Estados
    const [name, setName] = useState("")
    // Funciones
    const handleChange = (evento) => {
        setName(evento.target.value)}
    const handleSearch = () => {
        dispatch(actions.searchDog(name))}
    const handleClear = () => {
        setName("")
        dispatch(actions.clearFilter())}
    //Renderizado
    return (
        <div className={style.contenedor}>
            {pathname != "/home" && (
            <div>
                <NavLink to= "/home">
                    <button className={style.botonback}> &#8678; </button>
                </NavLink>
            </div>
            )}
            <div className={style.titulo}>
                <NavLink to= "/home">
                    <h1>The Dogs App &#128021;</h1>
                </NavLink>
            </div>
                { pathname === "/home" &&  (
                <div className={style.buscador}>
                    <input className={style.input} placeholder="Enter dog name" type='text' value={name} onChange={handleChange}/>
                    <button className={style.boton} onClick={()=> handleSearch()}>Search</button>
                    <button className={style.botonclean} onClick={()=> handleClear()}>Clean</button>
                </div>
                )}
            <div className={style.menu}>
                <Menu/>
            </div>
        </div>)
};
export default NavBar