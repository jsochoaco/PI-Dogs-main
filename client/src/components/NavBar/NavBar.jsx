import Menu from "../Menu/Menu"
import * as actions from "../../redux/actions"
import { useDispatch } from "react-redux" 
import { useState, useEffect } from "react"
import style from "./NavBar.module.css"
import { NavLink, useLocation } from "react-router-dom"



export const NavBar = () => {
    const {pathname} = useLocation()
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const handleChange = (evento) => {
        setName(evento.target.value)
    }
    const handleSearch = () => {
        dispatch(actions.searchDog(name))
    }
    const handleClear = () => {
        setName("")
        dispatch(actions.clearFilter())
    }
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
                    <button className={style.boton} onClick={()=> dispatch(actions.searchDog(name))}>Search</button>
                    <button className={style.boton} onClick={()=> handleClear()}>Clean</button>
                </div>
                )}
            <div className={style.menu}>
                <Menu/>
            </div>
        </div>
    )
}