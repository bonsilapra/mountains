import React from 'react';
import backgroundImage from '../../images/mountainRangesBackground.jpg';
import { Background } from '../commons/Background';
import myAxios from '../../utilities/myAxios';
import Alert from 'react-bootstrap/Alert';
import { MRPostcard } from './MRPostcard'
import './MountainRanges.css';
import '../commons/Commons.css';



export class MountainRanges extends React.Component {

    constructor(props) {
        super(props);
        this.state = {peak: [], isError: false, show: false, add: false, edit: false, editId:"", id:"", editObject:{}}
        window.scrollTo(0,0)
    }

    componentDidMount() {
        myAxios.get(`mountainRange`)
            .then(res => {
                const mountainRange = res.data;
                this.setState({ mountainRange });
                }
            )
            .catch(error => {
                this.setState({ isError: true });
                }
            )
        }

    render() {
        return (
            <>
            <Background image={backgroundImage}/>
            <div className="page-title">
                PASMA GÓRSKIE
            </div>
            <div className='page-container' >
                <h1>Pasma górskie uwzględnione w Koronie Gór Polski</h1>
                {this.state.isError &&
                    <Alert variant="danger" style = {{textAlign: "center", width: "100%"}}> 
                        Backend nie działa!!!
                    </Alert>
                }
                <div className='cards-container'>
                    {this.state.mountainRange &&
                    this.state.mountainRange.sort(function compare(a, b) {
                        return a.name.localeCompare(b.name)
                        })
                        .map((mRange) =>
                            <MRPostcard key={mRange.id} id={mRange.id} peak={mRange.peaks} name={mRange.name} img={mRange.photo}/>
                        )
                    }
                </div>
            </div>
            </>
        );
    }
}


