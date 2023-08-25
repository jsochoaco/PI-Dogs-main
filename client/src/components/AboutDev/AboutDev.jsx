import style from "./About.module.css"
import image from "./OCHOA2.png"
import { Link } from "react-router-dom"

const AboutDev = () => {

    return (
        <div className={style.contenedor}>
            <h1 className={style.nombre2}>About the Developer</h1>
            <div className={style.imagen}>
                <div className={style.data2}>
                    <Link to = "https://www.linkedin.com/in/juansebastian-ochoacortes/" target="_blank">
                        <h1 className={style.nombre}> Juan Sebastián Ochoa Cortés </h1>
                        </Link>
                        <p className={style.p}>I am a Full Stack Developer, Mechanical Engineer, 24 years-old, with an intermediate level of English-B2, with emphasis on product development. I have experience and knowledge in functions related to product creation and execution, software development, web development, user experience and user interface design. I am currently looking for a position as Front-End Developer, where I can integrate my product development experience and web development skills to execute challenges that support the company's value generation.</p>   
                </div>
                <div>
                    <img className= {style.img}src={image} alt="" />
                </div>
            </div>
            <div className={style.data}>
                <h5 className={style.titulo}> Applied Tech Skills </h5>
                <ul className={style.lista}>
                    <li className={style.opciones}>JavaScript</li>
                    <li className={style.lista}>HTML</li>
                    <li className={style.lista}>CSS</li>
                    <li className={style.lista}>React.js</li>
                    <li className={style.lista}>Redux</li>
                    <li className={style.lista}>Node.js</li>
                    <li className={style.lista}>Express</li>
                    <li className={style.lista}>Sequelize</li>
                    <li className={style.lista}>PostgreSQL</li>
                </ul>
            </div>
        </div>
    )
}


export default AboutDev