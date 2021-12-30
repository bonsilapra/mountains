import React, { useState, useEffect }  from 'react'
import { useParams } from "react-router-dom"
import myAxios from '../../utilities/myAxios';
import { Link } from 'react-router-dom'
import moment from 'moment';
import './Trips.css';
import '../commons/Commons.css';

export function Trip() {
    

    window.scrollTo(0,0)
    

    let params = useParams();

    const [trip, setMRange]=useState([]);
    const [isError, setError]=useState(false);

    useEffect(()=> {
        myAxios.get(`trip/${params.id}`)
            .then(res => {
                const trip = res.data;
                setMRange(trip);
                }
            )
            .catch(error => {
                setError(true);
                }
            )
    },[]);

    const userLogin = JSON.parse(sessionStorage.getItem('userLogin'))

    return (
        <>
            <div className="page-title">
                WYCIECZKI
            </div>
            {trip &&
            <div className='page-container' >        
                <h1>{trip.name} - {moment(trip.date, "DD-MM-YYYY hh:mm:ss").format("YYYY-MM-DD")}</h1>
                <h4>Opis</h4>
                <p style={{whiteSpace: "pre-wrap"}}>
                    {trip.description}
                </p>
                {trip.region &&
                <h6> Region: <Link 
                        to={"/regions"}
                        state={{ regionId: trip.region.id }}
                    >
                        {trip.region.name}
                    </Link>
                </h6>
                }
                Pasmo górskie:
                <ul className="list-no-bullets-center">
                    {trip.mountainRanges != null ? 
                        (trip.mountainRanges.map((mRange) =>
                            <li>
                                <Link to={"/mountainRange/"+ mRange.id}
                                state={{ mountainRangeId: mRange.id }}
                                className="link"
                                >
                                    {mRange.name}
                                </Link> 
                            </li>
                        ))
                    : (<p></p>)}
                </ul>
                <h4>Trasa</h4>
                <div style={{ maxWidth:"900px", width: "90%", overflow: "hidden" }}><iframe src={trip.mapaTurystycznaLink} height="680" frameborder="0" style={{width: "100%", border:0}}></iframe></div>
                <h4>Szczyty</h4>
                <p style={{whiteSpace: "pre-wrap"}}>
                {trip.peaks &&
                <>
                <ul className="list-no-bullets">
                    {trip.peaks.sort(function compare(a, b) {
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
                                : wysokość {peak.height} m n.p.m. <br />
                                {peak.isKGP==true ? (
                                    <b>Szczyt należy do Korony Gór Polski.</b>): (null)}
                        </li>
                    )}
                </ul>
                </>
                }
                </p>
            </div>
            }

        </>
    )
}
