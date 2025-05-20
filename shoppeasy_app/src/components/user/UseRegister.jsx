import { useState } from "react"
import api from "../../api"
import { toast } from "react-toastify"
import { useLocation, useNavigate } from "react-router-dom"


const UseRegister = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [formData,setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password1: '',
    password2: '',
    city: '',
    state: '',
    address: '',
    phone: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post('UserRegister/',formData)
    .then(res => {
      console.log(res.data)
      toast.success('Usuario cadastrado com sucesso')
      
      const from = location?.state?.from.pathname || '/login';
      navigate(from,{replace:true});
    })

    .catch(err => {
      console.log(err.message)
      toast.error('Erro ao realizar cadastro, Tente novamente!')
    })
  }


  return (
    <div className="container mt-5 mb-5">
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card shadow">
          <div className="card-header text-center" style={{backgroundColor: '#0E689F', color:'white'}}>
            <h4>Cadastro de Usuário</h4>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">

                  <label>Nome</label>
                  <input type="text" name="first_name" 
                  value={formData.first_name} 
                  onChange={(e) =>setFormData({ ...formData, [e.target.name]: e.target.value })}
                  className="form-control" />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Sobrenome</label>
                  <input type="text" name="last_name" 
                  value={formData.last_name} 
                  onChange={(e) =>setFormData({ ...formData, [e.target.name]: e.target.value })} 
                  className="form-control" />
                </div> 
              </div>

              <div className="mb-3">
                <label>Usuário</label>
                <input type="text" name="username" 
                value={formData.username} 
                onChange={(e) =>setFormData({ ...formData, [e.target.name]: e.target.value })} 
                className="form-control" />
              </div>

              <div className="mb-3">
                <label>Email</label>
                <input type="email" name="email" 
                value={formData.email} 
                onChange={(e) =>setFormData({ ...formData, [e.target.name]: e.target.value })} 
                className="form-control" />
              </div>

              <div className="mb-3">
                <label>Cidade</label>
                <input type="text" name="city" 
                value={formData.city} 
                onChange={(e) =>setFormData({ ...formData, [e.target.name]: e.target.value })} 
                className="form-control" />
              </div>

              <div className="mb-3">
                <label>Estado</label>
                <input type="text" name="state" 
                value={formData.state} 
                onChange={(e) =>setFormData({ ...formData, [e.target.name]: e.target.value })} 
                className="form-control" />
              </div>

              <div className="mb-3">
                <label>Endereço</label>
                <input type="text" name="address" 
                value={formData.address} 
                onChange={(e) =>setFormData({ ...formData, [e.target.name]: e.target.value })} 
                className="form-control" />
              </div>

              <div className="mb-3">
                <label>Telefone</label>
                <input type="text" name="phone" 
                value={formData.phone} 
                onChange={(e) =>setFormData({ ...formData, [e.target.name]: e.target.value })} 
                className="form-control" />
              </div>

              <div className="mb-3">
                <label>Senha</label>
                <input type="password" name="password1" 
                value={formData.password1} 
                onChange={(e) =>setFormData({ ...formData, [e.target.name]: e.target.value })} 
                className="form-control" />
              </div>

              <div className="mb-3">
                <label>Confirme a Senha</label>
                <input type="password" name="password2" 
                value={formData.password2} 
                onChange={(e) =>setFormData({ ...formData, [e.target.name]: e.target.value })} 
                className="form-control" />
              </div>
              <button type="submit" className="btn w-100" style={{ backgroundColor: '#0E689F', color: 'white', borderColor: '#0E689F' }}>Cadastrar</button>
            </form>
          </div>
          <div className="card-footer text-center">
            Já tem conta? <a href="/login">Entrar</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default UseRegister

