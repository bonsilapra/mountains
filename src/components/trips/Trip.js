import React, { useState, useEffect }  from 'react'
import { useParams } from "react-router-dom"
import myAxios from '../../utilities/myAxios';
import { Link } from 'react-router-dom'
import moment from 'moment';
import { MyButton } from '../button/MyButton';
import { TripsEditModal } from './TripsEditModal';
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

    const [edit, editId, editObject, setEdit] = useState(false);
    const [trip2, setTrip] = useState();



    const editTrip = (name, description, date, mapaTurystycznaLink, region, mountainRanges, peaks) => {
        myAxios.put(`trip`,{
            id: editId,
            name: name,
            description: description,
            date: date,
            mapaTurystycznaLink: mapaTurystycznaLink,
            region: region,
            mountainRanges: mountainRanges,
            peaks: peaks
        })
        .then((response) => {
            setTrip(trip2.map((element) => {
                if (element.id !== editId) {
                    return element
                } else {return response.data}
                
            }))
            setEdit(false);
        })
        .catch((error) => {
            console.log(error);
        })
    };

    const userLogin = JSON.parse(sessionStorage.getItem('userLogin'))

    return (
        <>
            <div className="page-title">
                WYCIECZKI
            </div>
            {trip &&
            <div className='page-container' >        
                <h1>{trip.name} - {moment(trip.date, "DD-MM-YYYY hh:mm:ss").format("YYYY-MM-DD")}</h1>
                <MyButton 
                    buttonStyle='btn--primary'
                    onClick={(event)=> {setEdit(true, trip.id, trip); event.stopPropagation()}}>
                        <i className="fas fa-pen"></i>                   
                </MyButton>
                <TripsEditModal show={edit} setOpen={setEdit} editTrip={editTrip} editObject={editObject}/>
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
                {trip.mapaTurystycznaLink &&
                <>
                    <h4>Trasa</h4>
                    <div style={{ maxWidth:"900px", width: "90%", overflow: "hidden" }}><iframe src={trip.mapaTurystycznaLink} height="680" frameBorder="0" style={{width: "100%", border:0}}></iframe></div>
                </>
                }
                <h4>Szczyty</h4>
                {trip.peaks &&
                <>
                    <ul className="list-no-bullets" style={{whiteSpace: "pre-wrap"}}>
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
                <br />
            </div>
            }
        </>
    )
}
