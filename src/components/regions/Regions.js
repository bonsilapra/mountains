import React, { useState, useCallback, useEffect } from 'react';
import backgroundImage from '../../images/regionsBackground.jpg';
import mapa from '../../images/polska.png';
import { Background } from '../commons/Background';
import ImageMapper from 'react-img-mapper';
import '../commons/Commons.css';


export default function Regions() {


    const [mapAreas, setMapAreas] = useState({
        name: "",
        areas: [
            {id: 1, 
            shape: "circle", 
            coords: [87,286,7], 
            preFillColor: "#3B3B3D",
            areaKeyName: "Kotlina Kłodzka",
            fillColor: "#ABB0C4",
            },
            {id: 2, 
                shape: "circle", 
                coords: [60,253,7], 
                preFillColor: "#3B3B3D",
                areaKeyName: "Okolice Jeleniej Góry",
                fillColor: "#ABB0C4",
            },
            {id: 3, 
                shape: "circle", 
                coords: [81,259,7], 
                preFillColor: "#3B3B3D",
                areaKeyName: "Okolice Wałbrzycha",
                fillColor: "#ABB0C4",
            },
            {id: 4, 
                shape: "circle", 
                coords: [225,368,7], 
                preFillColor: "#3B3B3D",
                areaKeyName: "Podhale",
                fillColor: "#ABB0C4",
            },
        ]
    });

    return (
        <>
        <Background image={backgroundImage}/>
        <div className="page-title">
            REGIONY
        </div>
        <div className='page-container'>
            <h1>Podział Polski na "regiony"</h1>
            <p>"Regiony" zostały określone przeze mnie jako obszary, po których przemieszczałam się w ramach jednego wyjazdu. Jest to tylko mój wymysł, który ułatwia planowanie wycieczek.</p>
            <div> 
                <ImageMapper
                    src={mapa}
                    map={mapAreas}
                    alt="Mapa Polski"
                />
                {/* <img 
                    src={mapa}
                    alt="Mapa Polski"
                    usemap="#regiony"
                ></img>
                <map name="regiony">
                    <area 
                        shape="circle" 
                        coords="87,286,20"
                        alt="Kotlina Kłodzka" 
                        href=""/>
                </map> */}
            </div>
        </div>
        </>
    );
}


