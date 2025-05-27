import { FaPhoneAlt } from 'react-icons/fa';

const ContactUs = () => {
  return (
     <div className="container mt-5">
      <div className="card shadow mb-5">
        <div className="card-head bg-primary text-white p-3 rounded-top d-flex justify-content-between align-items-center"
         >
          <div>
            <h4 className="mb-0">Contato - Shoppeasy</h4>
            <small>Estamos prontos para atender você!</small>
          </div>
          <FaPhoneAlt size={24} color="white" />
        </div>
        <div className="card-body">
          <p className="mb-2">
            <strong>Telefone (Atendimento Geral):</strong><br />
            <a href="tel:+5511999999999" className="text-decoration-none text-dark">
              (11) 99999-9999
            </a>
          </p>
          <p className="mb-2">
            <strong>Telefone (Suporte Técnico):</strong><br />
            <a href="tel:+5511988888888" className="text-decoration-none text-dark">
              (11) 98888-8888
            </a>
          </p>
          <p className="mb-0">
            <strong>Email - Ouvidoria:</strong><br />
            <a href="mailto:ouvidoria@shoppeasy.com" className="text-decoration-none text-dark">
              ouvidoria@shoppeasy.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ContactUs