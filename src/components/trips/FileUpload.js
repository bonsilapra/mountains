import React from 'react';
import myAxios from '../../utilities/myAxios';
import './Trips.css';
import '../commons/Commons.css';

class FileUpload extends React.Component {
    uploadJSONFiles(event) {
        event.preventDefault();
        let bodyFormData = new FormData(); 
        let jsonBodyData = { 'someKey': 'someValue' };
        for(let key of Object.keys(event.target.files)) {
            if (key !== 'length') {
                bodyFormData.append('files', event.target.files[key]);
            }
        }
        bodyFormData.append('jsonBodyData',
            new Blob([JSON.stringify(jsonBodyData)], { 
                type: 'application/json'
            }));
        myAxios({ 
            method: "post",
            url: '/trip/addPhoto',
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        }).then(response => response.json())
        .then(result => console.log('Files successfully uploaded!'))
        .catch(error => console.log('error occurred!')); 
    }

    render() {
        return (
            <div>
                <label>Upload Files</label>
                <input type="file"
                    onChange={(event) => this.uploadJSONFiles(event)} 
                    multiple/>
            </div>
        )
    }
}
export default FileUpload;