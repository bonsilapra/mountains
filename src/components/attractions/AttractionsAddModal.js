import React from 'react'
import myAxios from '../../utilities/myAxios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Select from 'react-select';

export class AttractionsAddModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: "", 
                description: "", 
                region: null
            },
            regions: [],
        }
    }

    componentDidMount() {
        myAxios.get(`http://localhost:8080/region`)
            .then(res => {
                console.log(res);
                const regions = res.data;
                const regionOptions = 
                    regions.sort(function compare(a, b) {
                        if (a.id<b.id)
                            return -1
                        if (a.id>b.id)
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

    handleChangeRegions = (selectedOption) => {
        this.setState({form: {...this.state.form, region: selectedOption.value }});
    }


    render() {
        return (
            <>
                <Modal show={this.props.show} onHide={()=> this.props.setOpen(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Dodawanie</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Co chcesz dodać:</p>
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
                        <Select 
                            placeholder="Region" 
                            onChange={this.handleChangeRegions} 
                            options={this.state.regions} 
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
                            onClick={()=> this.props.addNewAttraction(this.state.form.name,this.state.form.description,this.state.form.region)}>
                                Dodaj
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}


