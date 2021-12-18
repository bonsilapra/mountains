import React from 'react';
import backgroundImage from '../../images/attractionsBackground.jpg';
import { Background } from '../commons/Background';
import myAxios from '../../utilities/myAxios';
import Alert from 'react-bootstrap/Alert';

import '../commons/Commons.css';



export class Attractions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {attraction: [], isError: false, show: false, add: false, edit: false, editId:"", id:""}
        // this.setAdd = this.setAdd.bind(this);
        // this.setEdit = this.setEdit.bind(this);
        // this.addNewAttraction = this.addNewAttraction.bind(this);
        // this.editAttraction = this.editAttraction.bind(this)
    }


    // setShow(show, id) {
    //     this.setState({ show: show, id: id});
    // }

    // setAdd(add) {
    //     this.setState({ add: add});
    // }

    // setEdit(edit, id) {
    //     this.setState({ edit: edit, editId: id})
    // }

    componentDidMount() {
        myAxios.get(`http://localhost:8080/attraction`)
            .then(res => {
                console.log(res);
                const attraction = res.data;
                this.setState({ attraction });
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
                ATRAKCJE
            </div>
            <div className='page-container'>
                <h1>Miejsca warte zobaczenia</h1>
                {this.state.isError &&
                    <Alert variant="danger" style = {{textAlign: "center", width: "100%"}}> 
                    Backend nie działa!!!
                    </Alert>
                }
                <h4>

                </h4>
                <p>
                    
                </p>
            </div>
            </>
        );
    }
}


