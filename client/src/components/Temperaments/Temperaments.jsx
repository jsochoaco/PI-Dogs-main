import style from "./Temperaments.module.css"


const Temperaments = (props) => {
    const { temperamentos} = props

    return (
        <div className={style.contenedor}>
            <div className={style.titulo}>
                <h2>&#128545; &#129322; Temperaments &#128519; &#128564;</h2>
            </div>
            <div className= {style.temperamentos}>
            {temperamentos.map((temp) => (
            <h4 className= {style.temp}> {temp.temperament} </h4>))}
            </div>
        </div>
    )
}


export default Temperaments