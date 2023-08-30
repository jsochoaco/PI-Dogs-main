import style from "./landing.module.css"
import { NavLink } from "react-router-dom";

const Landing = () => {
    //Renderizado
    return (
    <div className={style.div}>
        <h1 className={style.titulo}> ¡Welcome to The Dogs App! &#128021;</h1>
        <NavLink to="/home">
            <button className= {style.boton}>Home &#9193;</button>
        </NavLink>
    </div>)
};
export default Landing