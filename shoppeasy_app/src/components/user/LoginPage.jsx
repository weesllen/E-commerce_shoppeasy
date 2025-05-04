import React, {  useContext, useState } from 'react'
import api from '../../api'
import { useLocation, useNavigate } from 'react-router-dom'
import './LoginPage.css'
import { AuthContext } from '../context/AuthContext'

const LoginPage = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { setIsAuthenticated } = useContext(AuthContext)

    const UserInfo = {username,password}

    function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
        
        api.post('token/',UserInfo)
        .then(res => {
            console.log(res.data)
            localStorage.setItem('access',res.data.access)
            localStorage.setItem('refresh',res.data.refresh)
            setUsername('')
            setPassword('')
            setLoading(false)
            setIsAuthenticated(true)
            setError('')

            const from = location?.state?.from.pathname || '/';
            navigate(from,{replace:true});
        })
        
        .catch(err => {
            console.log(err.message)
            setError(err.message)
            setLoading(false)
    })
    }

  return (
    <div className='login-container my-5'>
        <div className='login-card shadow'>
            {error && <Error error={error} />}
            <h2 className='login-title'> Bem-Vindo!</h2>
            <p className='login-subtitle'> Por favor, acesse dua conta</p>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="username" className='form-label'>Usuário</label>
                    <input type="username" value={username}
                    onChange={(e) => setUsername(e.target.value)}
                     className='form-control' id='email' placeholder='Digite seu e-mail' />
                </div>
                <div className='mb-3'>
                    <label htmlFor="password" className='form-label'>Senha</label>
                    <input type="password" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                     className='form-control' id='password' placeholder='Digite sua senha' />
                </div>

                    <button type='submit' className='btn btn-primary w-100' disabled={loading}>Entrar</button>
            </form>
            <div className='login-footer'>
                <p><a href="#">Esqueceu sua senha?</a></p>
                <p>Não possue cadastro? <a href="#">Cadastre-se</a></p>
            </div>
        </div>
      
    </div>
  )
}

export default LoginPage
