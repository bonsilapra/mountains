import React from 'react';
import './Commons.css';

export class Background extends React.Component {


    render() {
        return (
            <div style={{backgroundImage: `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(${this.props.image})`}} className="background">
            </div>
        );
    }
}

