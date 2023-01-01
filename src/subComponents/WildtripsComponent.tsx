import React from 'react'
import { useNavigate } from 'react-router-dom'
import { trip } from '../interfaces';
import '../styles/wildtripscomponent.css'
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function WildtripsComponent({name , rowId, star , price , img }:trip) {
    let navigate = useNavigate();
    return (
        <>
        <div className='route-component'>
            <div style={{cursor : 'pointer'}} onClick={()=> navigate(`/trip/${rowId}`)} className='img-part'>
                <LazyLoadImage src={`${process.env.REACT_APP_API_LINK}/upload/imgs/${img}`} alt='img-route' />
                <div className='img-part-text-container'>
                <div className='img-part-text-col-1'>
                    <span className='star'>
                        {star} 
                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 53.867 53.867"  xmlSpace="preserve">
                        <polygon points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 
                        10.288,52.549 13.467,34.013 0,20.887 18.611,18.182 "/>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        </svg>

                    </span>
                    <span className='price'>
                    $ {price}
                    </span>
                </div>
                <span className='save'>
                    <span className='date'>9/10</span>
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 512 512"  xmlSpace="preserve">
                <g>
                    <g>
                    <polygon points="68.267,0 68.267,512 85.333,512 256,341.333 426.667,512 443.733,512 443.733,0 		"/>
                    </g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                </svg>
                </span>
                </div>
            </div>
            <div className='text-part'>
                <div className='text-part-head'>
                <h1>{name} Bike Ride</h1>
                <p>
                    <span>Person :</span>
                    <span>2</span>
                </p>
                </div>
                <div className='text-part-body'>
                <div className='body-col-1'>
                    <p>
                    <span>Transport:</span>
                    <span>Quad Bike</span>
                    </p>
                    <p>
                    <span>Distance:</span>
                    <span>20 km</span>
                    </p>
                </div>
                <div className='body-col-2'>
                    <span>Max speed:</span>
                    <p className='max-speed-nums'><span>80-90</span><span>km-/H</span></p>
                </div>
                </div>
            </div>
            </div>
            </>
    )
}
