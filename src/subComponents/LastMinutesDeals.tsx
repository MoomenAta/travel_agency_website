import React from 'react'
import { trip } from '../interfaces';
import '../styles/lastMinutesComponent.css'
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from 'react-router-dom'

export default function LastMinutesDeals({name , rowId, star , price , img ,description}:trip) {
    let navigate = useNavigate();

return (
    <div className='lmd-route-component'>
            <div style={{cursor : 'pointer'}} onClick={()=> navigate(`/trip/${rowId}`)} className='img-part'>
                <LazyLoadImage src={`https://travelagency7.infinityfreeapp.com/travelWebsite/api/upload/imgs/${img}`} alt='img-route' />
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
                </div>
            </div>
            <div className='text-part'>
                <div className='text-part-head'>
                <h1>{name} Hotel</h1>
                </div>
                <div className='hotels-text-part-body'>
                <div className='body-row-1'>
                    <p>
                    {description}
                    </p>
                </div>
                </div>
            </div>
            </div>
  )
}
