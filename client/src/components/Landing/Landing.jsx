import style from "./landing.module.css"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom";
import { setApiDogs, setDBDogs } from "../../redux/actions";

const Landing = (props) => {
    const api = ()=> {
        props.setApiDogs()
        props.setDBDogs()
    }
    return (
        <div>
            <h1>Welcome to the Dogs App</h1>
            <NavLink to="/home">
                <button onClick={api}>Home</button>
            </NavLink>
        </div>
    )
}



const mapDispatchToProps = (dispatch) => {
    return {
        setApiDogs: () => dispatch(setApiDogs()),
        setDBDogs: () => dispatch(setDBDogs())
    }
}

export default connect(null, mapDispatchToProps)(Landing)