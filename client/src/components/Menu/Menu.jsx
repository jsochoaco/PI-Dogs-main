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
                <h1>The Dogs App &#128054;</h1>
              <ul>
                <li className={styles.opciones}><a href="/home">Home</a></li>
                <li className={styles.opciones} ><a href="/create">Create Dog</a></li>
                <li className={styles.opciones}><a href="/temperaments">Temperaments </a></li>
                <li className={styles.opciones}><a href="/aboutme">About developer</a></li>
                <li className={styles.opciones}><a href="/">Landing page</a></li>
                <li className={styles.opciones} onClick={toggleMenu}><a> Close</a></li>
              </ul>
            </nav>
      )}
    </div>
  );
};

export default Menu;