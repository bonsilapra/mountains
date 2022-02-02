import React from 'react';
import backgroundImage from '../../images/tripsBackground.jpg';
import { Link, useLocation } from "react-router-dom";
import { Background } from '../commons/Background';
import myAxios from '../../utilities/myAxios';
import Alert from 'react-bootstrap/Alert';
import { MyButton } from '../button/MyButton';
import Button from 'react-bootstrap/Button';
import { TripsAddModal } from './TripsAddModal';
import { TripsEditModal } from './TripsEditModal';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import './Trips.css';
import '../commons/Commons.css';



class TripsWrapped extends React.Component {

    constructor(props) {
        super(props);
        this.state = {trip: [], isError: false, show: false, add: false, edit: false, editId:"", id:"", editObject:{}, filterFunction: this.sortAll, orderFunction: this.orderDate}
        this.setAdd = this.setAdd.bind(this);
        this.setEdit = this.setEdit.bind(this);
        this.addNewTrip = this.addNewTrip.bind(this);
        this.editTrip = this.editTrip.bind(this)
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
        return element.peaks.filter(check => {
            return check.isKGP==true
        }).length != 0
    }

    sortAll (element) {
        return true
    }

    setFilterFunction (filterFunction) {
        this.setState({ filterFunction: filterFunction})
    }

    orderDate (a,b) {
        if (moment(a.date, "DD-MM-YYYY hh:mm:ss") < moment(b.date, "DD-MM-YYYY hh:mm:ss"))
            return 1
        if (moment(a.date, "DD-MM-YYYY hh:mm:ss") > moment(b.date, "DD-MM-YYYY hh:mm:ss"))
            return -1
        return 0
    }
    
    orderAbc (a,b) {
        return a.name.localeCompare(b.name)
    }

    orderRegion (a,b) {
        return a.region.name.localeCompare(b.region.name)
    }

    setOrderFunction (orderFunction) {
        this.setState({orderFunction: orderFunction})
    }

    addNewTrip (name, description, date, mapaTurystycznaLink, region, mountainRanges, peaks) {
        myAxios.post(`trip`,{
            name: name,
            description: description,
            date: date,
            mapaTurystycznaLink: mapaTurystycznaLink,
            region: region,
            mountainRanges: mountainRanges,
            peaks: peaks
        })
        .then((response) => {
            this.setState({trip: [...this.state.trip, response.data]});
            this.setAdd(false);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    editTrip (name, description, date, mapaTurystycznaLink, region, mountainRanges, peaks) {
        myAxios.put(`trip`,{
            id: this.state.editId,
            name: name,
            description: description,
            date: date,
            mapaTurystycznaLink: mapaTurystycznaLink,
            region: region,
            mountainRanges: mountainRanges,
            peaks: peaks
        })
        .then((response) => {
            this.setState({trip: this.state.trip.map((element) => {
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
        myAxios.delete(`trip/`+ this.state.id)
        .then((response) => {
            this.setState(
                {trip: this.state.trip.filter(element => {
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
        myAxios.get(`trip`)
            .then(res => {
                const trip = res.data;
                this.setState({ trip });
                setTimeout(() => this.setState(document.getElementById("wycieczka" + this.props.location.state.tripId).scrollIntoView()), 1000);
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
                    WYCIECZKI
                </div>
                <div className='page-container' >
                    <h1>Lista wycieczek</h1>
                    <div style={{marginBottom: "15px"}} className='title-with-buttons'>                    
                        <MyButton 
                            buttonStyle='btn--primary'
                            onClick={() => this.setFilterFunction(this.sortAll)}>
                                Wszystkie 
                                <i style= {{"paddingLeft":"10px"}} className="fas fa-mountain"></i>                   
                        </MyButton>
                        <MyButton 
                            buttonStyle='btn--primary-padding'
                            onClick={() => this.setFilterFunction(this.sortKGP)}>
                                Korona Gór Polski 
                                <i style= {{"paddingLeft":"10px"}} className="fas fa-mountain"></i>                   
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
                            onClick={() => this.setOrderFunction(this.orderDate)}>
                                Wg dat
                        </MyButton>
                        <MyButton 
                            buttonStyle='btn--primary'
                            onClick={() => this.setOrderFunction(this.orderRegion)}>
                                Wg regionów
                        </MyButton>
                    </div>
                    {this.state.isError &&
                        <Alert variant="danger" style = {{textAlign: "center", width: "100%"}}> 
                            Backend nie działa!!!
                        </Alert>
                    }
                    {userLogin!=null && userLogin.roles.includes("ADMIN") &&
                        <>
                            <h5>  
                                <MyButton 
                                    buttonStyle='btn--primary'
                                    onClick={()=> this.setAdd(true)}>
                                        DODAJ 
                                        <i style= {{"paddingLeft":"10px"}} className="fas fa-plus"></i>                   
                                </MyButton>
                            </h5>
                        </>
                    }
                    {this.state.trip &&
                    this.state.trip
                        .filter(this.state.filterFunction)
                        .sort(this.state.orderFunction)
                        .map((wycieczki) =>
                            <div id={"wycieczka" + wycieczki.id} className='trip-container' key={wycieczki.id}>
                                <hr className="rounded" />
                                <h4>
                                    <Link className="link" to={"/trip/" + wycieczki.id}> {wycieczki.name} - <span style={{whiteSpace: "nowrap"}}>{moment(wycieczki.date, "DD-MM-YYYY hh:mm:ss").format("YYYY-MM-DD")}</span></Link>
                                </h4>
                                {wycieczki.region &&
                                    <h6> Region:&nbsp;
                                        <Link 
                                            to={"/regions"}
                                            state={{ regionId: wycieczki.region.id }}
                                            className="link"
                                        >
                                            {wycieczki.region.name}
                                        </Link>
                                    </h6>
                                }
                                {wycieczki.mountainRanges.length != 0 &&
                                    <>
                                        Pasmo górskie:
                                        <ul className="list-no-bullets-center">
                                            {wycieczki.mountainRanges != null ? 
                                                (wycieczki.mountainRanges.map((mRange) =>
                                                    <li key={mRange.id}>
                                                        <Link 
                                                            to={"/mountainRange/"+ mRange.id}
                                                            state={{ mountainRangeId: mRange.id }}
                                                            className="link"
                                                        >
                                                            {mRange.name}
                                                        </Link> 
                                                    </li>
                                                ))
                                            : (<p></p>)
                                            }
                                        </ul>
                                    </>
                                }

                                {wycieczki.peaks.length != 0 &&
                                    <>
                                        Szczyt:
                                        <ul className="list-no-bullets-center">
                                            {wycieczki.peaks != null ? 
                                                (wycieczki.peaks.map((peak) =>
                                                    <li key={peak.id}>
                                                        <Link to={"/peaks/"}
                                                            state={{ peakId: peak.id }}
                                                            className="link"
                                                        >
                                                            {peak.name}
                                                        </Link> 
                                                    </li>
                                                ))
                                            : (<p></p>)
                                            }
                                        </ul>
                                    </>
                                }

                                {userLogin!=null && userLogin.roles.includes("ADMIN") &&
                                    <section className='title-with-buttons-admin'>
                                        <div>      
                                            <MyButton 
                                                buttonStyle='btn--primary'
                                                onClick={(event)=> {this.setEdit(true, wycieczki.id, wycieczki); event.stopPropagation()}}>
                                                    <i className="fas fa-pen"></i>                   
                                            </MyButton>
                                        </div>
                                        <div>
                                            <MyButton 
                                                buttonStyle='btn--outline'
                                                onClick={(event)=> {this.setShow(true, wycieczki.id); event.stopPropagation()}}>
                                                    <i className="fas fa-trash"></i>                   
                                            </MyButton>
                                        </div>
                                    </section>
                                }
                            </div>
                        )
                    }
                    <hr className="rounded" />
                </div>
                <TripsAddModal show={this.state.add} setOpen={this.setAdd} addNewTrip={this.addNewTrip}/>
                <TripsEditModal show={this.state.edit} setOpen={this.setEdit} editTrip={this.editTrip} editObject={this.state.editObject}/>
                
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

const Trips = (props) => {
    const location = useLocation();

    return (
        <TripsWrapped {...props} location={location} />
        
    )
}

export default Trips


