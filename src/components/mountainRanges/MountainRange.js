import React, { useState, useEffect }  from 'react'
import { BackgroundFromBE } from '../commons/BackgroundFromBE';
import { useParams } from "react-router-dom"
import myAxios from '../../utilities/myAxios';
import { Link } from 'react-router-dom'
import moment from 'moment';
import { MyButton } from '../button/MyButton';
import { MREditModal } from './MREditModal';
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
                }
            )
            .catch(error => {
                setError(true);
                }
            )
    },[]);

    const [edit, setEdit] = useState(false);

    const toggleEditModal =(toggle) => {
        setEdit(toggle);
    }

    const editMRange = (name, description) => {
        myAxios.put(`mountainRange`,{
            id: mountainRange.id,
            name: name,
            description: description,
            region: mountainRange.region,
            peaks: mountainRange.peaks,
            trips: mountainRange.trips,
            photo: mountainRange.photo,
        })
        .then((response) => {
            setMRange(response.data);
            setEdit(false);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const userLogin = JSON.parse(sessionStorage.getItem('userLogin'))


    return (
        <>
            {mountainRange.photo &&
                <BackgroundFromBE image= {mountainRange.photo}/>
            }
            <div className="page-title">
                PASMA GÓRSKIE
            </div>
            {mountainRange &&
                <div className='page-container' > 
                    <Link to={"/mountainRanges"}>
                        <MyButton>
                            Powrót do listy pasm górskich <i className="fas fa-undo-alt"></i>
                        </MyButton>
                    </Link>        
                    <h1>{mountainRange.name}</h1>
                    <h4>Opis</h4>
                    {userLogin!=null && userLogin.roles.includes("ADMIN") &&
                        <div style={{marginBottom:"20px"}}>
                            <MyButton 
                                buttonStyle='btn--primary'
                                onClick={(event)=> {toggleEditModal(true); event.stopPropagation()}}>
                                    <i className="fas fa-pen"></i>                   
                            </MyButton>
                        </div>
                    }
                    <MREditModal show={edit} setOpen={setEdit} editObject={mountainRange} editMRange={editMRange}/>
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
                    {mountainRange.peaks &&
                        <>
                            <ul className="list-no-bullets-center" style={{whiteSpace: "pre-wrap"}}>
                                {mountainRange.peaks.sort(function compare(a, b) {
                                        if (a.height>b.height)
                                            return -1
                                        if (a.height<b.height)
                                            return 1
                                        return 0
                                        })
                                .map((peak) =>
                                    <li key={peak.id} style={{whiteSpace: "pre-wrap", marginBottom: "10px"}}>
                                        <Link 
                                            className='link'
                                            to={"/peaks"}
                                            state={{ peakId: peak.id }}
                                        >
                                            <h5>{peak.name}</h5>
                                        </Link>
                                        <p style={{margin: "0"}}>Wysokość <b>{peak.height}</b> m n.p.m.</p>
                                        <p style={{margin: "0", textAlign: "justify"}}>{peak.description}</p> 
                                            {peak.isKGP==true ? (
                                                <b>Szczyt należy do Korony Gór Polski.</b>): (null)}
                                    </li>
                                )}
                            </ul>
                        </>
                    }
                    <h4>Wycieczki</h4>
                    {mountainRange.trips != null && mountainRange.trips.length != 0 ?
                        (
                        <ul className="list-no-bullets-center-line">
                            {mountainRange.trips.map((trip) =>
                                <li key={trip.id}>
                                    <b><Link 
                                        className='link'
                                        to={"/trip/" + trip.id}
                                        state={{ tripId: trip.id }}
                                    >
                                        {trip.name}
                                    </Link></b> 
                                    &nbsp;({moment(trip.date, "DD-MM-YYYY hh:mm:ss").format("YYYY-MM-DD")})
                                </li>
                            )}
                        </ul>
                        ):
                        (<h6>Będą wkrótce :&#41;</h6>)
                    }
                    <Link to={"/mountainRanges"}>
                        <MyButton>
                            Powrót do listy pasm górskich <i className="fas fa-undo-alt"></i>
                        </MyButton>
                    </Link> 
                </div>
            }
        </>
    )
}
