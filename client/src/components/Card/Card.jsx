import style from "./Card.module.css"
import { Link } from "react-router-dom";


export default function Card (props) {
    const {id, name, image, temperament, weightmax, weightmin} = props
    return (
        <div className= {style.card}>
            <img className= {style.imagen} src={image} alt={name} />
            <Link to={`/details/${id}`}>
                <h2 className= {style.nombre}> {name}</h2>
            </Link>
            <h4 className={style.info}>Weight: {weightmin}kg - {weightmax}kg</h4>
            <h4 className={style.info}>Temperaments: {temperament}</h4>
        </div>
     );
}



