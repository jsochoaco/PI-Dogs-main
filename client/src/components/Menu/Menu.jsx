import { useState } from 'react';
import styles from './Menu.module.css';
import { NavLink } from 'react-router-dom';
const Menu = () => {
  //Estados
  const [menuVisible, setMenuVisible] = useState(false);
  //Funciones
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  return (
    <div>
      {!menuVisible ? (<button className={styles.toggleButton} onClick={toggleMenu}> &#9776; </button>) : ("")}
      {menuVisible && (
      <nav className={`${styles.hiddenMenu} ${menuVisible && styles.menuVisible}`}>
        <p className={styles.opcionesx} onClick={toggleMenu}><a>&#9932;</a></p>
        <h1 className={styles.opcionestit}>The Dogs App &#128054;</h1>
        <ul>
          <NavLink to="/home">
            <li className={styles.opciones}>&#127968; Home</li>
          </NavLink>
          <NavLink to="/create">
            <li className={styles.opciones} >&#127381; Create Dog</li>
          </NavLink>
          <NavLink to="/temperaments">
            <li className={styles.opciones}> &#129322; Temperaments </li>
          </NavLink>
          <NavLink to="/aboutDev">
            <li className={styles.opciones}>&#128640; About the developer</li>
          </NavLink>
          <NavLink to = "/">
            <li className={styles.opciones}>&#11088; Landing page</li>
          </NavLink>
        </ul>
      </nav>)}
    </div>)
};
export default Menu;