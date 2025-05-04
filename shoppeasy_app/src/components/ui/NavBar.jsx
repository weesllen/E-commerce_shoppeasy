import { FaCartShopping } from 'react-icons/fa6';
import { Link } from 'react-router-dom'
import styles from './NavBar.module.css'
import NavBarLink from './NavBarLink';

const NavBar = ({numCartItems}) => {
    return (
        <nav className = {` navbar navbar-expand-lg navbar-light bg=white shadow-sm py-3 ${styles.stickyNavBar}`}>
          <div className="container">
            <Link className="navbar-brand fw-bold text-uppercase" to="/">SHOPPEASY</Link>
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
                <Link to= '/cart' className={`btn-dark ms-3 rounded-pill position-relative ${styles.responsivecart}`}>
                <FaCartShopping/>
                {numCartItems == 0 || <span
                className='position-absolute top 0 start 100 translate-middle badge rounded-pill'
                    style={{ fontSize: '0.85rem', padding: '0.5em', backgroundColor: '#6050DC' }}
                >
                    {numCartItems}
                </span>}
            </Link>
          </div>
        </div>    
    </nav>      
 )
}

export default NavBar