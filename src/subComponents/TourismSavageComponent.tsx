import React from 'react'
import styled from 'styled-components'
import { trip } from '../interfaces';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from 'react-router-dom'

export default function TourismSavageComponent( props : trip) {
    let navigate = useNavigate();
    return (
        <Component>
            <div style={{cursor : 'pointer'}} onClick={()=> navigate(`/trip/${props.rowId}`)} className="image-part">
                <LazyLoadImage src={`${process.env.REACT_APP_API_LINK}/upload/imgs/${props.img}`} alt={`${props.img}`} />
                
                <span className="stars">
                    {props.star} 
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 53.867 53.867" xmlSpace="preserve">
                    <polygon style={{fill:'#EFCE4A'}} points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 
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
                <span className="price">
                    $ {props.price} 
                </span>
            </div>
            <div className="info-part">
                <h3 title={props.name}>{props.name}</h3>
                <p title={props.description}>{props.description}...</p>
            </div>
        </Component>
    )
}

const Component = styled.div`


    scroll-snap-align: start;
    min-width: 16rem;
    flex-shrink: 0;
    position: relative;
    background-color: rgb(248, 248, 248);
    height: 20rem;
    padding: 0rem;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0px 4px 16px rgba(128, 128, 128, 0.16);

    .image-part{
        position: relative;
        width: 100%;
        height: 70%;
        
        img{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 0;
        }

        span{
            position: relative;
            z-index: 1;
            padding: 0.5rem;
            border-radius: 0.5rem;
            display: inline-block;
            margin: 1rem 0.5rem 1rem;
            background-color: white;
            color: black;
            font-weight: bold;
            font-size: 0.8rem;
        }
        .stars{
            width: 2.5rem;
            text-align: center;
        }
        .stars svg{
            width: 0.7rem;
            height: 0.7rem;
        }
    }
    .info-part{
        padding: 0.5rem 1rem;
        h3{
            padding: 0.5rem 0;
            font-size: 1.2rem;
        }
        p{
            line-height: 1.2;
            font-size: 0.8rem;
        }
    }

`
