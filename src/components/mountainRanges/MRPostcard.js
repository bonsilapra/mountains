import React from 'react'
import { Link } from 'react-router-dom'
import './MountainRanges.css';
import '../commons/Commons.css';
import backgroundImage from '../../images/pieski.jpg';


export class MRPostcard extends React.Component {


    render() {
        return (
            <Link className = "link-cards" to={"/mountainRange/" + this.props.id}>
                <div className='card-items' style={{backgroundImage: `linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3)), url(${backgroundImage})`}}> 
                    {this.props.name}
                </div>
            </Link>
                
        );
    }
}