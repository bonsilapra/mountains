import React from 'react';
import './Commons.css';

export class BackgroundFromBE extends React.Component {


    render() {
        return (
            <div style={{backgroundImage: `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url("data:image/jpeg;base64,${this.props.image.photo64}")`}} className="background">
            </div>
        );
    }
}

