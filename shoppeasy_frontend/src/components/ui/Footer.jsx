import { FaFacebook, FaTwitter, FaInstagram, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className='container'>
        <div className={styles.footerContent}>
          {/* Logo e descrição */}
          <div className={styles.footerSection}>
            <h3 className={styles.footerBrand}>
              <span className={styles.brandIcon}>🛍️</span>
              SHOPPEASY
            </h3>
            <p className={styles.footerDescription}>
              A melhor experiência de compras online com os melhores preços e produtos de qualidade.
            </p>
            <div className={styles.socialIcons}>
              <a href='#' className={styles.socialIcon} aria-label="Facebook">
                <FaFacebook/>
              </a>    
              <a href='#' className={styles.socialIcon} aria-label="Twitter">
                <FaTwitter/>
              </a>    
              <a href='#' className={styles.socialIcon} aria-label="Instagram">
                <FaInstagram/>
              </a>
            </div>
          </div>

          {/* Links rápidos */}
          <div className={styles.footerSection}>
            <h4 className={styles.footerTitle}>Links Rápidos</h4>
            <ul className={styles.footerLinks}>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/products'>Produtos</Link></li>
              <li><a href='#about'>Sobre Nós</a></li>
              <li><Link to='/contact'>Contato</Link></li>
            </ul>
          </div>

          {/* Atendimento */}
          <div className={styles.footerSection}>
            <h4 className={styles.footerTitle}>Atendimento</h4>
            <ul className={styles.footerLinks}>
              <li><a href='#faq'>FAQ</a></li>
              <li><a href='#shipping'>Envios</a></li>
              <li><a href='#returns'>Devoluções</a></li>
              <li><a href='#terms'>Termos de Uso</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className={styles.footerSection}>
            <h4 className={styles.footerTitle}>Newsletter</h4>
            <p className={styles.newsletterText}>
              Receba ofertas exclusivas e novidades!
            </p>
            <div className={styles.newsletterForm}>
              <input 
                type="email" 
                placeholder="Seu e-mail"
                className={styles.newsletterInput}
              />
              <button className={styles.newsletterButton}>
                Inscrever
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            &copy; 2025 ShoppEasy. Todos os direitos reservados.
          </p>
          <p className={styles.madeWith}>
            Feito com <FaHeart className={styles.heartIcon}/> por Wesley
          </p>
        </div>
      </div>   
    </footer>  
  )
}

export default Footer
