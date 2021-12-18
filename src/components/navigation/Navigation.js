import React, { useState, useEffect } from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import { Link , Outlet} from "react-router-dom";
import { RegisterModal } from '../commons/RegisterModal';
import { LoginModal } from '../commons/LoginModal';
import myAxios from '../../utilities/myAxios';
import { Button } from './../button/Button';
import './Navigation.css';


function Navigation() {
    const [click, setClick] = useState(false);
    const [visLogin, setVisLogin] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showLoginButton = () => {
        if (window.innerWidth <= 960) {
            setVisLogin(false);
        } else {
            setVisLogin(true);
        }
    };
    useEffect(() => {
        showLoginButton();
    }, []);
    window.addEventListener('resize', showLoginButton);

    const [showRegister, setRegisterModal] = useState(false);
    const [showLogin, setLoginModal] = useState(false);


    const showRegisterModal = () => setRegisterModal(!showRegister);
    const showLoginModal = () => setLoginModal(!showLogin);

    const logout = () => 
        myAxios.get(`logout`)
            .then((response) => {
                sessionStorage.removeItem('userLogin');
                window.location.reload()
            })
            .catch((error) => {
                console.log(error);
            })

        const userLogin = JSON.parse(sessionStorage.getItem('userLogin'))

    return (
        <div>
            <div> 
                <Navbar bg="light" variant="light" className = "navbar" style = {{
                    top: 5,
                    left: 5,
                    right: 5,}}>
                    <Navbar.Brand as={Link} to="/" className= "navbar-logo"
                    onClick={closeMobileMenu}> Start <i style= {{"paddingLeft":"10px"}} className="fas fa-mountain" 
                    /></Navbar.Brand>
                    <Navbar.Collapse>
                    <Nav className={click ? 'nav-menu active' : 'nav-menu'}>
                        <Nav.Link as={Link} to="/kgpList" onClick={closeMobileMenu}
                        className='nav-links'>KGP - lista</Nav.Link>
                        <Nav.Link as={Link} to="/trips" onClick={closeMobileMenu}
                        className='nav-links'>Wycieczki</Nav.Link>
                        <Nav.Link as={Link} to="/mountainRanges" onClick={closeMobileMenu}
                        className='nav-links'>Pasma górskie</Nav.Link>
                        <Nav.Link as={Link} to="/regions"onClick={closeMobileMenu}
                        className='nav-links' >Regiony</Nav.Link>
                        <Nav.Link as={Link} to="/attractions" onClick={closeMobileMenu}
                        className='nav-links' >Atrakcje</Nav.Link>
                        <Nav.Link as={Link} to="/about" onClick={closeMobileMenu}
                        className='nav-links'>O mnie</Nav.Link>
                        <Nav className='nav-links-mobile'>
                            {userLogin==null &&
                                <Button buttonStyle='btn--primary'
                                buttonSize='btn--large'
                                onClick={() => {closeMobileMenu(); showLoginModal()}}
                                >
                                    ZALOGUJ</Button>
                            }
                        </Nav>
                            <Nav className='nav-links-mobile'>
                            {userLogin==null &&
                                <Button buttonStyle='btn--outline'
                                buttonSize='btn--large'
                                onClick={() => {closeMobileMenu(); showRegisterModal()}}
                                >
                                    ZAREJESTRUJ</Button>
                            }
                        </Nav>
                        <Nav className='nav-links-mobile'>
                            {userLogin==null ||
                                <Button buttonStyle='btn--outline'
                                buttonSize='btn--large'
                                onClick={() => {closeMobileMenu(); logout()}}
                                >
                                    WYLOGUJ</Button>
                            }
                        </Nav>
                    </Nav>   
                    <Nav style={{marginLeft: "auto"}}>
                        {userLogin==null && visLogin && <Button buttonStyle='btn--primary'
                        onClick={showLoginModal}>
                            ZALOGUJ</Button>}
                        {userLogin==null && visLogin && <Button buttonStyle='btn--outline'
                        onClick={showRegisterModal}>
                            ZAREJESTRUJ</Button>}
                        {userLogin==null || (visLogin && <Button buttonStyle='btn--outline'
                        onClick={logout}>
                            WYLOGUJ</Button>)}
                    </Nav>
                    <Nav className= "menu-icon" style={{marginLeft: "auto", paddingRight: "10px"}} onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </Nav>
                    </Navbar.Collapse>
                </Navbar> 
                <RegisterModal show={showRegister} setOpen={showRegisterModal}/>
                <LoginModal show={showLogin} setOpen={showLoginModal}/>
            </div>
            <Outlet />
        </div>
    );
}

export default Navigation;

