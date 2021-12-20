import React, { useState, useEffect } from 'react';
import backgroundImage from '../../images/regionsBackground.jpg';
import polandMap from '../../images/poland.png';
import smallPolandMap from '../../images/smallPoland.png';
import { Background } from '../commons/Background';
import ImageMapper from 'react-img-mapper';
import myAxios from '../../utilities/myAxios';
import '../commons/Commons.css';
import './Regions.css';


export default function Regions() {

    const [mapAreas, setMapAreas] = useState({
        name: "polska-normal",
        areas: [
            {
                id: 1,
                shape: "circle",
                coords: [149, 429, 10],
                preFillColor: "#3B3B3D",
                areaKeyName: "Kotlina Kłodzka",
                fillColor: "#ABB0C4",
            },
            {
                id: 2,
                shape: "circle",
                coords: [105, 380, 10],
                preFillColor: "#3B3B3D",
                areaKeyName: "Okolice Jeleniej Góry",
                fillColor: "#ABB0C4",
            },
            {
                id: 3,
                shape: "circle",
                coords: [134, 387, 10],
                preFillColor: "#3B3B3D",
                areaKeyName: "Okolice Wałbrzycha",
                fillColor: "#ABB0C4",
            },
            {
                id: 4,
                shape: "circle",
                coords: [337, 530, 10],
                preFillColor: "#3B3B3D",
                areaKeyName: "Podhale",
                fillColor: "#ABB0C4",
            },
            {
                id: 5,
                shape: "circle",
                coords: [294, 494, 10],
                preFillColor: "#3B3B3D",
                areaKeyName: "Okolice Żywca",
                fillColor: "#ABB0C4",
            },
            {
                id: 6,
                shape: "circle",
                coords: [371, 505, 10],
                preFillColor: "#3B3B3D",
                areaKeyName: "Okolice Nowego Sącza",
                fillColor: "#ABB0C4",
            },
            {
                id: 7,
                shape: "circle",
                coords: [480, 533, 10],
                preFillColor: "#3B3B3D",
                areaKeyName: "Bieszczady",
                fillColor: "#ABB0C4",
            },
        ]
    });

    const [smallMapAreas, setSmallMapAreas] = useState({
        name: "polska-small",
        areas: [
            {
                id: 1,
                shape: "circle",
                coords: [72, 242, 7],
                preFillColor: "#3B3B3D",
                areaKeyName: "Kotlina Kłodzka",
                fillColor: "#ABB0C4",
            },
            {
                id: 2,
                shape: "circle",
                coords: [45, 213, 7],
                preFillColor: "#3B3B3D",
                areaKeyName: "Okolice Jeleniej Góry",
                fillColor: "#ABB0C4",
            },
            {
                id: 3,
                shape: "circle",
                coords: [64, 216, 7],
                preFillColor: "#3B3B3D",
                areaKeyName: "Okolice Wałbrzycha",
                fillColor: "#ABB0C4",
            },
            {
                id: 4,
                shape: "circle",
                coords: [186, 302, 7],
                preFillColor: "#3B3B3D",
                areaKeyName: "Podhale",
                fillColor: "#ABB0C4",
            },
            {
                id: 5,
                shape: "circle",
                coords: [162, 281, 7],
                preFillColor: "#3B3B3D",
                areaKeyName: "Okolice Żywca",
                fillColor: "#ABB0C4",
            },
            {
                id: 6,
                shape: "circle",
                coords: [206, 287, 7],
                preFillColor: "#3B3B3D",
                areaKeyName: "Okolice Nowego Sącza",
                fillColor: "#ABB0C4",
            },
            {
                id: 7,
                shape: "circle",
                coords: [275, 306, 7],
                preFillColor: "#3B3B3D",
                areaKeyName: "Bieszczady",
                fillColor: "#ABB0C4",
            },
        ]
    });

    const [area, setAreaName] = useState(" ");

    const enterArea = (area) => {
        setAreaName(area.areaKeyName)
    }

    const leaveArea = (area) => {
        setAreaName(" ")
    }


    const onMapClick = (area) => {
        let regionFound = regions.find(element => element.name == area.areaKeyName)
        if (regionFound!==undefined) {
            document.getElementById('region' + regionFound.id).scrollIntoView()
        }
    }

    const [resize, setResizeMap] = useState(true);

    const resizeMap = () => {
        if (window.innerWidth <= 768) {
            setResizeMap(false);
        } else {
            setResizeMap(true);
        }
    };
    useEffect(() => {
        resizeMap();
    }, []);
    window.addEventListener('resize', resizeMap);


    let [regions, setRegions] = useState([])

    useEffect(() => {
        const axiosPosts = async () => {
            const response = await myAxios('http://localhost:8080/region');
            setRegions(response.data);
        };
        axiosPosts();
    }, []);


    return (
        <>
            <Background image={backgroundImage} />
            <div className="page-title">
                REGIONY
            </div>
            {regions.length !== 0 && 
            <div className="page-container">
                <h1>Podział Polski na "regiony"</h1>
                <p>"Regiony" zostały określone przeze mnie jako obszary, po których przemieszczałam się w ramach jednego wyjazdu. Jest to tylko mój wymysł, który ułatwia planowanie wycieczek.</p>
                <div className>
                    {resize && <ImageMapper
                        src={polandMap}
                        map={mapAreas}
                        alt="Mapa Polski"
                        onMouseEnter={(area) => { enterArea(area) }}
                        onMouseLeave={(area) => { leaveArea(area) }}
                        onClick={(area) => { onMapClick(area) }}
                    />
                    }
                </div>
                <div>
                    {resize || <ImageMapper
                        src={smallPolandMap}
                        map={smallMapAreas}
                        alt="Mapa Polski"
                        onMouseEnter={(area) => { enterArea(area) }}
                        onMouseLeave={(area) => { leaveArea(area) }}
                        onImageClick={(area) => { leaveArea(area) }}
                    />
                    }
                </div>
                <h4>{area}</h4>
                <div>
                    {regions.map((region) =>
                        <div id={"region" + region.id}>
                            <h2>{region.name}</h2>
                            <p>{region.description}</p>
                            <ul>
                                {region.attractions.map((attraction) =>
                                    <li><b>{attraction.name}</b> - {attraction.description}</li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>   
            </div>
            }
        </>
    );
}


