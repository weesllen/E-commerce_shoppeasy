import HomeCard from "./HomeCard"
import styles from './CardContainer.module.css'

const CardContainer = ({products}) => {
  return (
    <section className={styles.productsSection} id='shop'>
      <div className='container px-4 px-lg-5'>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Nossos <span className={styles.highlight}>Produtos</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Explore nossa seleção cuidadosamente escolhida de produtos incríveis
          </p>
        </div>

        <div className='row g-3 justify-content-center align-items-stretch'>
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`col-12 col-sm-6 col-lg-4 col-xl-3 ${styles.cardWrapper}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <HomeCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CardContainer
