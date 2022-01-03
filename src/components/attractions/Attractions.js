import React from 'react';
import backgroundImage from '../../images/attractionsBackground.jpg';
import { Link } from "react-router-dom";
import { Background } from '../commons/Background';
import myAxios from '../../utilities/myAxios';
import Alert from 'react-bootstrap/Alert';
import { MyButton } from '../button/MyButton';
import Button from 'react-bootstrap/Button';
import { AttractionsAddModal } from './AttractionsAddModal';
import { AttractionsEditModal } from './AttractionsEditModal';
import Modal from 'react-bootstrap/Modal';
import './Attractions.css';
import '../commons/Commons.css';



export class Attractions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {attraction: [], isError: false, show: false, add: false, edit: false, editId:"", id:"", editObject:{}}
        this.setAdd = this.setAdd.bind(this);
        this.setEdit = this.setEdit.bind(this);
        this.addNewAttraction = this.addNewAttraction.bind(this);
        this.editAttraction = this.editAttraction.bind(this)
        window.scrollTo(0,0)
    }


    setShow(show, id) {
        this.setState({ show: show, id: id});
    }

    setAdd(add) {
        this.setState({ add: add});
    }
    
    setEdit(edit, id, obj) {
        this.setState({ edit: edit, editId: id, editObject:obj})
    }

    addNewAttraction (name, description, region) {
        myAxios.post(`attraction`,{
            name: name,
            description: description,
            region: region
        })
        .then((response) => {
            this.setState({attraction: [...this.state.attraction, response.data]});
            this.setAdd(false);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    editAttraction (name, description, region) {
        myAxios.put(`attraction`,{
            id: this.state.editId,
            name: name,
            description: description,
            region: region
        })
        .then((response) => {
            this.setState({attraction: this.state.attraction.map((element) => {
                if (element.id !== this.state.editId) {
                    return element
                } else {return response.data}
                
            })})
            this.setEdit(false);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    handleDelete() {
        myAxios.delete(`attraction/`+ this.state.id)
        .then((response) => {
            this.setState(
                {attraction: this.state.attraction.filter(element => {
                    return element.id!==this.state.id
                })
            });
            this.setShow(false);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    componentDidMount() {
        myAxios.get(`attraction`)
            .then(res => {
                const attraction = res.data;
                this.setState({ attraction });
                }
            )
            .catch(error => {
                this.setState({ isError: true });
                }
            )
        }


    render() {

        const userLogin = JSON.parse(sessionStorage.getItem('userLogin'))

        return (
            <>
            <Background image={backgroundImage}/>
            <div className="page-title">
                ATRAKCJE
            </div>
            <div className='page-container' >
                <h1>Miejsca warte zobaczenia</h1>
                <br />
                {this.state.isError &&
                    <Alert variant="danger" style = {{textAlign: "center", width: "100%"}}> 
                    Backend nie działa!!!
                    </Alert>
                }
                {this.state.attraction &&
                this.state.attraction.sort(function compare(a, b) {
                    if (a.name<b.name)
                        return -1
                    if (a.name>b.name)
                        return 1
                    return 0
                    })
                    .map((atrakcje) =>
                        <>
                            <h4>
                                {atrakcje.name}   
                            </h4>
                            <p style={{whiteSpace: "pre-wrap"}}>{atrakcje.description}</p>
                            {atrakcje.region != null ? 
                            (<h6>Region: <Link to={"/regions"}
                                state={{ regionId: atrakcje.region.id }}
                                >
                                    {atrakcje.region.name}
                                </Link> </h6>) : (<p></p>)}
                            {userLogin!=null && userLogin.roles.includes("ADMIN") &&
                                <section className='title-with-buttons'>
                                    <div>      
                                        <MyButton 
                                            buttonStyle='btn--primary'
                                            onClick={(event)=> {this.setEdit(true, atrakcje.id, atrakcje); event.stopPropagation()}}>
                                                <i className="fas fa-pen"></i>                   
                                        </MyButton>
                                    </div>
                                    <div>
                                        <MyButton 
                                            buttonStyle='btn--outline'
                                            onClick={(event)=> {this.setShow(true, atrakcje.id); event.stopPropagation()}}>
                                                <i className="fas fa-trash"></i>                   
                                        </MyButton>
                                        </div>
                                </section>
                            }
                            <hr className="rounded" />
                        </>
                    )
                }
                {userLogin!=null && userLogin.roles.includes("ADMIN") &&
                <h5 style={{marginBottom: "15px"}}>                    
                    <MyButton 
                        buttonStyle='btn--primary'
                        onClick={()=> this.setAdd(true)}>
                            DODAJ 
                            <i style= {{"paddingLeft":"10px"}} className="fas fa-plus"></i>                   
                    </MyButton>
                </h5>
                }
            </div>
            <AttractionsAddModal show={this.state.add} setOpen={this.setAdd} addNewAttraction={this.addNewAttraction}/>
            <AttractionsEditModal show={this.state.edit} setOpen={this.setEdit} editAttraction={this.editAttraction} editObject={this.state.editObject}/>
            
            <Modal show={this.state.show} onHide={()=> this.setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Usuwanie</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Czy na pewno chcesz usunąć?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=> this.setShow(false)}>Wyjście</Button>
                        <Button variant="primary" onClick={()=> this.handleDelete()}>Usuń</Button>
                    </Modal.Footer>
                </Modal>
            
            </>
        );
    }
}


