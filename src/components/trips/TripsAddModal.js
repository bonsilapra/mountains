import React from 'react'
import myAxios from '../../utilities/myAxios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Select from 'react-select';

export class TripsAddModal extends React.Component {

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
                        if (a.name<b.name)
                            return -1
                        if (a.name>b.name)
                            return 1
                        return 0
                    })
                    .map((mRange) => {
                        return {value: mRange, label: mRange.name }
                    })
                this.setState({ mRanges: mRangeOptions });
                }
            )
        myAxios.get(`peak`)
            .then(res => {
                console.log(res);
                const peaks = res.data;
                const peakOptions = 
                    peaks.sort(function compare(a, b) {
                        if (a.name<b.name)
                            return -1
                        if (a.name>b.name)
                            return 1
                        return 0
                    })
                    .map((peak) => {
                        return {value: peak, label: peak.name }
                    })
                this.setState({ peaks: peakOptions });
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


    render() {
        
        return (
            <>
                
                <Modal show={this.props.show} onHide={()=> this.props.setOpen(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Dodawanie</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Dodaj wycieczkę:</p>
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
                            type="text" 
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
                            rows={5}
                            style={{width: "100%"}}
                            value={this.state.form.mapaTurystycznaLink} 
                            onChange={(event)=>this.handleMapChange(event)} />
                        <p></p>
                        <Select 
                            placeholder="Region" 
                            onChange={this.handleChangeRegions} 
                            options={this.state.regions} 
                        />
                        <p></p>
                        <Select 
                            isMulti
                            placeholder="Pasma górskie" 
                            onChange={this.handleChangeMountainRange} 
                            options={this.state.mRanges} 
                        />
                        <p></p>
                        <Select 
                            isMulti
                            placeholder="Szczyty" 
                            onChange={this.handleChangePeaks} 
                            options={this.state.peaks} 
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
                            onClick={()=> this.props.addNewPeak(this.state.form.name, this.state.form.description, this.state.form.height, this.state.form.isKGP, this.state.form.mountainRanges, this.state.form.trips)}>
                                Dodaj
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}


