import React from 'react';
import backgroundImage from '../../images/attractionsBackground.jpg';
import { Background } from '../commons/Background';
import myAxios from '../../utilities/myAxios';
import Alert from 'react-bootstrap/Alert';
import { MyButton } from '../button/MyButton';
import Button from 'react-bootstrap/Button';
import { AttractionsAddModal } from './AttractionsAddModal';
import Modal from 'react-bootstrap/Modal';
import './Attractions.css';



import '../commons/Commons.css';



export class Attractions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {attraction: [], isError: false, show: false, add: false, edit: false, editId:"", id:""}
        this.setAdd = this.setAdd.bind(this);
        this.setEdit = this.setEdit.bind(this);
        this.addNewAttraction = this.addNewAttraction.bind(this);
        this.editAttraction = this.editAttraction.bind(this)
    }


    setShow(show, id) {
        this.setState({ show: show, id: id});
    }

    setAdd(add) {
        this.setState({ add: add});
    }
    
    setEdit(edit, id) {
        this.setState({ edit: edit, editId: id})
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
        myAxios.get(`http://localhost:8080/attraction`)
            .then(res => {
                console.log(res);
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
        return (
            <>
            <Background image={backgroundImage}/>
            <div className="page-title">
                ATRAKCJE
            </div>
            <div className='page-container'>
                <h1>Miejsca warte zobaczenia</h1>
                {this.state.isError &&
                    <Alert variant="danger" style = {{textAlign: "center", width: "100%"}}> 
                    Backend nie działa!!!
                    </Alert>
                }
                {this.state.attraction &&
                this.state.attraction.sort(function compare(a, b) {
                    if (a.id<b.id)
                        return -1
                    if (a.id>b.id)
                        return 1
                    return 0
                    })
                    .map((atrakcje) =>
                        <>
                            <h4>
                                {atrakcje.name}   
                            </h4>
                            <section className='title-with-buttons'>
                                <div>      
                                    <MyButton 
                                        buttonStyle='btn--primary'
                                        onClick={(event)=> {this.setEdit(true, atrakcje.id); console.log(event); event.stopPropagation()}}>
                                            <i class="fas fa-pen"></i>                   
                                    </MyButton>
                                </div>
                                <div>
                                    <MyButton 
                                        buttonStyle='btn--outline'
                                        onClick={(event)=> {this.setShow(true, atrakcje.id); event.stopPropagation()}}>
                                            <i class="fas fa-trash"></i>                   
                                    </MyButton>
                                    </div>
                            </section>
                            <p>{atrakcje.description}</p>
                        </>
                    )
                }
                <h5 style={{marginTop: "2rem"}}>                    
                    <Button 
                        buttonStyle='btn--primary'
                        onClick={()=> this.setAdd(true)}>
                            DODAJ 
                            <i style= {{"paddingLeft":"10px"}} class="fas fa-plus"></i>                   
                    </Button>
                </h5>
                <p>
                    
                </p>
            </div>
            <AttractionsAddModal show={this.state.add} setOpen={this.setAdd} addNewAttraction={this.addNewAttraction}/>
            <AttractionsAddModal show={this.state.edit} setOpen={this.setEdit} addNewAttraction={this.editAttraction}/>
            
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


