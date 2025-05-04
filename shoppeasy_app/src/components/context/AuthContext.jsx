import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(false)

export function AuthProvider({children}) {

    const [ isAuthenticated, setIsAuthenticated] = useState(false)
    const [username,setUsername] = useState('')

    const handleAuth = () => {
        const token = localStorage.getItem('access')
        if(token){
            const decoded = jwtDecode(token)
            const expiry_Date = decoded.exp
            const current_time = Date.now() / 100

            if(expiry_Date >= current_time){
                setIsAuthenticated(true)
            }
        }
    }

    useEffect(function(){
        handleAuth
    },[])

    const authValue = {isAuthenticated}

    return <AuthContext.Provider value = {authValue}>
        {children}
        </AuthContext.Provider>
}