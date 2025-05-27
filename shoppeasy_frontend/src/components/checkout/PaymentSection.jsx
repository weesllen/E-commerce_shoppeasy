import api from "../../api"
import styles from "./PaymentSection.module.css"



const PaymentSection = () => {

  const cart_code = localStorage.getItem('cart_code')
  

  function paypalPayment(){
    api.post('initiate_paypal_payment/',{cart_code})
    .then(res =>{
      if(res.data.approval_url){
        window.location.href = res.data.approval_url
      }
  })

  .catch(err=>{
    console.error('Error initiating payments:',err.message);
  })
}


  return (
    <div className='col-md-4'>
    <div className={`card ${styles.card}`}>
        <div className='card-header'style={{background :'#0E689F',color:'white'}}>
           <h5>Opções de pagamento</h5> 
        </div>
        <div className='card-body'>
            {/*Paypal Button*/}
            <button className={`btn btn-primary w-100 mb-3 ${styles.paypalButton}`} onClick={paypalPayment} id='paypal-button'>
            <i className='bi bi-paypal'></i> Pague com o PayPal
            </button>
        </div>
        </div>   
      
    </div>
  )
}

export default PaymentSection
