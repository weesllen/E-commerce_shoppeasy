import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import api from "../../api";

export const AuthContext = createContext(false)

export function AuthProvider({children}) {

    const [ isAuthenticated, setIsAuthenticated] = useState(false)
    const [username,setUsername] = useState('')

    const handleAuth = () => {
        const token = localStorage.getItem('access')
        if(token){
            const decoded = jwtDecode(token)
            const expiry_Date = decoded.exp
            const current_time = Date.now() / 1000

            if(expiry_Date >= current_time){
                setIsAuthenticated(true)
            }
        }
    }

    function get_username(){
        api.get('get_username')
        .then( res => {
            setUsername(res.data.username)
        })

        .catch(err => {
            console.log(err.message)
    })
    }

    useEffect(function(){
        handleAuth()
        get_username()
    },[])

    const authValue = {isAuthenticated,setIsAuthenticated,username,get_username}

    return <AuthContext.Provider value = {authValue}>
        {children}
        </AuthContext.Provider>
}