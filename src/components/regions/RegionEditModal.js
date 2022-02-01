import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'


export class RegionEditModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                id: "",
                name: "", 
                description: "", 
                attractions: "", 
                mountainRanges: "", 
                trips: ""
            }
        }
    }


    handleDescriptionChange(event) {
        this.setState({form: {...this.state.form, description: event.target.value}});
    }

    componentDidUpdate(prevProps) {
        if (this.props.editObject != null && prevProps.show !== this.props.show) {
            this.setState({ form: { 
                id: this.props.editObject.id, 
                name: this.props.editObject.name, 
                description: this.props.editObject.description, 
                attractions: this.props.editObject.attractions, 
                mountainRanges: this.props.editObject.mountainRanges, 
                trips: this.props.editObject.trips, 
            } })
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
                        <p>Edytuj opis regionu:</p>
                        <textarea 
                            placeholder="Opis" 
                            style={{width: "100%"}}
                            rows={5}
                            value={this.state.form.description ? this.state.form.description : ""} 
                            onChange={(event)=>this.handleDescriptionChange(event)} />
                        <p></p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                            variant="secondary"
                            onClick={()=> this.props.setOpen(false)}>
                                Wyjście
                        </Button>
                        <Button 
                            variant="primary"
                            onClick={()=> this.props.editRegion(
                                this.state.form.id, 
                                this.state.form.name, 
                                this.state.form.description,
                                this.state.form.attractions,
                                this.state.form.mountainRanges,
                                this.state.form.trips
                            )}>
                                Zapisz
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

