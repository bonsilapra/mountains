import React from 'react'
import { Link } from 'react-router-dom'
import './MountainRanges.css';
import '../commons/Commons.css';


export class MRPostcard extends React.Component {

    render() {
        return (
            <Link className = "link-cards" to={"/mountainRange/" + this.props.id}>
                {this.props.img != null ?
                (<div className='card-items' style={{backgroundImage: `linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3)), url("data:image/jpeg;base64,${this.props.img.photo64}")`}}> 
                    {this.props.name}
                </div>) :
                (<div className='card-items' style={{backgroundImage: `linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3))`}}> 
                    {this.props.name}
                </div>)
                }
            </Link>
                
        );
    }
}