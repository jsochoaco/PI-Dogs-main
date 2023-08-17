


export default function Card (props) {
    const {id, name, image, weight, temperament, origen} = props

    return (
        <div >
            <img src={image} alt={name} />
            <h2>{name}</h2>
            <h2>{weight} kg</h2>
            <h2>{temperament}</h2>
            <h2>{id}</h2>
            <h2>{origen}</h2>
        </div>
     );
}



