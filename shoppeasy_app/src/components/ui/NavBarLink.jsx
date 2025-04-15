import { Link } from "react-router-dom"

const NavBarLink = () => {
  return (
    <div>
    <ul className="navbar-nav ms-auto mb-2 mb-1g-0">
        <li className="nav-item" >
         <a className="nav-link active fw-semibold" href="#!">Home</a>
        </li>
        <li className="nav-item">
          <Link to="/profile" className="nav-link fw-semibold" href="#!">Shop</Link>
        </li>
        < li className="nav-item" >
          <a className="nav-link fw-semibold" href="#!">About</a>
        </li>
        < li className="nav-item">
          <a className="nav-link fw-semibold" href="#!">Contact</a>
        </li>
        </ul>
    </div>
  )
}

export default NavBarLink
