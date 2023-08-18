import React from "react";
import Card from "../Card/Card";
import { connect } from "react-redux";
import * as actions from "../../redux/actions"
import { useDispatch } from "react-redux"
import { useState } from "react";


const CardDogs = (props) => {
    const { allDogs, temperamentos } = props;

    const dispatch = useDispatch()

    const [selectedFilter, setSelectedFilter] = useState("All");

    const handleFilterOrigin = (evento) => {
        dispatch(actions.filterOrigen(evento.target.value))
        setSelectedFilter(evento.target.value);
    }

    const handleFilterTemp = (evento) => {
        const temp = Array.from(evento.target.selectedOptions).map(option => option.value);
        dispatch(actions.filterTemp(temp))
    }
    return (
        <div>
            <div>
            <div>
                <h2> Filter by Origin</h2>
                <p>{temperamentos}</p>
                <select onChange={handleFilterOrigin} defaultValue={selectedFilter} >
                    <option value="All">All</option>                
                    <option value="DB">Created</option>
                    <option value="API">Imported</option>
                </select>
                <select onChange={handleFilterTemp} multiple>
                {temperamentos.map((temp) => (
                <option value={temp.temperamento}> {temp.temperamento} </option>))}
                </select>
            </div>
            </div>
            <div>
            {allDogs.map((dog) => (
                <Card
                    key={dog.id}
                    id={dog.id}
                    name={dog.name}
                    image={dog.image?.url}
                    weight={dog.weight?.metric}
                    temperament={dog.temperament}
                    origen = {dog.origen}
                />
            ))}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        allDogs: state.allDogs,
        temperamentos: state.temperamentos
    };
};

export default connect(mapStateToProps, null)(CardDogs);