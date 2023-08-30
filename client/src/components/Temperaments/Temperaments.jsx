import style from "./Temperaments.module.css"
import { useState, useEffect } from "react";

const Temperaments = (props) => {
  // Traigo estado de temperamentos
  const { temperamentos} = props
  //Animación de titulo
  const [showH2, setShowH2] = useState(true);
  useEffect(() => {
    const timer = setInterval(() => {
      setShowH2((prevShowH2) => !prevShowH2);}, 1500);
      return () => {clearInterval(timer)}}
  ,[])

  //Renderizado
  return (
  <div className={style.contenedor}>
    <div className={style.titulo}>
      {showH2 ? <h2 className={style.titulo1}>&#128519; &#129322; Temperaments &#128519; &#128515;</h2> : <h2 className={style.titulo1}>&#128545; &#128529; Temperaments &#128548; &#129324;</h2>}
      </div>
      {temperamentos.length === 0 ?(<div className={style.loaddiv}>
        <div className={style.loader}> </div>
        <h1 className={style.h1}>Loading &#8986;</h1>
        </div>)
      :(
      <div className= {style.temperamentos}>
        {temperamentos.map((temp) => (
        <h4 className= {style.temp}> {temp.temperament} </h4>))}
      </div>
      )}
  </div>
  )
};

export default Temperaments

