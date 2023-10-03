import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import style from './Footer.module.css'

export default function Footer(){


    return(
        <footer className={style.footer}>
            <ul className={style.social_list}>
                <li><FaFacebook /></li>
                <li><FaInstagram /></li>
                <li><FaLinkedin /></li>
                <p className={style.copy_right}><span>Costs</span>&copy; 2023</p>
            </ul>
        </footer>
    )
}