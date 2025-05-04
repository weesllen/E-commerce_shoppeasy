import styles from "./PaymentSection.module.css"

const PaymentSection = () => {
  return (
    <div className='col-md-4'>
    <div className={`card ${styles.card}`}>
        <div className='card-header' style={{background :'#6050DC',color:'white'}}>
           <h5>Payment Options</h5> 
        </div>
        <div className='card-body'>
            {/*Paypal Button*/}
            <button className={`btn btn-primary w-100 mb-3 ${styles.paypalButton}`} id='paypal-button'>
            <i className='bi bi-paypal'></i> Pague com o PayPal
            </button>

            {/*FlutterWave Button*/}
            <button className={`btn btn-primary w-100 mb-3 ${styles.flutterwaveButton}`} id='flutterwave-button'>
            <i className='bi bi-credit-card'></i> Pague com o Flutterwave
            </button>
        </div>
        </div>   
      
    </div>
  )
}

export default PaymentSection
