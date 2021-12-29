import React, { useState, useEffect }  from 'react'
import { useParams } from "react-router-dom"
import myAxios from '../../utilities/myAxios';
import { Link } from 'react-router-dom'
import moment from 'moment';
import './MountainRanges.css';
import '../commons/Commons.css';

export function MountainRange() {
    

    window.scrollTo(0,0)
    

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

    // const [peak, setPeak] = useState(" ");
    // const [add, setAdd] = useState(" ")
    
    // useEffect(()=> {
    //     const addNewPeak = (name, description, height, isKGP, mountainRange, trips) => {
    //         myAxios.post(`peaks`,{
    //             name: name,
    //             description: description,
    //             height: height,
    //             isKGP: isKGP,
    //             mountainRange: mountainRange,
    //             trips: trips
    //             }
    //         )
    //         .then(response => {
    //             const enterPeak = () => {
    //                 setPeak({peak: [...peak, response.data]})
    //             }
    //             const openAdd = () => {
    //                 setAdd(false)
    //             }
    //             }
    //         )
    //         .catch(error => {
    //             setError(true);
    //             }
    //         )
    //     }
    // },[]);

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
                <h6> Region: <Link 
                        to={"/regions"}
                        state={{ regionId: mountainRange.region.id }}
                    >
                        {mountainRange.region.name}
                    </Link>
                </h6>
                }
                <h4>Szczyty</h4>
                <p style={{whiteSpace: "pre-wrap"}}>
                {mountainRange.peaks &&
                <>
                <ul className="list-no-bullets">
                    {mountainRange.peaks.sort(function compare(a, b) {
                            if (a.height>b.height)
                                return -1
                            if (a.height<b.height)
                                return 1
                            return 0
                            })
                    .map((peak) =>
                    
                        <li style={{whiteSpace: "pre-wrap"}}>
                            <Link 
                                className='link'
                                to={"/peaks"}
                                state={{ peakId: peak.id }}
                            >
                                {peak.name}
                            </Link>
                                : wysokość {peak.height} m n.p.m. - {peak.description} <br />
                                {peak.isKGP==true ? (
                                    <b>Szczyt należy do Korony Gór Polski.</b>): (null)}
                        </li>
                    )}
                </ul>
                </>
                }
                </p>
                <h4>Wycieczki</h4>
                {mountainRange.trips != null && mountainRange.trips.length != 0 ?
                    (
                    <ul className="list-no-bullets">
                        {mountainRange.trips.map((trip) =>
                            <li><b><Link 
                            className='link'
                            to={"/trips"}
                            state={{ tripId: trip.id }}
                        >{trip.name}</Link></b> 
                        ({moment(trip.date, "DD-MM-YYYY hh:mm:ss").format("YYYY-MM-DD")}) - {trip.description}</li>
                        )}
                    </ul>
                    ):
                    (<h6>Będą wkrótce :&#41;</h6>)
                            
                }
            </div>
            }
        </>
    )
}
