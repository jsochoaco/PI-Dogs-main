import style from "./Card.module.css"


export default function Card (props) {
    const {id, name, image, weight, temperament, weightmax, weightmin, origen} = props
    return (
        <div className= {style.card}>
            <img className= {style.imagen} src={image} alt={name} />
            <h2 className= {style.nombre}> {name}</h2>
            <h4 className={style.info}>Weight: {weightmin}kg - {weightmax}kg</h4>
            <h4 className={style.info}>Temperaments: {temperament}</h4>
        </div>
     );
}



