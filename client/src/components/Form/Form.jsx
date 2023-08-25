import { useState } from "react"
import style from "./form.module.css"
import * as actions from "../../redux/actions"
import { useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"

const Form = (props) => {
    const [hRange, setHRange] = useState("")
    const [wRange, setWRange] = useState("")
    const [lRange, setLRange] = useState("")
    const [tempera, setTempera] = useState("")
    const [tempFilter, setTempFilter] = useState([])
    const [error, setError] = useState({})
    const [numc, setNum] = useState({})
    // Temperamentos 
    const {temperamentos} = props
    const handleFilterTemp = (evento) => {
        const selectedOption = evento.target.value;
        setTempFilter(prevTempFilter => [...prevTempFilter, selectedOption])}
    const clearTempFilter = () => {
        setTempFilter([]);}
    // Datos 
    const [datos, setDatos] = useState({
        name: "",
        height: "",
        weight: "",
        life_span: "",
        temperaments: "",
        image: "",
    })
    const numeros = (evento) => {
        setNum({
            ...numc,
            [evento.target.name]: evento.target.value
        })
    }
    const validate = (datos) => {
        const num = {...numc}
        const nameValidation = new RegExp(/^[a-zA-Z]+$/) //Solo letras
        const imageValidation = new RegExp(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/) //URL para imagen
        let error = {}
        if (!nameValidation.test(datos.name)) {
            error.name = "Error: The name must have only letters"}
        if(!imageValidation.test(datos.image)) {
            error.image = "Error: The image must be a valid URL"
        }
        if (datos.temperaments === "") {
            error.temperaments = "Error: You must choose at least one temperament"
        }
        if (num.hmin != num.hmax && num.hmin < num.hmax) {
            const decosh = toString(num.hmin) + "-" + toString(num.hmax)
            setHRange(decosh)}
        else error.height = "Error: The minimum height must be lower and different than the maximum height."
        if (num.wmin != num.wmax && num.wmin < num.wmax) {
            const decosw = toString(num.wmin) + "-" + toString(num.wmax)
            setWRange(decosw)}
        else error.weight =  "Error: The minimum weight must be lower and different than the maximum weight."
        if (num.lmin != num.lmax && num.lmin < num.lmax) {
            const decosl = toString(num.lmin) + "-" + toString(num.lmax)
            setLRange(decosl)}
        else error.life_span = "Error: The minimum years must be lower and different than the maximum years."
        return error}


    const handleChange = (evento) => {
        const text = tempFilter.join(",")
        setTempera(text)
        setDatos({
            ...datos,
            height: hRange,
            weight: wRange,
            life_span: lRange,
            temperaments: tempera,
            [evento.target.name]: evento.target.value,
        })
        setError(validate({...datos,
            height: hRange,
            weight: wRange,
            life_span: lRange,
            temperaments: tempera,
            [evento.target.name]:evento.target.value}))
    }

    const handleSubmit = (evento) => {
        evento.preventDefault()
        return actions.createDog(datos)
    }
    return (
        <>
        <form onSubmit={handleSubmit} >
            <div className={style.contenedor}>
                <NavLink to="/home">
                    <button>Back</button>
                </NavLink>
                <h1>Create a dog</h1>
                <label>Name</label>
                <input type="text" name="name" onChange={handleChange}/>
                <br/>
                {error.name ? (<span className={style.alerta}>{error.name}</span>):null}
                <label>Height</label> 
                <input type="number" name="hmin" min="0" onChange={numeros}/>
                <input type="number" name="hmax" min="0" onChange={numeros}/>
                <br/>
                {error.height ? (<span className={style.alerta}>{error.height}</span>):null}
                <label>Weight</label> 
                <input type="number" name="wmin" min="0" onChange={numeros}/>
                <input type="number" name="wmax" min="0" onChange={numeros}/>
                <br/>
                {error.weight ? (<span className={style.alerta}>{error.weight}</span>):null}
                <label>Image</label> 
                <input type="text" name="image" onChange={handleChange}/>
                <br/>
                {error.image ? (<span>{error.image}</span>):null}
                <label>Life years</label> 
                <input type="number" name="lmin" min="0" onChange={numeros}/>
                <input type="number" name="lmax" min="0" onChange={numeros}/>
                {error.life_span ? (<span className={style.alerta}>{error.life_span}</span>):null}
                <br/>
                <label>Tempermanets</label>
                <select className={style.select} onChange={handleFilterTemp}>
                    {temperamentos.map((temp) => (
                    <option value={temp.temperamento}> {temp.temperamento} </option>))}
                </select>
                <button onClick={clearTempFilter} className={style.botones}>Clear</button>
                {tempFilter.map((temp) => ( <h6 className={style.tempfiltemp}> {temp}</h6>))}
                {error.temperaments ? (<span className={style.alerta}>{error.temperaments}</span>):null}
                <br />
                <p>{tempera}</p>
                <input
                type="submit"
                value="Create Dog"
                disabled={
                    !datos.name ||
                    !datos.height ||
                    !datos.weight ||
                    !datos.temperaments ||
                    !datos.life_span ||
                    error.name ||
                    error.weight ||
                    error.height ||
                    error.temperaments ||
                    error.life_span ||
                    error.image
                } />
            </div>

        </form>
        </>
    )

}

export default Form