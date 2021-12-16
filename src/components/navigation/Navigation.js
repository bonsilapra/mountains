import React, { useState, useEffect } from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import { Link , Outlet} from "react-router-dom";
// import { RegisterModal } from '../commons/RegisterModal';
// import { LoginModal } from '../commons/LoginModal';
// import myAxios from '../../utilities/myAxios';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import './Navigation.css';



function Navigation() {
    const [click, setClick] = useState(false);
    const [visLogin, setVisLogin] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showLogin = () => {
        if (window.innerWidth <= 960) {
            setVisLogin(false);
        } else {
            setVisLogin(true);
        }
    };

    useEffect(() => {
        showLogin();
    }, []);

    window.addEventListener('resize', showLogin);
        // this.state = {showRegister: false};
        // this.setRegisterModal = this.setRegisterModal.bind(this);
        // this.state = {showLogin: false}
        // this.setLoginModal = this.setLoginModal.bind(this);

    // setRegisterModal(showRegister) {
    //     this.setState({ showRegister: showRegister});
    // }

    // setLoginModal(showLogin) {
    //     this.setState({ showLogin: showLogin});
    // }

    // logout() { 
    //     myAxios.get(`logout`)
    //         .then((response) => {
    //             sessionStorage.removeItem('userLogin');
    //             window.location.reload()
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // }


        // const userLogin = JSON.parse(sessionStorage.getItem('userLogin'))

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
                        <Nav.Link as={Link} to="/about" onClick={closeMobileMenu}
                        className='nav-links'>O mnie</Nav.Link>
                    </Nav>   

                    <Nav style={{marginLeft: "auto"}}>
                        {visLogin && <ButtonGroup>
                            <DropdownButton align="end" variant="light" as={ButtonGroup} title="Logowanie" id="bg-nested-dropdown">
                                <Dropdown.Item eventKey="1" >Zaloguj </Dropdown.Item>
                                <Dropdown.Item eventKey="2" >Zarejestruj</Dropdown.Item>
                            </DropdownButton>
                        </ButtonGroup>
                    }
                    </Nav>
                    {/* <Nav style={{marginLeft: "auto"}}>
                        {userLogin==null &&
                            <ButtonGroup>
                                <DropdownButton align="end" variant="light" as={ButtonGroup} title="Logowanie" id="bg-nested-dropdown">
                                    <Dropdown.Item eventKey="1" onClick={()=> this.setLoginModal(true)}>Zaloguj</Dropdown.Item>
                                    <Dropdown.Item eventKey="2" onClick={()=> this.setRegisterModal(true)}>Zarejestruj</Dropdown.Item>
                                </DropdownButton>
                            </ButtonGroup>
                        }
                        {userLogin==null ||
                            <ButtonGroup>
                                <DropdownButton align="end" variant="light" as={ButtonGroup} title={userLogin.email} id="bg-nested-dropdown">
                                    <Dropdown.Item eventKey="1" onClick={()=> this.logout()}>Wyloguj</Dropdown.Item>
                                </DropdownButton>
                            </ButtonGroup>
                        }
                    </Nav> */}
                    <Nav className= "menu-icon" style={{marginLeft: "auto", paddingRight: "10px"}} onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </Nav>
                    </Navbar.Collapse>
                </Navbar> 
                {/* <RegisterModal show={this.state.showRegister} setOpen={this.setRegisterModal}/>
                <LoginModal show={this.state.showLogin} setOpen={this.setLoginModal}/> */}
                <div>
                    
                </div>
            </div>
            <Outlet />
        </div>
    );
}

export default Navigation;

