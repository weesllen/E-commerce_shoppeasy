import { FaCartShopping } from 'react-icons/fa6';
import { Link } from 'react-router-dom'
import styles from './NavBar.module.css'
import NavBarLink from './NavBarLink';

const NavBar = ({numCartItems}) => {
    return (
        <nav className={`navbar navbar-expand-lg navbar-light ${styles.modernNavbar}`}>
          <div className="container">
            <Link className={`navbar-brand ${styles.brandLogo}`} to="/">
              <span className={styles.brandIcon}>🛍️</span>
              SHOPPEASY
            </Link>
            <button
                className="navbar-toggler" 
                type="button"
                data-bs-toggle="collapse" 
                data-bs-target="#navbarContent" 
                aria-controls="navbarContent" 
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
              <span className='navbar-toggler-icon'></span>
            </button> 
            <div className='collapse navbar-collapse justify-content-end' id ='navbarContent'>
                <NavBarLink/>
                <Link to='/cart' className={`${styles.cartButton} position-relative`}>
                  <FaCartShopping className={styles.cartIcon}/>
                  {numCartItems > 0 && (
                    <span className={styles.cartBadge}>
                      {numCartItems}
                    </span>
                  )}
                </Link>
          </div>
        </div>    
    </nav>      
 )
}

export default NavBar