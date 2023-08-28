import { useState } from "react"
import style from "./form.module.css"
import * as actions from "../../redux/actions"
import { useDispatch } from "react-redux"

const Form = (props) => {
    const dispatch = useDispatch()
    //Error
    const [error, setError] = useState({})
    // Temperamentos 
    const [tempFilter, setTempFilter] = useState([])
    const {temperamentos} = props
    const handleFilterTemp = (evento) => {
        const selectedOption = evento.target.value;
        setTempFilter(prevTempFilter => [...prevTempFilter, selectedOption])}
    const clearTempFilter = () => {
        setTempFilter([]);}
    // Datos
    const [datos, setDatos] = useState({name: "", height: "", weight: "", life_span: "", temperaments: [] ,image: "",})
    // Info a enviar
    const [envio, setEnvio] = useState({name: "", height: "", weight: "", life_span: "", temperaments: "" ,image: "",})
    //Función validadora
    const validate = (datos) => {
        const nameValidation = new RegExp(/^[a-zA-Z]+$/) //Solo letras
        const imageValidation = new RegExp(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/) //URL para imagen
        let error = {}
        if (datos.name) {
            if (!nameValidation.test(datos.name)) error.name = "Must have only letters"}
        if (datos.image) {
            if(!imageValidation.test(datos.image)) error.image = "Must be a valid URL"}
        if (datos.temperaments.length === 0) error.temperaments = "You must choose at least one temperament"
        if (datos.new) {
            if (!nameValidation.test(datos.new)) error.new = "Must have only letters";tempFilter.push(datos.new)}
        if (datos.hmin && datos.hmax) {
            if (datos.hmin === datos.hmax || datos.hmin > datos.hmax) error.height = "The minimum must be lower and different than the maximum"}
        if (datos.wmin && datos.wmax) {
            if (datos.wmin === datos.wmax || datos.wmin > datos.wmax) error.weight =  "The minimum must be lower and different than the maximum"}
        if (datos.lmin && datos.lmax ) {
            if (datos.lmin === datos.lmax || datos.lmin > datos.lmax) error.life_span = "The minimum must be lower and different than the maximum"}
        return error}
    //Función para el cambio en los inputs
    const handleChange = (evento) => {
        const temp = tempFilter
        setDatos({...datos,
            temperaments: temp,
            [evento.target.name]: evento.target.value

        })
        setError(validate({...datos,
            [evento.target.name]: evento.target.value
        }))
        setEnvio({...envio,
            name: datos.name,
            height: toString(datos.hmin) + "-" + toString(datos.hmax),
            weight: toString(datos.wmin) + "-" + toString(datos.wmax),
            life_span: toString(datos.lmin) + "-" + toString(datos.lmax),
            temperamento: tempFilter.join(""),
            image: datos.image,
        })
    }
    //Función de envío de info
    const handleSubmit = (evento) =>  {
        evento.preventDefault()
        return dispatch(actions.createDog(envio))}
    //Renderizado
    return (
        <>
        <form onSubmit={handleSubmit} >
            <div className={style.contenedor}>
                <h1 className={style.ppal}>&#127381; Create a new dog &#128054;</h1>
                <div className={style.divdato}>
                    <label className={style.dato}>Name</label>
                    <input className={style.inputtext}  type="text" name="name" placeholder="Dog name" onChange={handleChange} required/>
                    <br/>
                    {error.name ? ( <div className={style.divdato}> <p className={style.simbolo}>!</p> <span className={style.textohover}>{error.name}</span>
                    </div> ):(null)}
                </div>
                <div className={style.divdato}>                 
                    <label className={style.dato}>Height</label>
                    <h6 className={style.datosec}>Min.</h6>
                    <input className={style.inputnum} type="number" name="hmin" min="0" placeholder="In centimeters" onChange={handleChange}  required/>
                    <h6 className={style.datosec}>Max.</h6>
                    <input className={style.inputnum} type="number" name="hmax" min="0" placeholder="In centimeters" onChange={handleChange} required/>
                    <br/>
                    {error.height ? (
                    <div className={style.divdato2}>
                        <p className={style.simbolo}>!</p>
                        <span className={style.textohover}>{error.height}</span>
                    </div> ):(null)}
                </div>
                <div className={style.divdato}>
                    <label className={style.dato}>Weight</label>
                    <h6 className={style.datosec}>Min.</h6> 
                    <input className={style.inputnum} type="number" name="wmin" min="0" placeholder="In kilograms" onChange={handleChange} required/>
                    <h6 className={style.datosec}>Max.</h6> 
                    <input className={style.inputnum} type="number" name="wmax" min="0" placeholder="In kilograms" onChange={handleChange} required/>
                    <br/>
                    {error.weight ? ( <div className={style.divdato}> <p className={style.simbolo}>!</p> <span className={style.textohover}>{error.weight}</span>
                    </div> ):(null)}
                </div>
                <div className={style.divdato}>
                    <label className={style.dato}>Life span</label>
                    <h6 className={style.datosec}>Min.</h6> 
                    <input className={style.inputnum} type="number" name="lmin" min="0" placeholder="In years" onChange={handleChange} required/>
                    <h6 className={style.datosec}>Max.</h6> 
                    <input className={style.inputnum} type="number" name="lmax" placeholder="In years" min="0" onChange={handleChange} required/>
                    <br />
                    {error.life_span ? ( <div className={style.divdato}> <p className={style.simbolo}>!</p> <span className={style.textohover}>{error.life_span}</span>
                    </div> ):(null)}
                </div>
                <div className={style.divdato} >
                    <label className={style.dato}>Image</label> 
                    <input className={style.inputtext} type="text" name="image" placeholder="URL" onChange={handleChange}/>
                    {error.image ? ( <div className={style.divdato}> <p className={style.simbolo}>!</p> <span className={style.textohover}>{error.image}</span>
                    </div> ):(null)}
                </div>
                <div className={style.divdato}>
                    <label className={style.dato}>Tempermanets list</label>
                    <select className={style.select} onChange={handleFilterTemp}>
                    {temperamentos.map((temp) => (
                    <option value={temp.temperamento}> {temp.temperamento} </option>))}
                    </select>
                    <button className= {style.botonclean}onClick={clearTempFilter}>Clear temperaments</button>
                    {error.temperaments ? ( <div className={style.divdato}> <p className={style.simbolo}>!</p> <span className={style.textohover}>{error.temperaments}</span>
                    </div> ):(null)}
                </div>
                <div className={style.tempfil}>
                    {tempFilter.map((temp) => ( <h6 className={style.tempfiltemp}> {temp}</h6>))}
                </div>
                <div className={style.divdato}>
                <label className={style.dato}>&#127381;Temperament</label>
                    <input className={style.inputtext2} type="text" name="new" placeholder="Include a temperament that is not on the list" onChange={handleChange} size="35"/>
                    <br/>
                    {error.new ? ( <div className={style.divdato}> <p className={style.simbolo}>!</p> <span className={style.textohover}>{error.new}</span>
                    </div> ):(null)}
                </div>
                <div className={style.divdato}>
                    <input className={style.boton}
                    type="submit"
                    value="Create Dog"
                    disabled={
                    error.name ||
                    error.weight ||
                    error.height ||
                    error.temperaments ||
                    error.life_span ||
                    error.image} />
                    <button className={style.botonclean}>Clear all</button>
                </div>
                
            </div>

        </form>
        </>
    )

}

export default Form