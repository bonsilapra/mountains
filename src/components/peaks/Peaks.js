import React from 'react';
import backgroundImage from '../../images/peaksBackground.jpg';
import { Link, useLocation } from "react-router-dom";
import { Background } from '../commons/Background';
import myAxios from '../../utilities/myAxios';
import Alert from 'react-bootstrap/Alert';
import { MyButton } from '../button/MyButton';
import Button from 'react-bootstrap/Button';
import { PeaksAddModal } from './PeaksAddModal';
import { PeaksEditModal } from './PeaksEditModal';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import './Peaks.css';
import '../commons/Commons.css';



class PeaksWrapped extends React.Component {

    constructor(props) {
        super(props);
        this.state = {peak: [], isError: false, show: false, add: false, edit: false, editId:"", id:"", editObject:{}, sortFunction: this.sortAll, orderFunction: this.orderHeight }
        this.setAdd = this.setAdd.bind(this);
        this.setEdit = this.setEdit.bind(this);
        this.addNewPeak = this.addNewPeak.bind(this);
        this.editPeak = this.editPeak.bind(this)
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

    sortKGP (element) {
        return element.isKGP==true
    }

    sortAll (element) {
        return true
    }

    setSortFunction (sortFunction) {
        this.setState({ sortFunction: sortFunction})
    }

    orderHeight (a,b) {
        if (a.height<b.height)
            return 1
        if (a.height>b.height)
            return -1
        return 0
    }
    
    orderAbc (a,b) {
        return a.name.localeCompare(b.name)
    }

    orderHeightLowest (a,b) {
        if (a.height<b.height)
            return -1
        if (a.height>b.height)
            return 1
        return 0
    }

    orderMRange (a,b) {
        return a.mountainRange.name.localeCompare(b.mountainRange.name)
    }

    setOrderFunction (orderFunction) {
        this.setState({orderFunction: orderFunction})
    }


    addNewPeak (name, description, height, isKGP, mountainRange, trips) {
        myAxios.post(`peak`,{
            name: name,
            description: description,
            height: height,
            isKGP: isKGP,
            mountainRange: mountainRange,
            trips: trips
        })
        .then((response) => {
            this.setState({peak: [...this.state.peak, response.data]});
            this.setAdd(false);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    editPeak (name, description, height, isKGP, mountainRange, trips) {
        myAxios.put(`peak`,{
            id: this.state.editId,
            name: name,
            description: description,
            height: height,
            isKGP: isKGP,
            mountainRange: mountainRange,
            trips: trips
        })
        .then((response) => {
            this.setState({peak: this.state.peak.map((element) => {
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
        myAxios.delete(`peak/`+ this.state.id)
        .then((response) => {
            this.setState(
                {peak: this.state.peak.filter(element => {
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
        myAxios.get(`peak`)
            .then(res => {
                const peak = res.data;
                this.setState({ peak });
                setTimeout(() => this.setState(document.getElementById("szczyt" + this.props.location.state.peakId).scrollIntoView()), 1000)
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
                SZCZYTY
            </div>
            <div className='page-container' >
                <h1>Lista szczytów</h1>
                <div style={{marginBottom: "15px"}} className="title-with-buttons">                    
                    <MyButton 
                        buttonStyle='btn--primary'
                        onClick={() => this.setSortFunction(this.sortAll)}>
                            Wszystkie 
                            <i style= {{"paddingLeft":"10px"}} class="fas fa-mountain"></i>                   
                    </MyButton>
                    <MyButton 
                        buttonStyle='btn--primary'
                        onClick={() => this.setSortFunction(this.sortKGP)}>
                            Korona Gór Polski 
                            <i style= {{"paddingLeft":"10px"}} class="fas fa-mountain"></i>                   
                    </MyButton>
                </div>
                <div style={{marginBottom: "15px"}} className="title-with-buttons">                    
                    <MyButton 
                        buttonStyle='btn--primary'
                        onClick={() => this.setOrderFunction(this.orderAbc)}>
                            Alfabetycznie 
                    </MyButton>
                    <MyButton 
                        buttonStyle='btn--primary'
                        onClick={() => this.setOrderFunction(this.orderHeight)}>
                            Od najwyższego
                    </MyButton>
                    <MyButton 
                        buttonStyle='btn--primary'
                        onClick={() => this.setOrderFunction(this.orderHeightLowest)}>
                            Od najniższego
                    </MyButton>
                    <MyButton 
                        buttonStyle='btn--primary'
                        onClick={() => this.setOrderFunction(this.orderMRange)}>
                            Pasma górskie
                    </MyButton>
                </div>
                {this.state.isError &&
                    <Alert variant="danger" style = {{textAlign: "center", width: "100%"}}> 
                    Backend nie działa!!!
                    </Alert>
                }
                {this.state.peak &&
                this.state.peak
                    .filter(this.state.sortFunction)
                    .sort(this.state.orderFunction)
                    .map((szczyty) =>
                        <>
                        <hr className="rounded" />
                            <h4 id={"szczyt" + szczyty.id}>
                                <b>{szczyty.name}</b> - {szczyty.height} m n.p.m.
                            </h4>
                            <p>{szczyty.description}</p>
                            {szczyty.mountainRange != null ? 
                            (<p>Pasmo górskie: <Link to={"/mountainRange/"+ szczyty.mountainRange.id}
                                state={{ mountainRangeId: szczyty.mountainRange.id }}
                                >
                                    {szczyty.mountainRange.name}
                                </Link> </p>) : (<p></p>)}
                            <p style={{whiteSpace: "pre-wrap"}}>{szczyty.description}</p>
                            Wycieczki:
                            <ul className="list-no-bullets-center">
                                {szczyty.trips != null ? 
                                    (szczyty.trips.map((trip) =>
                                        <li>
                                            <Link to={"/trip/" + trip.id}
                                            state={{ tripId: trip.id}}
                                            className="link"
                                            >
                                                {trip.name} - {moment(trip.date, "DD-MM-YYYY hh:mm:ss").format("YYYY-MM-DD")}
                                            </Link> 
                                        </li>
                                    
                                    ))
                                : (<p></p>)}
                            </ul>
                            {userLogin!=null && userLogin.roles.includes("ADMIN") &&
                            <section className='title-with-buttons'>
                                <div>      
                                    <MyButton 
                                        buttonStyle='btn--primary'
                                        onClick={(event)=> {this.setEdit(true, szczyty.id, szczyty); event.stopPropagation()}}>
                                            <i class="fas fa-pen"></i>                   
                                    </MyButton>
                                </div>
                                <div>
                                    <MyButton 
                                        buttonStyle='btn--outline'
                                        onClick={(event)=> {this.setShow(true, szczyty.id); event.stopPropagation()}}>
                                            <i class="fas fa-trash"></i>                   
                                    </MyButton>
                                    </div>
                            </section>
                            }
                        </>
                    )
                }

                {userLogin!=null && userLogin.roles.includes("ADMIN") &&
                <>
                <hr className="rounded" />
                <h5 style={{marginBottom: "15px"}}>  
                    <MyButton 
                        buttonStyle='btn--primary'
                        onClick={()=> this.setAdd(true)}>
                            DODAJ 
                            <i style= {{"paddingLeft":"10px"}} class="fas fa-plus"></i>                   
                    </MyButton>
                </h5>
                </>
                }
            </div>
            <PeaksAddModal show={this.state.add} setOpen={this.setAdd} addNewPeak={this.addNewPeak}/>
            <PeaksEditModal show={this.state.edit} setOpen={this.setEdit} editPeak={this.editPeak} editObject={this.state.editObject}/>
            
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


const Peaks = (props) => {
    const location = useLocation();

    return (
        <PeaksWrapped {...props} location={location} />
        
    )
}

export default Peaks



