import React from 'react'
import { Link } from 'react-router-dom'

export class MRPostcard extends React.Component {


    render() {
        return (
            <div>
                <Link className = "link" to={"/mountainRange/" + this.props.id}>{this.props.name}</Link>
            </div>
        );
    }
}