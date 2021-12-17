import React from 'react'
import myAxios from '../../utilities/myAxios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './Modal.css';

export class LoginModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isInvalid: {
                email: false,
                password: false,
            },
            showLogin: false,
            form: {
                email: "",
                password: "",
            },
        };
    }


    handleEmail(event) {
        this.setState(
            {
                form:
                {
                    ...this.state.form,
                    email: event.target.value.replaceAll(" ", "")
                },
                isInvalid: {
                    ...this.state.isInvalid,
                    email: event.target.value.replaceAll(" ", "").match(/^[a-z0-9._-]{2,}@[a-z0-9._-]{2,}\.[a-z]{2,}$/g) == null
                }
            }
        );
    }

    handlePassword(event) {
        let userPassword = event.target.value;
        let invalidPassword = true;
        if
            (/[a-z]/.test(userPassword) &&
            /[A-Z]/.test(userPassword) &&
            /[0-9]/.test(userPassword) &&
            /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(userPassword) &&
            /^[A-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/.test(userPassword)
        ) {
            invalidPassword = false
        }
        this.setState(
            {
                form: {
                    ...this.state.form,
                    password: event.target.value
                },
                isInvalid: {
                    ...this.state.isInvalid,
                    password: invalidPassword
                }
            }
        )
    }


    login() {
        myAxios.post(`login`, {
            email: this.state.form.email,
            password: this.state.form.password,
        })
            .then((response) => {
                console.log(response);
                sessionStorage.clear();
                sessionStorage.setItem('userLogin', JSON.stringify(response.data));
                let userLogin = JSON.parse(sessionStorage.getItem('userLogin'));
                console.log(userLogin)
                this.props.setOpen(false);
                window.location.reload()
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <>
                <Modal show={this.props.show} onHide={() => this.props.setOpen(false)}>
                    <Modal.Header closeButton >
                        <Modal.Title>Logowanie</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Zaloguj się:</p>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="E-mail"
                                    value={this.state.form.email}
                                    onChange={(event) => this.handleEmail(event)}
                                    isInvalid={this.state.isInvalid.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Podaj adres e-mail.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Hasło</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Hasło"
                                    value={this.state.form.password}
                                    onChange={(event) => this.handlePassword(event)}
                                    isInvalid={this.state.isInvalid.password}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.props.setOpen(false)}>Wyjście</Button>
                        <Button type="submit" 
                            disabled={
                                this.state.isInvalid.email || 
                                this.state.isInvalid.password || 
                                !this.state.form.email.length || 
                                !this.state.form.password.length
                            } variant="primary" className={"primaryButton"} onClick={() => this.login()}>
                            Zaloguj
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}