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
    const [nuevo, setNuevo] = useState([])
    const {temperamentos, created} = props
    const handleAdd = (evento) => {
        if(evento.target.value) {
            setNuevo(evento.target.value)
        }
    }
    const [creado, setCreado] = useState(created)
    const add = () => {
        setTempFilter(prevTempFilter => [...prevTempFilter, nuevo])}
    const handleFilterTemp = (evento) => {
        const selectedOption = evento.target.value;
        setTempFilter(prevTempFilter => [...prevTempFilter, selectedOption])}
    const clearTempFilter = () => {
        setTempFilter([])}
    // Datos
    const [datos, setDatos] = useState({
        name: "",
        hmin: "",
        hmax: "",
        wmin: "",
        wmax: "",
        lmin: "",
        lmax: "",
        temperament: [],
        image: "",
      })
    // Info a enviar
    const [envio, setEnvio] = useState({name: "", height: "", weight: "", life_span: "", temperament: "" ,image: "",})
    //Función validadora
    const validate = (datos) => {
        const nameValidation = new RegExp(/^[a-zA-Z]+$/) //Solo letras
        const imageValidation = new RegExp(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/) //URL para imagen
        let error = {}
        if (datos.name) {
            if (!nameValidation.test(datos.name)) error.name = "Must have only letters"}
        if (datos.image) {
            if(!imageValidation.test(datos.image)) error.image = "Must be a valid URL"}
        if (datos.temperament.length === 0) error.temperaments = "You must choose at least one temperament"
        // if (datos.new) {
        //     if (!nameValidation.test(datos.new)) error.new = "Must have only letters";}
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
            temperament: [...temp],
            [evento.target.name]: evento.target.value
        })
        setError(validate({...datos,
            temperament: [...temp],
            [evento.target.name]: evento.target.value
        }))
        setEnvio({...envio,
            name: datos.name,
            height: String(datos.hmin) + "-" + String(datos.hmax),
            weight: String(datos.wmin) + "-" + String(datos.wmax),
            life_span: String(datos.lmin) + "-" + String(datos.lmax),
            temperament: datos.temperament.join(","),
            image: datos.image,
        })
    }
    //Función de envío de info
    const handleSubmit = (evento) =>  {
        evento.preventDefault()
        dispatch(actions.createDog(envio))
        setCreado(created)}
    const ok = () => {
        setCreado("")
    }
    //Función de limpieza 
    const handleClearAll = () => {
        setDatos({
          name: "",
          hmin: "",
          hmax: "",
          wmin: "",
          wmax: "",
          lmin: "",
          lmax: "",
          temperament: [],
          image: "",
        });
        setError({});
        setTempFilter([]);
      };
    //Renderizado
    return (
        <>
        <form onSubmit={handleSubmit} >
            <div className={style.contenedor}>
                <h1 className={style.ppal}>&#127381; Create a new dog &#128054;</h1>
                <div className={style.divdato}>
                    <label className={style.dato}>Name</label>
                    <input className={style.inputtext}  type="text" name="name" placeholder="Dog name" onChange={handleChange} required  value={datos.name}/>
                    <br/>
                    {error.name ? ( <div className={style.divdato2}> <p className={style.simbolo}>!</p> <span className={style.textohover}>{error.name}</span>
                    </div> ):(null)}
                </div>
                <div className={style.divdato}>
                    <label className={style.dato}>Tempermanets list</label>
                    <select className={style.select} name="list" onChange={handleFilterTemp}>
                    {temperamentos.map((temp) => (
                    <option value={temp.temperament}> {temp.temperament} </option>))}
                    </select>
                    <button className= {style.botonclean} onClick={clearTempFilter}>Clear temperaments</button>
                    {error.temperaments ? ( <div className={style.divdato2}> <p className={style.simbolo}>!</p> <span className={style.textohover}>{error.temperaments}</span>
                    </div> ):(null)}
                </div>
                <div className={style.divdato}>                 
                    <label className={style.dato}>Height</label>
                    <h6 className={style.datosec}>Min.</h6>
                    <input className={style.inputnum} type="number" name="hmin" min="0" placeholder="In centimeters" onChange={handleChange}  required value={datos.hmin}/>
                    <h6 className={style.datosec}>Max.</h6>
                    <input className={style.inputnum} type="number" name="hmax" min="0" placeholder="In centimeters" onChange={handleChange} required value={datos.hmax}/>
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
                    <input className={style.inputnum} type="number" name="wmin" min="0" placeholder="In kilograms" onChange={handleChange} required value={datos.wmin}/>
                    <h6 className={style.datosec}>Max.</h6> 
                    <input className={style.inputnum} type="number" name="wmax" min="0" placeholder="In kilograms" onChange={handleChange} required value={datos.wmax}/>
                    <br/>
                    {error.weight ? ( <div className={style.divdato2}> <p className={style.simbolo}>!</p> <span className={style.textohover}>{error.weight}</span>
                    </div> ):(null)}
                </div>
                <div className={style.divdato}>
                    <label className={style.dato}>Life span</label>
                    <h6 className={style.datosec}>Min.</h6> 
                    <input className={style.inputnum} type="number" name="lmin" min="0" placeholder="In years" onChange={handleChange} required value={datos.lmin}/>
                    <h6 className={style.datosec}>Max.</h6> 
                    <input className={style.inputnum} type="number" name="lmax" placeholder="In years" min="0" onChange={handleChange} required value={datos.lmax}/>
                    <br />
                    {error.life_span ? ( <div className={style.divdato2}> <p className={style.simbolo}>!</p> <span className={style.textohover}>{error.life_span}</span>
                    </div> ):(null)}
                </div>
                <div className={style.divdato} >
                    <label className={style.dato}>Image</label> 
                    <input className={style.inputtext} type="text" name="image" placeholder="URL" onChange={handleChange} value={datos.image}/>
                    {error.image ? ( <div className={style.divdato2}> <p className={style.simbolo}>!</p> <span className={style.textohover}>{error.image}</span>
                    </div> ):(null)}
                </div>
                <div className={style.tempfil} >
                    {tempFilter.map((temp) => ( <h6 className={style.tempfiltemp}> {temp}</h6>))}
                </div>
                <div className={style.divdato}>
                <label className={style.dato}>&#127381;Temperament</label>
                    <input className={style.inputtext2} type="text" name="new" placeholder="Include a temperament that is not on the list" onChange = {e=> {handleAdd(e); handleChange(e);}} />
                    <br/>
                    <button className={style.botonclean} onClick={add}>Add</button>
                    {error.new ? ( <div className={style.divdato2}> <p className={style.simbolo}>!</p> <span className={style.textohover}>{error.new}</span>
                    </div> ):(null)}
                </div>
                <div className={style.divdato}>
                    <input className={style.boton}
                    type="submit"
                    value="Create Dog"
                    disabled={
                    (!envio.name && envio.name !== "")||
                    (!envio.temperament && envio.temperament !== "") ||
                    (!envio.life_span && envio.life_span !== "" )||
                    (!envio.weight  && envio.weight !== "")|| 
                    (!envio.height && envio.height !== "")||
                    (!envio.height && envio.height !== "")||
                    error.name ||
                    error.weight ||
                    error.height ||
                    error.temperaments ||
                    error.life_span ||
                    error.image} />
                    <button className={style.botonclean} type="button" onClick={handleClearAll}>Clear all</button>
                </div>
                <div>
                    <p>{creado}</p>
                    {creado === true ? (<p>Dog created</p>) 
                    : creado === false ? (<p>This dog already exists</p>) 
                    : null}
                    <button onClick={ok} >Ok</button>
                </div>
                
            </div>

        </form>
        </>
    )

}

export default Form