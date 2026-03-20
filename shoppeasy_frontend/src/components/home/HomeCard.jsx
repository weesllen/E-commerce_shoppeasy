import styles from './HomeCard.module.css'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../api'

const HomeCard = ({product}) => {
    const imageSrc = product.image?.startsWith('http') ? product.image : `${BASE_URL}${product.image}`

    return (
        <Link to={`/products/${product.slug}`} className={styles.link}>
            <div className={styles.card}>
                <div className={styles.cardImgWrapper}>
                    <img 
                        src={imageSrc}
                        className={styles.cardImgTop}
                        alt={product.name}
                    />   
                </div>
                <div className={styles.cardBody}>
                    <h5 className={`${styles.cardTitle} mb-1`}>{product.name}</h5> 
                    <h6 className={styles.cardText}>{`R$ ${product.price}`}</h6>
                </div>
            </div>
        </Link>
    )
}

export default HomeCard
