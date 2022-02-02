import React, { useState, useEffect, useRef }  from 'react'
import { useParams } from "react-router-dom"
import myAxios from '../../utilities/myAxios';
import { Link } from 'react-router-dom'
import moment from 'moment';
import { MyButton } from '../button/MyButton';
import { TripsEditModal } from './TripsEditModal';
import { BackgroundFromBE } from '../commons/BackgroundFromBE';
import './Trips.css';
import '../commons/Commons.css';
import FileUpload  from './FileUpload';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

export function Trip() {   

    window.scrollTo(0,0)

    let params = useParams();

    const [trip, setTrip]=useState([]);
    const [isError, setError]=useState(false);
    const [photos, setPhotos]=useState([]);

    useEffect(()=> {
        myAxios.get(`trip/${params.id}`)
            .then(res => {
                const trip = res.data;
                setTrip(trip);
                setPhotos(trip.photos.sort(function compare(a, b) {
                    return a.name.localeCompare(b.name)
                    })
                    .map((photo) => {
                    return {original: `data:image/jpeg;base64,${photo.photo64}`,
                            id: photo.id}
                }));
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

    const editTrip = (name, description, date, mapaTurystycznaLink, region, mountainRanges, peaks) => {
        myAxios.put(`trip`,{
            id: trip.id,
            name: name,
            description: description,
            date: date,
            mapaTurystycznaLink: mapaTurystycznaLink,
            region: region,
            mountainRanges: mountainRanges,
            peaks: peaks
        })
        .then((response) => {
            setTrip(response.data);
            setEdit(false);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const imageGalleryRef = useRef(null);

    function deleteImage() {
        imageGalleryRef.current.getCurrentIndex();
        myAxios.delete(`trip/`+ trip.id + `/photo/` + photos[imageGalleryRef.current.getCurrentIndex()].id)
        .then((response) => {
            setPhotos(
                photos.filter(element => {
                    return element.id!==photos[imageGalleryRef.current.getCurrentIndex()].id
                })
            );
        })
        .catch((error) => {
            console.log(error);
        });
    }


    const userLogin = JSON.parse(sessionStorage.getItem('userLogin'))

    return (
        <>
            {trip.photos && trip.photos.length!=0 &&
            <BackgroundFromBE image={trip.photos[Math.floor(Math.random() * trip.photos.length)]}/>
            }
            <div className="page-title">
                WYCIECZKI
            </div>
            {trip &&
            <div className='page-container' >   
                <Link to={"/trips"} state={{ tripId: trip.id }}>
                    <MyButton>
                        Powrót do listy wycieczek <i className="fas fa-undo-alt"></i>
                    </MyButton>
                </Link>     
                <h1>{trip.name} - <span style={{whiteSpace: "nowrap"}}>{moment(trip.date, "DD-MM-YYYY hh:mm:ss").format("YYYY-MM-DD")}</span></h1>
                {userLogin!=null && userLogin.roles.includes("ADMIN") &&
                    <MyButton 
                        buttonStyle='btn--primary'
                        onClick={(event)=> {toggleEditModal(true); event.stopPropagation()}}>
                            <i className="fas fa-pen"></i>                   
                    </MyButton>
                }
                <TripsEditModal show={edit} setOpen={setEdit} editObject={trip} editTrip={editTrip}/>
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
                            <li key={mRange.id}> 
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
                    <ul className="list-no-bullets-center" style={{whiteSpace: "pre-wrap"}}>
                        {trip.peaks.sort(function compare(a, b) {
                                if (a.height>b.height)
                                    return -1
                                if (a.height<b.height)
                                    return 1
                                return 0
                                })
                        .map((peak) =>
                            <li key={peak.id} style={{whiteSpace: "pre-wrap"}}>
                                <Link 
                                    className='link'
                                    to={"/peaks"}
                                    state={{ peakId: peak.id }}
                                >
                                    <h5>{peak.name}</h5>
                                </Link>
                                    wysokość {peak.height} m n.p.m. <br />
                                    {peak.isKGP==true ? (
                                        <b>Szczyt należy do Korony Gór Polski.</b>): (null)} 
                                
                            </li>
                        )}
                    </ul>
                </>
                }
                {photos && photos.length !=0 &&
                <>
                    <h4>Zdjęcia</h4>
                    <div style={{opacity:"100%", marginBottom: "15px"}}>
                        <ImageGallery 
                            items={photos} 
                            showBullets={true}
                            ref={imageGalleryRef}
                        />
                    </div>
                    {userLogin!=null && userLogin.roles.includes("ADMIN") &&
                        <MyButton 
                            buttonStyle='btn--outline'
                            onClick={()=> deleteImage()}>
                                <i className="fas fa-trash"></i>                   
                        </MyButton>
                    }
                </>
                }
                {userLogin!=null && userLogin.roles.includes("ADMIN") &&
                    <FileUpload tripId={trip.id}/>
                }
                <br />
                <Link to={"/trips"} state={{ tripId: trip.id }}>
                    <MyButton>
                        Powrót do listy wycieczek <i className="fas fa-undo-alt"></i>
                    </MyButton>
                </Link> 
            </div>
            }
        </>
    )
}
