import style from "./Temperaments.module.css"


const Temperaments = (props) => {
    const { temperamentos} = props

    return (
        <div className={style.contenedor}>
            <div className={style.titulo}>
                <h2>Temperaments</h2>
            </div>
            <div className= {style.temperamentos}>
            {temperamentos.map((temp) => (
            <h4 className= {style.temp}> {temp.temperamento} </h4>))}
            </div>
        </div>
    )
}


export default Temperaments