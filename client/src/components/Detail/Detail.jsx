import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, NavLink } from "react-router-dom";
import style from "./Detail.module.css"

const Details = (props) => {
    const {id} = useParams();
    const {dogs,temperamentos,intermedia} = props
    const [dog,setDog] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            if (id < 265) {
              const response = await axios.get(`http://localhost:3001/dogs/${id}`);
              const data = response.data;
    
              if (data.name) {
                let updatedDog = { ...data };
    
                if (data.temperament) {
                  const temperamentArray = data.temperament.split(", ");
                  updatedDog = { ...updatedDog, temperament: temperamentArray };
                }
    
                const reference = data.reference_image_id;
                const imageResponse = await axios.get(
                  `https://api.thedogapi.com/v1/images/${reference}`
                );
                const image = imageResponse.data;
                updatedDog = { ...updatedDog, url: image.url };
    
                setDog(updatedDog);
              }
            }
    
            if (id >= 265) {
              // Buscar en los estados, no buscar en la DB
              const dogDB = dogs.find((obj) => obj.id === parseInt(id));
              const filtro = intermedia.filter((obj) => obj.dogId === dogDB.id);
              const indexTemp = filtro.map((obj) => obj.temperamentId);
              const db = indexTemp.map((index) =>
                temperamentos[index] ? temperamentos[index].temperament : null
              );
    
              setDog({ ...dogDB, temperament: db });
            }
          } catch (error) {
            console.error(error.message); // Registrar el error en la consola
          }
        };
        fetchData();
      }, [id, dogs, temperamentos, intermedia]);
    return (
        <>
        {
            dog.temperament ? (
                <div className={style.contenedor}>
                    <div className={style.imagencontiner}>
                        {dog.origen !== "DB" ? (<img className= {style.img} src={dog.url} alt={dog.name} />): (<img className= {style.img} src={dog.image} alt={dog.name} />)}
                        {dog.origen !== "DB" ? (<div className={style.caption}>
                            <h5 className={style.name}> {dog.name}</h5>
                            {dog.bred_for?(<h6 className={style.adicional}> BRED FOR | {dog.bred_for}</h6>):(<h6 className={style.adicional}> BRED FOR | No data</h6>)}
                            {dog.origin?(<h6 className={style.adicional}> ORIGIN | {dog.origin}</h6>):(<h6 className={style.adicional}> ORIGIN | No data</h6>)}
                            {dog.breed_group?(<h6 className={style.adicional}> BREED GROUP | {dog.breed_group}</h6>):(<h6 className={style.adicional}> BREED GROUP | No data</h6>)}
                        </div>): (null)}
                    </div>
                    <div className={style.datos}>
                        <h2 className={style.titulo} > {dog.name} </h2>
                        {dog.origen !== "DB" ? ( <div><p className={style.info}> <strong>HEIGHT | </strong> {dog.height?.metric} centimeters </p>
                        <p className={style.info}> <strong>WEIGHT | </strong> {dog.weight?.metric} kg  </p>
                        </div>)
                        :
                        (<div><p className={style.info}> <strong>HEIGHT | </strong> {dog.height} centimeters </p>
                        <p className={style.info}> <strong>WEIGHT | </strong> {dog.weight} kg  </p>
                        </div>)}
                        <p className={style.info}> <strong>LIFE YEARS | </strong> {dog.life_span} </p>
                        <p className={style.info}><strong>TEMPERAMENTS</strong> </p>
                        <div className={style.temperaments} >
                        {dog.temperament.map((temp, index) => { return (
                        <h6 className={style.p} key={index}> {temp} </h6>)})}
                        </div>
                        <NavLink to="/home">
                            <button className={style.back}> &#8678; </button>
                        </NavLink>
                    </div>
                </div>
            )
            :
            (
                <div className={style.loaddiv}>
                    <div className={style.loader}></div>
                </div>
            )
        }
        </>
    )}


export default Details