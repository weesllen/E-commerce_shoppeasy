import React from 'react'
import styles from './Header.module.css'

const Headers = () => {
  return (
      <header className={styles.heroSection}>
          <div className={styles.gradientOverlay}></div>
          <div className='container px-4 px-lg-5 position-relative' style={{ zIndex: 2 }}>
            <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>
                  Bem-vindo à <span className={styles.brandHighlight}>ShoppEasy</span>
                </h1>
                <p className={styles.heroSubtitle}>
                  Descubra produtos incríveis com os melhores preços e facilidade de compra
                </p>
                <div className={styles.heroCta}>
                  <a href='#shop' className={styles.primaryButton}>
                    <span>Explorar Produtos</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <a href='#featured' className={styles.secondaryButton}>
                    Ver Ofertas
                  </a>
                </div>
                
                {/* Elementos decorativos */}
                <div className={styles.floatingIcons}>
                  <span className={styles.icon1}>🎁</span>
                  <span className={styles.icon2}>⭐</span>
                  <span className={styles.icon3}>🛒</span>
                  <span className={styles.icon4}>💳</span>
                </div>
            </div>  
          </div>
      </header>
  )
}

export default Headers

