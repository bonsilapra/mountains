import React from 'react'
import myAxios from '../../utilities/myAxios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Select from 'react-select';
import moment from 'moment';


export class PeaksAddModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: "", 
                description: "", 
                height: "", 
                isKGP: "", 
                mountainRange: null,
                trips: null
            },
            peaks: [],
        }
    }

    componentDidMount() {
        myAxios.get(`mountainRange/list`)
            .then(res => {
                const mRanges = res.data;
                const mRangeOptions = 
                    mRanges.sort(function compare(a, b) {
                        return a.name.localeCompare(b.name)
                    })
                    .map((mRange) => {
                        return {value: mRange, label: mRange.name }
                    })
                this.setState({ mRanges: mRangeOptions });
                }
            )
        myAxios.get(`trip`)
            .then(res => {
                const trips = res.data;
                const tripOptions = 
                    trips.sort(function compare(a, b) {
                        if (moment(a.date, "DD-MM-YYYY hh:mm:ss") < moment(b.date, "DD-MM-YYYY hh:mm:ss"))
                            return 1
                        if (moment(a.date, "DD-MM-YYYY hh:mm:ss") > moment(b.date, "DD-MM-YYYY hh:mm:ss"))
                            return -1
                        return 0
                    })
                    .map((trip) => {
                        return {value: trip, label: trip.name + " " + moment(trip.date, "DD-MM-YYYY hh:mm:ss").format("YYYY-MM-DD") }
                    })
                this.setState({ trips: tripOptions });
                }
            )
    }

    componentDidUpdate(prevProps) {
        if (this.props.show == true && prevProps.show == false) {
            this.setState({
                form: {
                    name: "", 
                    description: "", 
                    height: "", 
                    isKGP: "", 
                    mountainRange: null,
                    trips: null
                }
            })
        }
    }

    handleNameChange(event) {
        this.setState({form:{...this.state.form, name:event.target.value}});
    }

    handleDescriptionChange(event) {
        this.setState({form: {...this.state.form, description: event.target.value}});
    }

    handleHeightChange(event) {
        this.setState({form: {...this.state.form, height: event.target.value}});
    }

    handleKGPChange(event) {
        this.setState({form: {...this.state.form, isKGP: event.target.value}});
    }

    handleChangeMountainRange = (selectedOption) => {
        this.setState({form: {...this.state.form, mountainRange: selectedOption.value }});
    }

    handleChangeTrips = (selectedOptions) => {
        this.setState({form: {...this.state.form, trips: selectedOptions.map((option) => option.value) }});
    }


    render() {
        
        return (
            <>
                
                <Modal show={this.props.show} onHide={()=> this.props.setOpen(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Dodawanie</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Co chcesz doda??:</p>
                        <input 
                            placeholder="Nazwa" 
                            type="text" 
                            style={{width: "100%"}}
                            value={this.state.form.name} 
                            onChange={(event)=>this.handleNameChange(event)} />
                        <p></p>
                        <textarea 
                            placeholder="Opis" 
                            style={{width: "100%"}}
                            rows={5}
                            value={this.state.form.description} 
                            onChange={(event)=>this.handleDescriptionChange(event)} />
                        <p></p>
                        <input 
                            placeholder="Wysoko????" 
                            type="number" 
                            style={{width: "100%"}}
                            value={this.state.form.height} 
                            onChange={(event)=>this.handleHeightChange(event)} />
                        <p></p>
                        <p>Czy szczyt nale??y do Korony G??r Polski</p>
                        <input type="radio" id="isKGP" name="isKGP" value={true} />
                        <label> TAK </label><br />
                        <input type="radio" id="noKGP" name="isKGP" value={false} />
                        <label> NIE </label>
                        <p></p>
                        <Select 
                            placeholder="Pasmo g??rskie" 
                            onChange={this.handleChangeMountainRange} 
                            options={this.state.mRanges} 
                        />
                        <p></p>
                        <Select 
                            isMulti
                            placeholder="Wycieczki" 
                            onChange={this.handleChangeTrips} 
                            options={this.state.trips} 
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                            variant="secondary"
                            onClick={()=> this.props.setOpen(false)}>
                                Wyj??cie
                        </Button>
                        <Button 
                            variant="primary"
                            onClick={()=> this.props.addNewPeak(
                                this.state.form.name, 
                                this.state.form.description, 
                                this.state.form.height, 
                                this.state.form.isKGP, 
                                this.state.form.mountainRange, 
                                this.state.form.trips
                            )}>
                                Dodaj
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}


