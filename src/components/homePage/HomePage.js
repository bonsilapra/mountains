import React from 'react'
import backgroundImage from '../../images/homePageBackground.jpg'
import { Background } from '../commons/Background'
import './HomePage.css'
import { Button } from './../button/Button';
import { Link } from 'react-router-dom';

export class HomePage extends React.Component {


    render() {
        return (
            <>
            <Background image={backgroundImage}/>
            <div className="home-page-container" >
                <h1>KORONA GÓR POLSKI</h1>
                <h2>I INNE GÓRSKIE WYCIECZKI</h2>
                <p>
                    Zapraszam do zapoznania się z trasami wycieczek w góry na terenie Polski.
                </p>
                <Link to="/mountainRanges">
                    <Button
                    buttonStyle='btn--primary'
                    buttonSize='btn--large'
                    >
                        Zaczynamy!
                    </Button>
                </Link> 
            </div>
            </>
        );
    }
}
