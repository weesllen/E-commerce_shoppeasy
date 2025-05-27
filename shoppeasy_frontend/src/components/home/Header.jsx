import React from 'react'

const Headers = () => {
  return (
      <header className='py-5' style={{backgroundColor: '#0E689F'}}>
          <div className='container  px-4 px-lg-5 my-5'>
            <div className='text-center text-white'>
                <h1 className='display-4 fw-bold'>Bem-Vindos a loja virtual ShoppEasy</h1>
                <p className='lead fw-normal text-white-75 mb-4'>Encontre produtos do jeito mais facil e barato do Brasil</p>
                <a href='#shop' className='btn btn-light btn-lg rounded-pill px-4 py-2'>Compre Aqui</a>
            </div>  
          </div>
      </header>
  )
}

export default Headers

