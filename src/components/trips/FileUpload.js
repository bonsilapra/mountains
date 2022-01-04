import React from 'react';
import myAxios from '../../utilities/myAxios';
import { MyButton } from '../button/MyButton';
import './Trips.css';
import '../commons/Commons.css';

class FileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            image_file: null,
            image_preview: '',
        }
    }

    // Image Preview Handler
    handleImagePreview = (e) => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0];

        this.setState({
            image_preview: image_as_base64,
            image_file: image_as_files,
        })
    }

    // Image/File Submit Handler
    handleSubmitFile = () => {
        if (this.state.image_file !== null){
            let formData = new FormData();
            formData.append('customFile', this.state.image_file);
            // the image field name should be similar to your api endpoint field name
            // in my case here the field name is customFile
            myAxios.post(
                `photo/upload`,
                formData,
                {
                    headers: {
                        "Authorization": "YOUR_API_AUTHORIZATION_KEY_SHOULD_GOES_HERE_IF_HAVE",
                        "Content-type": "multipart/form-data",
                    },                    
                }
            )
            .then(res => {
                console.log(`Success` + res.data);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }


    // render from here
    render() { 
        return (
            <div>
                {/* image preview */}
                <img src={this.state.image_preview} alt="image preview" style={{maxWidth: "70vw"}} />

                {/* image input field */}
                <input
                    type="file"
                    onChange={this.handleImagePreview}
                />
                <label>Upload file</label>
                <input type="submit" onClick={this.handleSubmitFile} value="Submit"/>
            </div>
        );
    }
}

export default FileUpload;