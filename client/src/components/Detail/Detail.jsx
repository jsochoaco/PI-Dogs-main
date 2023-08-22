import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, NavLink } from "react-router-dom";
import style from "./Detail.module.css"

const Details = () => {
    const {id} = useParams();
    const [dog,setDog] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/dogs/${id}`);
            const data = response.data;
            if (data.name) {
                if (data.temperament) {
                    const temperamentArray = data.temperament.split(", ");
                    setDog({ ...data, temperament: temperamentArray });
                }
                const reference = data.reference_image_id;
                const imageResponse = await axios.get(
                `https://api.thedogapi.com/v1/images/${reference}`);
                const image = imageResponse.data;
                setDog((prevDog) => ({ ...prevDog, url: image.url }));
            }
          } catch (error) {
            (error.message);
          }
        };
    
        fetchData();
      }, [id]);

    return (
        <>
        {
            dog.temperament ? (
                <div className={style.contenedor}>
                    <div>
                        <img src={dog.url} alt={dog.name} />
                    </div>
                    <div className={style.datos}>
                        <h2 className={style.titulo} > {dog.name} </h2>
                        <p className={style.info}> <strong>HEIGHT | </strong> {dog.height?.metric} centimeters </p>
                        <p className={style.info}> <strong>WEIGHT | </strong> {dog.weight?.metric} kg  </p>
                        <div>
                        <p className={style.info}><strong>TEMPERAMENTS | </strong> </p>
                        {dog.temperament.map((temp, index) => { return (
                        <p key={index}> {temp} </p>)})}
                        </div>
                        <p className={style.info}> <strong>LIFE YEARS | </strong> {dog.life_span} </p>
                        <NavLink to="/home">
                            <button>Back</button>
                        </NavLink>
                    </div>
                </div>
            )
            :
            (
                <p>Loading...</p>
            )
        }
        </>
    )}


export default Details