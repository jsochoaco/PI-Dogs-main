import style from "./landing.module.css"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom";
import { setApiDogs, setDBDogs, setIntermedia, setTemperamentos, setTempAPI } from "../../redux/actions";

const Landing = (props) => {
    const data = ()=> {
        props.setTempAPI()
        props.setApiDogs()
        props.setDBDogs()
        props.setTemperamentos()
        props.setIntermedia()
    }
    return (
        <div>
            <h1>Welcome to the Dogs App</h1>
            <NavLink to="/home">
                <button onClick={data}>Home</button>
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
        setTempAPI: () => dispatch(setTempAPI())  
    }
}

export default connect(null, mapDispatchToProps)(Landing)