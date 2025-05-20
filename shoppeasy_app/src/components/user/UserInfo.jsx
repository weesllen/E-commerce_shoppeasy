import styles from './UserInfo.module.css'
import pic from '../../assets/pic.jpg'

const UserInfo = ({userInfo}) => {

  return (
    <div className="container mt-4">
    <div className='row mb-4'>
      <div className={`col-md-3 py-3 ${styles.textCenter} text-center`}>
        <div className="card p-3">
          <img 
            src={pic} 
            alt="User Profile"
            className={`img-fluid rounded-circle mb-3 mx-auto ${styles.profileImage}`} 
          />
          <h4>{userInfo.first_name}</h4>
          <p className='text-muted'>{userInfo.email}</p>
          <button className='btn mt-2'style={{ background: '#0E689F', color: 'white' }}>
            Editar Perfil
          </button>
        </div>
      </div>

      <div className='col-md-9'>
        <div className='card h-100'>
          <div className='card-header' style={{ background: '#0E689F', color: 'white' }}>
            <h5 className="mb-0">Informações da Conta</h5>
          </div>
          <div className='card-body'>
            <div className='row'>
              <div className='col-md-6'>
                <p><strong>Nome completo:</strong> {`${userInfo.first_name} ${userInfo.last_name}`}</p>
                <p><strong>Email:</strong> {userInfo.email}</p>
                <p><strong>Telefone:</strong> {userInfo.phone}</p>
              </div>
              <div className='col-md-6'>
                <p><strong>Nome de usuário:</strong> {userInfo.username}</p>
                <p><strong>Cidade:</strong> {userInfo.city}</p>
                <p><strong>País:</strong> {userInfo.state}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
  )
}

export default UserInfo
