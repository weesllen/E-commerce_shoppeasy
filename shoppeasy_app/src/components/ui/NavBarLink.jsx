import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";

const NavBarLink = () => {

    const { isAuthenticated,username,setIsAuthenticated } = useContext(AuthContext);


    function logout(){
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      setIsAuthenticated(false)
    }

  return (
    <ul className="navbar-nav ms-auto mb-2 mb-1g-0">
    {isAuthenticated ?
       <>
    {/*Home*/}
      <li className="nav-item" >
          <NavLink
          to = '/'
          className={({ isActive }) =>
            isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"
        }
        end
          >
            Home
          </NavLink>
        </li>   


        {/*Contato*/}
        <li className="nav-item" >
          <NavLink
          to = '/contact'
          className={({ isActive }) =>
            isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"
        }
        end
          >
            Contato
          </NavLink>
        </li> 


       <li className="nav-item" >
         <NavLink
         to = '/profile'
         className={({ isActive }) =>
           isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"
       }
       end
         >
           {` Hi ${username}`}
         </NavLink>
       </li>


       <li className="nav-item" onClick={logout} >
         <NavLink
         to = '/'
         className={({ isActive }) =>
           isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"
       }
       end
         >
           Logout
         </NavLink>
       </li>
       </>

       :

       <>

      {/*Home*/}
      <li className="nav-item" >
            <NavLink
          to = '/'
          className={({ isActive }) =>
            isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"
        }
        end
          >
            Home
          </NavLink>
        </li>   


        {/*Contato*/}
        <li className="nav-item" >
          <NavLink
          to = '/contact'
          className={({ isActive }) =>
            isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"
        }
        end
          >
            Contato
          </NavLink>
        </li> 

       {/*login*/}
       <li className="nav-item" >
          <NavLink
          to = '/login'
          className={({ isActive }) =>
            isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"
        }
        end
          >
            Login
          </NavLink>
        </li>

        {/*Cadastro*/}
        <li className="nav-item" >
          <NavLink
          to = '/register'
          className={({ isActive }) =>
            isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"
        }
        end
          >
            Cadastre-se
          </NavLink>
        </li>       
       </>
    }
    </ul>
  )
}

export default NavBarLink
