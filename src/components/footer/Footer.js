import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className='footer-container'>
            <div className='footer-links'>
                <div className='footer-link-wrapper'>
                    <h4>Górskie wycieczki</h4>
                        <div className='footer-link-items'>
                            <Link to='/'>Strona główna</Link>
                            <Link to='/trips'>Wycieczki</Link>
                            <Link to='/Peaks'>Szczyty</Link>
                            <Link to='/mountainRanges'>Pasma górskie</Link>
                            <Link to='/regions'>Regiony</Link>
                            <Link to='/attractions'>Atrakcje</Link>
                            <Link to='/about'>O mnie</Link>
                        </div>
                    <h4>Kontakt</h4>
                        <div className='footer-link-items'>
                            <a href="mailto:asia.kgp@gmail.com">E-mail</a>
                            <a href="https://www.instagram.com/bonsilapra/"
                            target='_blank' 
                            rel='noreferrer'
                            aria-label='Instagram'
                            > 
                                Instagram
                            </a>
                        </div>
                </div>
            </div>
            <section className='social-media'>
                <div className='social-media-wrap'>
                    <div>
                        <Link to='/' className='social-logo'>
                            <i className='fas fa-mountain' />
                        </Link>
                    </div>
                    <small className='website-rights'>Copyright© {new Date().getFullYear()} - All Rigths reserved</small>
                    <div>
                        <a href="https://www.instagram.com/bonsilapra/"
                            target='_blank' 
                            rel='noreferrer'
                            aria-label='Instagram'
                            className='social-logo'
                        >
                            <i className='fab fa-instagram' />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Footer;