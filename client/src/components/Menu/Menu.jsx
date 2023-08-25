import { useState } from 'react';
import styles from './Menu.module.css';
import { NavLink } from 'react-router-dom';
const Menu = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div>
        {!menuVisible ? (<button className={styles.toggleButton} onClick={toggleMenu}> &#9776; </button>) : ("")}
        {menuVisible && (
              <nav className={`${styles.hiddenMenu} ${menuVisible && styles.menuVisible}`}>
                <p className={styles.opciones} onClick={toggleMenu}><a> X </a></p>
                <h1 className={styles.opciones}>The Dogs App &#128054;</h1>
              <ul>
                <NavLink to="/home">
                  <li className={styles.opciones}>Home</li>
                </NavLink>
                <NavLink to="/create">
                  <li className={styles.opciones} >Create Dog</li>
                </NavLink>
                <NavLink to="/temperaments">
                  <li className={styles.opciones}> Temperaments </li>
                </NavLink>
                <NavLink to="/aboutme">
                  <li className={styles.opciones}>About developer</li>
                </NavLink>
                <NavLink to = "/">
                  <li className={styles.opciones}>Landing page</li>
                </NavLink>
              </ul>
            </nav>
      )}
    </div>
  );
};

export default Menu;