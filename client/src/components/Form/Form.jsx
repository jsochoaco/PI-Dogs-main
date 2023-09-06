import { useState, useEffect } from "react"
import style from "./form.module.css"
import * as actions from "../../redux/actions"
import { useDispatch } from "react-redux"

const Form = (props) => {
    const dispatch = useDispatch()
    const {temperamentos, created} = props // Props
    // [new Set(temperamentos)] 
    // Estados
    const [tempFilter, setTempFilter] = useState([]) //Lista de temperamentos
    const [nuevo, setNuevo] = useState([]) // Temperamento nuevo agregado
    const [creado, setCreado] = useState(created) //Perro creado o no
    const [datos, setDatos] = useState({name: "", hmin: "", hmax: "", wmin: "", wmax: "", lmin: "", lmax: "", temperament: [],image: "",}) //Datos
    const [envio, setEnvio] = useState({name: "", height: "", weight: "", life_span: "", temperament: "" ,image: "",}) // Info a enviar
    const [error, setError] = useState({}) // Error
    //Funciones
    const handleAdd = (evento) => {if(evento.target.value) setNuevo(evento.target.value)} //Agregar temp
    const add = () => {setTempFilter(prevTempFilter => [...prevTempFilter, nuevo])} //Agregar temp
    const handleFilterTemp = (evento) => {
        const selectedOption = evento.target.value;
        setTempFilter(prevTempFilter => [...prevTempFilter, selectedOption])}
    const clearTempFilter = () => {setTempFilter([])} // Limpiar temp
    const validate = (datos) => { //Función validadora
        const nameValidation = new RegExp(/^[a-zA-Z]+$/) //Solo letras
        const imageValidation = new RegExp(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/) //URL para imagen
        let error = {}
        if (datos.name) {
            if (!nameValidation.test(datos.name) || datos.name.length > 15) error.name = "Must have only letters and 15 characteres max."}
        if (datos.image) {
            if(!imageValidation.test(datos.image)) error.image = "Must be a valid URL"}
        if (datos.temperament.length === 0) error.temperaments = "You must choose at least one temperament"
        if (datos.new) {
            if (!nameValidation.test(datos.new) || datos.new.length > 15) error.new = "Must have only letters and 15 characteres max.";}
        if (datos.hmin && datos.hmax) {
            if (Number(datos.hmin) === Number(datos.hmax) || Number(datos.hmin) > Number(datos.hmax)) error.height = "The minimum must be lower and different than the maximum"}
        if (datos.wmin && datos.wmax) {
            if (Number(datos.wmin) === Number(datos.wmax) || Number(datos.wmin) > Number(datos.wmax)) error.weight =  "The minimum must be lower and different than the maximum"}
        if (datos.lmin && datos.lmax ) {
            if (Number(datos.lmin) === Number(datos.lmax) || Number(datos.lmin) > Number(datos.lmax)) error.life_span = "The minimum must be lower and different than the maximum"}
        return error}
    const handleChange = (evento) => { //Para el cambio en los inputs
        const temp = tempFilter
        setDatos({...datos, temperament: [...temp], [evento.target.name]: evento.target.value})
        setError(validate({...datos, temperament: [...temp], [evento.target.name]: evento.target.value}))
        setEnvio({...envio, name: datos.name, height: String(datos.hmin) + "-" + String(datos.hmax), weight: String(datos.wmin) + "-" + String(datos.wmax), life_span: String(datos.lmin) + "-" + String(datos.lmax), temperament: datos.temperament.join(","), image: datos.image,})}
    const handleSubmit = (evento) =>  {     //Envío de info
        evento.preventDefault()
        dispatch(actions.createDog(envio))}
    const handleClearAll = () => { //Limpieza
        setDatos({name: "", hmin: "", hmax: "", wmin: "", wmax: "", lmin: "", lmax: "", temperament: [],image: "", new: ""});
        setError({});
        setTempFilter([]);}
    useEffect(()=> {setCreado(created)}, [created])
    const ok = ()=> { //Boton OK
        setCreado(null);handleClearAll()}
    //Renderizado
    return (
        <>
        <form onSubmit={handleSubmit} >
            <div className={style.contenedor}>
                <h1 className={style.ppal}>&#127381; Create a new dog &#128054;</h1>
                <div className={style.divdato}>
                    <label className={style.dato}>Name</label>
                    <input className={style.inputtext}   disabled={creado === true || creado === false}  type="text" name="name" placeholder="Dog name" onChange={handleChange} required  value={datos.name}/>
                    <br/>
                    {error.name ? ( <div className={style.divdato2}> <p className={style.simbolo}>!</p> <span className={style.textohover}>{error.name}</span>
                    </div> ):(null)}
                </div>
                <div className={style.divdato}>
                    <label className={style.dato}>Tempermanets list</label>
                    <select className={style.select} name="list" onChange={handleFilterTemp} disabled={creado === true || creado === false} >
                    {temperamentos.map((temp) => (
                    <option value={temp.temperament}> {temp.temperament} </option>))}
                    </select>
                    <button className= {style.botonclean} onClick={clearTempFilter}>Clear temperaments</button>
                    {error.temperaments ? ( <div className={style.divdato2}> <p className={style.simbolo}>!</p> <span className={style.textohover}>{error.temperaments}</span>
                    </div> ):(null)}
                </div>
                <div className={style.divdato}>
                <label className={style.dato}>&#127381;Temperament</label>
                    <input className={style.inputtext2} disabled={creado === true || creado === false}  type="text" name="new" placeholder="Include a temperament that is not on the list" onChange = {e=> {handleAdd(e); handleChange(e);}} />
                    <br/>
                    <button className={style.botonclean} disabled={creado === true || creado === false} onClick={add}>Add</button>
                    {error.new ? ( <div className={style.divdato2}> <p className={style.simbolo}>!</p> <span className={style.textohover}>{error.new}</span>
                    </div> ):(null)}
                </div>
                <div className={style.divdato}>                 
                    <label className={style.dato}>Height</label>
                    <h6 className={style.datosec}>Min.</h6>
                    <input className={style.inputnum} disabled={creado === true || creado === false}  type="number" name="hmin" min="0" placeholder="In centimeters" onChange={handleChange}  required value={datos.hmin}/>
                    <h6 className={style.datosec}>Max.</h6>
                    <input className={style.inputnum} disabled={creado === true || creado === false}  type="number" name="hmax" min="0" placeholder="In centimeters" onChange={handleChange} required value={datos.hmax}/>
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
                    <input className={style.inputnum} disabled={creado === true || creado === false}  type="number" name="wmin" min="0" placeholder="In kilograms" onChange={handleChange} required value={datos.wmin}/>
                    <h6 className={style.datosec}>Max.</h6> 
                    <input className={style.inputnum} disabled={creado === true || creado === false}  type="number" name="wmax" min="0" placeholder="In kilograms" onChange={handleChange} required value={datos.wmax}/>
                    <br/>
                    {error.weight ? ( <div className={style.divdato2}> <p className={style.simbolo}>!</p> <span className={style.textohover}>{error.weight}</span>
                    </div> ):(null)}
                </div>
                <div className={style.divdato}>
                    <label className={style.dato}>Life span</label>
                    <h6 className={style.datosec}>Min.</h6> 
                    <input className={style.inputnum} disabled={creado === true || creado === false}  type="number" name="lmin" min="0" placeholder="In years" onChange={handleChange} required value={datos.lmin}/>
                    <h6 className={style.datosec}>Max.</h6> 
                    <input className={style.inputnum} disabled={creado === true || creado === false}  type="number" name="lmax" placeholder="In years" min="0" onChange={handleChange} required value={datos.lmax}/>
                    <br />
                    {error.life_span ? ( <div className={style.divdato2}> <p className={style.simbolo}>!</p> <span className={style.textohover}>{error.life_span}</span>
                    </div> ):(null)}
                </div>
                <div className={style.divdato} >
                    <label className={style.dato}>Image</label> 
                    <input className={style.inputtext} disabled={creado === true || creado === false}  type="text" name="image" placeholder="URL" onChange={handleChange} value={datos.image}/>
                    {error.image ? ( <div className={style.divdato2}> <p className={style.simbolo}>!</p> <span className={style.textohover}>{error.image}</span>
                    </div> ):(null)}
                </div>
                <div className={style.tempfil} >
                    {tempFilter.map((temp) => ( <h6 className={style.tempfiltemp}> {temp}</h6>))}
                </div>
                <div className={style.divdato}>
                    <input className={style.boton} type="submit" value="Create Dog"
                    disabled={ (!envio.name && envio.name !== "")|| (!envio.temperament && envio.temperament !== "") || (!envio.life_span && envio.life_span !== "" )||(!envio.weight  && envio.weight !== "")||  (!envio.height && envio.height !== "")|| (!envio.height && envio.height !== "")|| error.name || error.weight || error.height || error.temperaments || error.life_span || error.image || (creado === true || creado === false)}/>
                    <button className={style.botonclean} disabled={creado === true || creado === false} type="button" onClick={handleClearAll}>Clear all</button>
                </div>
                <div>
                {creado === false ? (<div className={style.divdato2}>
                    <span className={style.textohover2}>This dog already exists</span>
                    <button className={style.botonok}onClick={ok}>X</button>
                    </div>) 
                :creado === true ? (<div className={style.divdato2}>
                    <span className={style.textohover3}>Dog created</span>
                    <button className={style.botonok2}onClick={ok}>X</button>
                    </div>):null}
                </div>
            </div>
        </form>
        </>
)}
export default Form