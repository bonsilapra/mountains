import React, { useState, useEffect }  from 'react'
import { useParams } from "react-router-dom"
import myAxios from '../../utilities/myAxios';
import { Link } from 'react-router-dom'
import './MountainRanges.css';
import '../commons/Commons.css';

export function MountainRange() {
    
    let params = useParams();

    const [mountainRange, setMRange]=useState([]);
    const [isError, setError]=useState(false);

    useEffect(()=> {
        myAxios.get(`mountainRange/${params.id}`)
            .then(res => {
                const mountainRange = res.data;
                setMRange(mountainRange);
                console.log(mountainRange)
                }
            )
            .catch(error => {
                setError(true);
                }
            )
    },[]);

    const [peak, setPeak] = useState(" ");
    const [add, setAdd] = useState(" ")
    
    useEffect(()=> {
        const addNewPeak = (name, description, height, isKGP, mountainRange, trips) => {
            myAxios.post(`peaks`,{
                name: name,
                description: description,
                height: height,
                isKGP: isKGP,
                mountainRange: mountainRange,
                trips: trips
                }
            )
            .then(response => {
                const enterPeak = () => {
                    setPeak({peak: [...peak, response.data]})
                }
                const openAdd = () => {
                    setAdd(false)
                }
                }
            )
            .catch(error => {
                setError(true);
                }
            )
        }
    },[]);

    return (
        <>
            <div className="page-title">
                PASMA GÓRSKIE
            </div>
            {mountainRange &&
            <div className='page-container' >        
                <h1>{mountainRange.name}</h1>
                <h4>Opis</h4>
                <p style={{whiteSpace: "pre-wrap"}}>
                    {mountainRange.description}
                </p>
                {mountainRange.region &&
                <p> Region: <Link 
                        to={"/regions"}
                        state={{ regionId: mountainRange.region.id }}
                    >
                        {mountainRange.region.name}
                    </Link>
                </p>
                }
                <h4>Szczyty</h4>
                {mountainRange.peaks &&
                <>
                {mountainRange.peaks.map((peak) =>
                    <ul className="list-no-bullets">
                        <li style={{whiteSpace: "pre-wrap"}}><b>{peak.name}</b> - wysokość {peak.height} m n.p.m. - {peak.description} <br /></li>
                        {peak.isKGP==true ? (
                            <li><b>Szczyt należy do Korony Gór Polski.</b> <br /></li>
                            
                        ): (null)}
                    </ul>)}
                </>
                }
                <h4>Wycieczki</h4>
                {mountainRange.trips &&
                <>
                    {/* Do uzupełnienia */}
                </>
                }
            </div>
            }
        </>
    )
}
