import React from 'react'
import myAxios from '../../utilities/myAxios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Select from 'react-select';
import moment from 'moment';


export class TripsEditModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: "", 
                description: "", 
                date: "",
                mapaTurystycznaLink: "", 
                region: null,
                mountainRanges: [],
                peaks: []
            },
            trips: [],
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
        myAxios.get(`peak`)
            .then(res => {
                const peaks = res.data;
                const peakOptions = 
                    peaks.sort(function compare(a, b) {
                        return a.name.localeCompare(b.name)
                    })
                    .map((peak) => {
                        return {value: peak, label: peak.name }
                    })
                this.setState({ peaks: peakOptions });
                }
            )
        myAxios.get(`region`)
            .then(res => {
                const regions = res.data;
                const regionOptions = 
                    regions.sort(function compare(a, b) {
                        return a.name.localeCompare(b.name)
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

    handleChangeMountainRange = (selectedOptions) => {
        this.setState({form: {...this.state.form, mountainRanges: selectedOptions.map((option) => option.value)}});
    }

    handleChangePeaks = (selectedOptions) => {
        this.setState({form: {...this.state.form, peaks: selectedOptions.map((option) => option.value) }});
    }


    
    componentDidUpdate(prevProps) {
        if (this.props.editObject != null && prevProps.show !== this.props.show) {
            this.setState({ form: { 
                name: this.props.editObject.name, 
                description: this.props.editObject.description, 
                date: moment(this.props.editObject.date, "DD-MM-YYYY hh:mm:ss").format("YYYY-MM-DD"),
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
                        <p>Edytuj wycieczk??:</p>
                        <input 
                            placeholder="Nazwa" 
                            type="text" 
                            style={{width: "100%"}}
                            value={this.state.form.name ? this.state.form.name : ""} 
                            onChange={(event)=>this.handleNameChange(event)} />
                        <p></p>
                        <textarea 
                            placeholder="Opis" 
                            style={{width: "100%"}}
                            rows={5}
                            value={this.state.form.description ? this.state.form.description : ""} 
                            onChange={(event)=>this.handleDescriptionChange(event)} />
                        <p></p>
                        <label>Data wycieczki:</label>
                        <input 
                            id="data"
                            type="date" 
                            style={{width: "100%"}}
                            value={this.state.form.date} 
                            onChange={(event)=>this.handleDateChange(event)} />
                        <p></p>
                        <label>Trasa bez profilu wysoko??ciowego!</label>
                        <input 
                            placeholder="Link do trasy" 
                            type="text" 
                            style={{width: "100%"}}
                            value={this.state.form.mapaTurystycznaLink ? this.state.form.mapaTurystycznaLink : ""} 
                            onChange={(event)=>this.handleMapChange(event)} />
                        <p></p>
                        <Select 
                            placeholder="Region" 
                            onChange={this.handleChangeRegions} 
                            options={this.state.regions} 
                            value={this.state.form.region != null ? { label: this.state.form.region.name, value: this.state.form.region } : { label: "", value:null}}
                        />
                        <p></p>
                        <Select 
                            isMulti
                            placeholder="Pasmo g??rskie" 
                            onChange={this.handleChangeMountainRange} 
                            options={this.state.mRanges} 
                            value={this.state.form.mountainRanges != null ? this.state.form.mountainRanges.map((MRange) => {
                                return { label: MRange.name, value: MRange }
                            })
                            : ({ label: "", value:null})}
                            getOptionValue={option => option.value.id}
                        />
                        <p></p>
                        <Select 
                            isMulti
                            placeholder="Szczyty" 
                            onChange={this.handleChangePeaks} 
                            options={this.state.peaks} 
                            value={(this.state.form.peaks != null ) ? this.state.form.peaks.map((peak) => {
                                return { label: peak.name, value: peak } 
                            })
                            : []}
                            getOptionValue={option => option.value.id}
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
                            onClick={()=> this.props.editTrip(
                                this.state.form.name, 
                                this.state.form.description, 
                                moment(this.state.form.date, "YYYY-MM-DD").format("DD-MM-YYYY hh:mm:ss"), 
                                this.state.form.mapaTurystycznaLink, 
                                this.state.form.region, 
                                this.state.form.mountainRanges, 
                                this.state.form.peaks
                            )}>
                                Zapisz
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

