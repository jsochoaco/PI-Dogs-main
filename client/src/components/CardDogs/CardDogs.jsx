import React from "react";
import Card from "../Card/Card";
import style from "./CardDogs.module.css"

const CardDogs = (props) => {
    const {dogs} = props;
    return (
            <div className={style.cards}>
            {dogs.map((dog) => {
                const minimo = dog.weight?.metric
                if (minimo[1] === " ") dog["min"] = parseInt(minimo[0])
                if (minimo[1] != " ") dog["min"] = parseInt(minimo[0]+minimo[1])
                const maximo = dog.weight?.metric
                if (maximo[maximo.length - 2] === " ") dog["max"] = parseInt(maximo[maximo.length-1])
                if (maximo[maximo.length - 2] != " ") dog["max"] = parseInt(maximo[maximo.length-2]+maximo[maximo.length-1])
                
                return (
                <Card
                    key={dog.id}
                    id={dog.id}
                    name={dog.name}
                    image={dog.image?.url}
                    weight={dog.weight?.metric}
                    temperament={dog.temperament}
                    origen = {dog.origen}
                    weightmax = {dog.max}
                    weightmin = {dog.min}
                />
            )})}
            </div>
    );
};

export default CardDogs