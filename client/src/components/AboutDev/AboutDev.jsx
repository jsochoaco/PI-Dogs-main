import style from "./About.module.css"
import image from "./Imagenes/OCHOA2.png"
import { Link } from "react-router-dom"
import JS from "./Imagenes/js.png"
import HMTL from "./Imagenes/HMTL.png"
import CSS from "./Imagenes/CSS.png"
import React from "./Imagenes/React.png"
import Redux from "./Imagenes/Redux3.png"
import Node from "./Imagenes/Node.png"
import Express from "./Imagenes/Express.png"
import Sequelize from "./Imagenes/Sequelize.png"
import PostgreSQL from "./Imagenes/PostgreSQL.png"

const AboutDev = () => {
    //Renderizado
    return (
        <div className={style.contenedor}>
            <h1 className={style.nombre2}>About the Developer &#128640;</h1>
            <div className={style.imagen}>
                <div className={style.data2}>
                    <Link to = "https://www.linkedin.com/in/juansebastian-ochoacortes/" target="_blank">
                        <h1 className={style.nombre}> Juan Sebastián Ochoa Cortés </h1>
                    </Link>
                    <p className={style.p}>I am a Full Stack Developer, Mechanical Engineer, 24 years-old, from Colombia, with an intermediate level of English-B2, with emphasis on product development. I have experience and knowledge in functions related to product creation and execution, software development, web development, user experience and user interface design. I am currently looking for a position as Front-End Developer, where I can integrate my product development experience and web development skills to execute challenges that support the company's value generation.</p>
                </div>
                <div className={style.imagendiv}>
                    <img className= {style.img}src={image} alt="" />
                </div>
            </div>
            <div className={style.listadiv}>
                <div className={style.skills}>
                    <img className={style.logos} src={JS} alt="" />
                    <h6 className={style.lista}>JavaScript</h6>
                </div>
                <div className={style.skills}>
                    <img className={style.logos} src={HMTL} alt="" />
                    <h6 className={style.lista}>HTML</h6>
                </div>
                <div className={style.skills}>
                    <img className={style.logos} src={CSS} alt="" />
                    <h6 className={style.lista}>CSS</h6>
                </div>
                <div className={style.skills}>
                    <img className={style.logos} src={React} alt="" />
                    <h6 className={style.lista}>React.js</h6>
                </div>
                <div className={style.skills}>
                    <img className={style.logos} src={Redux} alt="" />
                    <h6 className={style.lista}>Redux.js</h6>
                </div>
                <div className={style.skills}>
                    <img className={style.logos} src={Node} alt="" />
                    <h6 className={style.lista}>Node.js</h6>
                </div>
                <div className={style.skills}>
                    <img className={style.logos} src={Express} alt="" />
                    <h6 className={style.lista}>Express</h6>
                </div>
                <div className={style.skills}>
                    <img className={style.logos} src={Sequelize} alt="" />
                    <h6 className={style.lista}>Sequelize</h6>
                </div>
                <div className={style.skills}>
                    <img className={style.logos} src={PostgreSQL} alt="" />
                    <h6 className={style.lista}>PostgreSQL</h6>
                </div>

            </div>
        </div>)
}

export default AboutDev