import React from 'react';
import myAxios from '../../utilities/myAxios';
import './Trips.css';
import '../commons/Commons.css';
import { MyButton } from '../button/MyButton';


class FileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {bodyFormData: null}
        this.sendPhoto = this.sendPhoto.bind(this);
        this.choosePhoto = this.choosePhoto.bind(this);
    }

    choosePhoto(event) {
        event.preventDefault();
        let bodyFormData = new FormData(); 
        bodyFormData.append('name', event.target.files[0].name);
        bodyFormData.append('id', this.props.tripId);
        bodyFormData.append('file', event.target.files[0]);
        this.setState({bodyFormData: bodyFormData});
    }

    sendPhoto() {
        myAxios({ 
            method: "post",
            url: '/trip/addPhoto',
            data: this.state.bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        }).then(response => response.json())
        .then(result => console.log('Files successfully uploaded!'))
        .catch(error => console.log('error occurred!')); 
    }

    handleNameChange(event) {
        this.setState({form:{...this.state.form, name:event.target.value}});
    }


    render() {
        return (
            <div>
                <label>Wgraj zdjęcie</label>
                <input type="file"
                    onChange={(event) => this.choosePhoto(event)} 
                />
                <MyButton 
                    onClick={this.sendPhoto} 
                >Prześlij zdjęcie</MyButton>
                <br />
            </div>
        )
    }
}
export default FileUpload;