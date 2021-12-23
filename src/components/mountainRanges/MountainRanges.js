import React from 'react';
import backgroundImage from '../../images/mountainRangesBackground.jpg';
import { Background } from '../commons/Background';
import myAxios from '../../utilities/myAxios';
import Alert from 'react-bootstrap/Alert';
import { MyButton } from '../button/MyButton';
import Button from 'react-bootstrap/Button';
import { PeakAddModal } from './PeakAddModal';
import { PeakEditModal } from './PeakEditModal';
import Modal from 'react-bootstrap/Modal';
import { MRPostcard } from './MRPostcard'
import './MountainRanges.css';
import '../commons/Commons.css';



export class MountainRanges extends React.Component {

    constructor(props) {
        super(props);
        this.state = {peak: [], isError: false, show: false, add: false, edit: false, editId:"", id:"", editObject:{}}
        // this.setAdd = this.setAdd.bind(this);
        // this.setEdit = this.setEdit.bind(this);
        // this.addNewPeak = this.addNewPeak.bind(this);
        // this.editPeak = this.editPeak.bind(this)
        window.scrollTo(0,0)
    }


    // setShow(show, id) {
    //     this.setState({ show: show, id: id});
    // }

    // setAdd(add) {
    //     this.setState({ add: add});
    // }
    
    // setEdit(edit, id, obj) {
    //     this.setState({ edit: edit, editId: id, editObject:obj})
    // }

    // addNewPeak (name, description, height, mountainRange) {
    //     myAxios.post(`peak`,{
    //         name: name,
    //         description: description,
    //         height: height,
    //         mountainRange: mountainRange
    //     })
    //     .then((response) => {
    //         this.setState({peak: [...this.state.peak, response.data]});
    //         this.setAdd(false);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     })
    // }

    // editPeak (name, description, height, mountainRange) {
    //     myAxios.put(`peak`,{
    //         id: this.state.editId,
    //         name: name,
    //         description: description,
    //         height: height,
    //         mountainRange: mountainRange
    //     })
    //     .then((response) => {
    //         this.setState({peak: this.state.peak.map((element) => {
    //             if (element.id !== this.state.editId) {
    //                 return element
    //             } else {return response.data}
                
    //         })})
    //         this.setEdit(false);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     })
    // }

    // handleDelete() {
    //     myAxios.delete(`peak`+ this.state.id)
    //     .then((response) => {
    //         this.setState(
    //             {peak: this.state.peak.filter(element => {
    //                 return element.id!==this.state.id
    //             })
    //         });
    //         this.setShow(false);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // }

    componentDidMount() {
        myAxios.get(`mountainRange`)
            .then(res => {
                const mountainRange = res.data;
                this.setState({ mountainRange });
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
                PASMA GÓRSKIE
            </div>
            <div className='page-container' >

                {this.state.isError &&
                    <Alert variant="danger" style = {{textAlign: "center", width: "100%"}}> 
                    Backend nie działa!!!
                    </Alert>
                }
                <h1>Pasma górskie uwzględnione w Koronie Gór Polski</h1>
                <div className='cards-container'>
                    {this.state.mountainRange &&
                    this.state.mountainRange.sort(function compare(a, b) {
                        if (a.name<b.name)
                            return -1
                        if (a.name>b.name)
                            return 1
                        return 0
                        })
                        .map((mRange) =>
                                <MRPostcard id={mRange.id} peak={mRange.peaks} name={mRange.name} />
                        )
                    }
                </div>
                            {/* {pasma.region != null ? 
                            (<p>Region: {atrakcje.region.name}</p>) : (<p></p>)} */}
                            {/* <section className='title-with-buttons'>
                                <div>      
                                    <MyButton 
                                        buttonStyle='btn--primary'
                                        onClick={(event)=> {this.setEdit(true, atrakcje.id, atrakcje); event.stopPropagation()}}>
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
                            </section> */}

                {/* <h5 style={{marginBottom: "15px"}}>                    
                    <Button 
                        buttonStyle='btn--primary'
                        onClick={()=> this.setAdd(true)}>
                            DODAJ 
                            <i style= {{"paddingLeft":"10px"}} class="fas fa-plus"></i>                   
                    </Button>
                </h5> */}
            </div>
            <PeakAddModal show={this.state.add} setOpen={this.setAdd} addNewAttraction={this.addNewAttraction}/>
            <PeakEditModal show={this.state.edit} setOpen={this.setEdit} editAttraction={this.editAttraction} editObject={this.state.editObject}/>
            
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


