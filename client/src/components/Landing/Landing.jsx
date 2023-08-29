import style from "./landing.module.css"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom";
import { setApiDogs, setDBDogs, setIntermedia, setTemperamentos } from "../../redux/actions";

const Landing = (props) => {
    const {data} = props
    return (
        <div className={style.div}>
            <h1 className={style.titulo}> ¡Welcome to The Dogs App! &#128021;</h1>
            <NavLink to="/home">
                <button className= {style.boton} onClick={()=>data()}>Home &#9193;</button>
            </NavLink>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setApiDogs: () => dispatch(setApiDogs()),
        setDBDogs: () => dispatch(setDBDogs()),
        setTemperamentos: () => dispatch(setTemperamentos()),
        setIntermedia: ()=> dispatch(setIntermedia()), 
    }
}

export default connect(null, mapDispatchToProps)(Landing)