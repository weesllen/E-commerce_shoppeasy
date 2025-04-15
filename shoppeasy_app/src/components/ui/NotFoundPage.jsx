import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <header className='py-3' style={{backgroundColor: '#0E689F'}}>
          <div className='container  px-4 px-lg-5 my-5'>
            <div className='text-center text-white'>
                <h1 className='display-4 fw-bold'>Pagina não encontrada!!</h1>
                <p className='lead fw-normal text-white-75 mb-4'>A pagina que você tentou acessar não existe</p>
                <Link to ='/' className='btn btn-light btn-lg rounded-pill px-4 py-2'>Inicio</Link>
            </div>  
          </div>
      </header>
  )
}

export default NotFoundPage
