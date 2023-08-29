import React from "react";
import Card from "../Card/Card";
import style from "./CardDogs.module.css"

const CardDogs = (props) => {
    const {dogs, intermedia, temperamentos} = props;
    console.log("dogs:", dogs);
    return (
            <div className={style.cards}>
            {dogs.map((dog) => {
                if (dog.origen === "API") {
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
                    />)
                }
                else if (dog.origen === "DB") {
                    const minimo = dog.weight
                    if (minimo[1] === "-") dog["min"] = parseInt(minimo[0])
                    if (minimo[1] != "-") dog["min"] = parseInt(minimo[0]+minimo[1])
                    const maximo = dog.weight
                    if (maximo[maximo.length - 2] === "-") dog["max"] = parseInt(maximo[maximo.length-1])
                    if (maximo[maximo.length - 2] != "-") dog["max"] = parseInt(maximo[maximo.length-2]+maximo[maximo.length-1])
                    
                    const filtro = intermedia.filter((obj) => obj.dogId === dog.id);
                    const indexTemp = filtro.map((obj) => obj.temperamentId);
                    let db = []
                    if (temperamentos.length > 0){
                        for (let i =0; i < indexTemp.length; i++) {
                            const temp = temperamentos[indexTemp[i]]
                            if(temp){const tem = temp.temperament
                            db.push(tem)}
                        }
                        dog.temperament = db.join(",")
                    }
                    return (
                    <Card
                        key={dog.id}
                        id={dog.id}
                        name={dog.name}
                        image={dog.image}
                        weight={dog.weight}
                        temperament={dog.temperament}
                        origen = {dog.origen}
                        weightmax = {dog.max}
                        weightmin = {dog.min}
                    />)

                }
                })}
            </div>
    );
};

export default CardDogs