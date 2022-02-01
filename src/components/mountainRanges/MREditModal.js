import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'


export class MREditModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: "", 
                description: "", 
            }
        }
    }

    handleNameChange(event) {
        this.setState({form:{...this.state.form, name:event.target.value}});
    }

    handleDescriptionChange(event) {
        this.setState({form: {...this.state.form, description: event.target.value}});
    }

    
    componentDidUpdate(prevProps) {
        if (this.props.editObject != null && prevProps.show !== this.props.show) {
            this.setState({ form: { 
                name: this.props.editObject.name, 
                description: this.props.editObject.description, 
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
                        <p>Edytuj pasmo górskie:</p>
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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                            variant="secondary"
                            onClick={()=> this.props.setOpen(false)}>
                                Wyjście
                        </Button>
                        <Button 
                            variant="primary"
                            onClick={()=> this.props.editMRange(
                                this.state.form.name, 
                                this.state.form.description
                            )}>
                                Zapisz
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

