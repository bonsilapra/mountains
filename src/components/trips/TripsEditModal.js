import React from 'react'
import myAxios from '../../utilities/myAxios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Select from 'react-select';

export class TripsEditModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: "", 
                description: "", 
                date: "",
                mapaTurystycznaLink: "", 
                region: "", 
                mountainRanges: [],
                peaks: []
            },
            trips: [],
        }
    }

    componentDidMount() {
        myAxios.get(`mountainRange`)
            .then(res => {
                console.log(res);
                const mRanges = res.data;
                const mRangeOptions = 
                    mRanges.sort(function compare(a, b) {
                        if (a.id<b.id)
                            return -1
                        if (a.id>b.id)
                            return 1
                        return 0
                    })
                    .map((mRange) => {
                        return {value: mRange, label: mRange.name }
                    })
                this.setState({ mRanges: mRangeOptions });
                }
            )
        myAxios.get(`trip`)
            .then(res => {
                console.log(res);
                const trips = res.data;
                const tripOptions = 
                    trips.sort(function compare(a, b) {
                        if (a.date<b.date)
                            return -1
                        if (a.date>b.date)
                            return 1
                        return 0
                    })
                    .map((trip) => {
                        return {value: trip, label: trip.name }
                    })
                this.setState({ trips: tripOptions });
                }
            )
        myAxios.get(`region`)
            .then(res => {
                console.log(res);
                const regions = res.data;
                const regionOptions = 
                    regions.sort(function compare(a, b) {
                        if (a.name<b.name)
                            return -1
                        if (a.name>b.name)
                            return 1
                        return 0
                    })
                    .map((region) => {
                        return {value: region, label: region.name }
                    })
                this.setState({ regions: regionOptions });
                }
            )
    }

    handleNameChange(event) {
        this.setState({form:{...this.state.form, name:event.target.value}});
    }

    handleDescriptionChange(event) {
        this.setState({form: {...this.state.form, description: event.target.value}});
    }

    handleDateChange(event) {
        this.setState({form: {...this.state.form, date: event.target.value}});
    }

    handleChangeRegions = (selectedOption) => {
        this.setState({form: {...this.state.form, region: selectedOption.value }});
    }

    handleMapChange(event) {
        this.setState({form: {...this.state.form, mapaTurystycznaLink: event.target.value}});
    }

    handleChangeMountainRange = (selectedOption) => {
        this.setState({form: {...this.state.form, mountainRanges: selectedOption.value }});
    }

    handleChangePeaks = (selectedOptions) => {
        this.setState({form: {...this.state.form, peaks: selectedOptions.value }});
    }


    
    componentDidUpdate(prevProps) {
        if (this.props.editObject != null && prevProps.show !== this.props.show) {
            this.setState({ form: { 
                name: this.props.editObject.name, 
                description: this.props.editObject.description, 
                date: this.props.editObject.date, 
                mapaTurystycznaLink: this.props.editObject.mapaTurystycznaLink, 
                region: this.props.editObject.region, 
                mountainRanges: this.props.editObject.mountainRanges, 
                peaks: this.props.editObject.peaks } })
        }
    }

    render() {
        return (
            <>
                <Modal show={this.props.show} onHide={()=> this.props.setOpen(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edytowanie</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Edytuj wycieczkę:</p>
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
                        <label for="data">Data wycieczki:</label>
                        <input 
                            id="data"
                            type="date" 
                            style={{width: "100%"}}
                            value={this.state.form.date} 
                            onChange={(event)=>this.handleDateChange(event)} />
                        <p></p>
                        <input 
                            placeholder="Link do trasy" 
                            type="text" 
                            style={{width: "100%"}}
                            value={this.state.form.mapaTurystycznaLink} 
                            onChange={(event)=>this.handleHeightChange(event)} />
                        <p></p>
                        <Select 
                            placeholder="Region" 
                            onChange={this.handleChangeRegions} 
                            options={this.state.regions} 
                            value={this.state.form.region != null ? { label: this.state.form.region.name, value: this.state.form.region } : { label: "", value:null}}
                        />
                        <p></p>
                        <Select 
                            placeholder="Pasmo górskie" 
                            onChange={this.handleChangeMountainRange} 
                            options={this.state.mRanges} 
                            value={this.state.form.mountainRanges != null ? { label: this.state.form.mountainRanges.name, value: this.state.form.mountainRanges } : { label: "", value:null}}
                        />
                        <p></p>
                        <Select 
                            isMulti
                            placeholder="Wycieczki" 
                            onChange={this.handleChangeTrips} 
                            options={this.state.trips} 
                            value={this.state.form.trips != null ? { label: this.state.form.trips.name, value: this.state.form.trips } : { label: "", value:null}}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                            variant="secondary"
                            onClick={()=> this.props.setOpen(false)}>
                                Wyjście
                        </Button>
                        <Button 
                            variant="primary"
                            onClick={()=> this.props.editAttraction(this.state.form.name,this.state.form.description,this.state.form.region)}>
                                Zapisz
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}


