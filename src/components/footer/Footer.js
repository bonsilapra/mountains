import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className='footer-container'>
            <div class='footer-links'>
                <div className='footer-link-wrapper'>
                    <h4>Górskie wycieczki</h4>
                        <div className='footer-link-items'>
                            <Link to='/'>Strona główna</Link>
                            <Link to='/'>KGP - lista</Link>
                            <Link to='/'>Wycieczki</Link>
                            <Link to='/'>Pasma górskie</Link>
                            <Link to='/'>Regiony</Link>
                            <Link to='/'>O mnie</Link>
                        </div>
                    <h4>Kontakt</h4>
                        <div class='footer-link-items'>
                            <a href="mailto:asia.kgp@gmail.com">E-mail</a>
                            <a href="https://www.instagram.com/bonsilapra/"
                            target='blank'
                            aria-label='Instagram'
                            > 
                                Instagram
                            </a>
                        </div>
                </div>
            </div>
            <section class='social-media'>
                <div class='social-media-wrap'>
                    <div>
                        <Link to='/' className='social-logo'>
                            <i class='fas fa-mountain' />
                        </Link>
                    </div>
                    <small class='website-rights'>Copyright© {new Date().getFullYear()} - All Rigths reserved</small>
                    <div>
                        <a href="https://www.instagram.com/bonsilapra/"
                            class='social-icon-link instagram'
                            target='blank'
                            aria-label='Instagram'
                            className='social-icon-link'
                        >
                            <i class='fab fa-instagram' />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Footer;