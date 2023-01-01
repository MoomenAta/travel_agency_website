import { trip } from '../interfaces';
import '../styles/hotelsComponent.css'
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from 'react-router-dom'

export default function HotelsComponent({name , rowId , star , price , img , description , dfrom , ticketsAvailable}:trip) {
        let navigate = useNavigate();
    return (
        <div className='hotels-route-component'>
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
                <span className='save'>
                    <span className='date'>{star*2}/10</span>
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
                <h1>{name}</h1>
                </div>
                <div className='hotels-text-part-body'>
                <div className='body-row-1'>
                    <p>
                    {description}
                    </p>
                </div>
                <div className='body-row-2'>
                    <p>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="red"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"/><circle cx="12" cy="9" r="2.5"/></svg>
                        </span>
                        <span>{dfrom}</span>
                    
                    </p>
                    <p>
                        <span className='room'>
                            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                viewBox="0 0 512 512" xmlSpace="preserve">
                            <g>
                                <g>
                                    <path d="M427.013,43.545H278.026c-6.668,0-12.076,5.407-12.076,12.076V160.53c0,6.668,5.407,12.076,12.076,12.076h148.987
                                        c6.669,0,12.076-5.406,12.076-12.074V55.621C439.088,48.953,433.681,43.545,427.013,43.545z M414.937,148.455H290.101V67.696
                                        h124.836V148.455z"/>
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path d="M317.025,88.652c-6.668,0-12.075,5.407-12.075,12.075v14.687c0,6.668,5.407,12.075,12.075,12.075
                                        c6.669,0,12.076-5.406,12.076-12.075v-14.687C329.1,94.059,323.693,88.652,317.025,88.652z"/>
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path d="M233.974,43.545H84.987c-6.668,0-12.076,5.407-12.076,12.076V160.53c0,6.668,5.407,12.076,12.076,12.076h148.987
                                        c6.668,0,12.075-5.406,12.075-12.074V55.621C246.05,48.953,240.642,43.545,233.974,43.545z M221.899,148.455H97.063V67.696
                                        h124.836V148.455z"/>
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path d="M194.975,88.652c-6.668,0-12.076,5.407-12.076,12.075v14.687c0,6.668,5.407,12.075,12.076,12.075
                                        s12.076-5.406,12.076-12.075v-14.687C207.051,94.059,201.643,88.652,194.975,88.652z"/>
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path d="M427.013,191.469H278.026c-6.668,0-12.076,5.407-12.076,12.075v104.911c0,6.668,5.407,12.075,12.076,12.075h148.987
                                        c6.669,0,12.076-5.406,12.076-12.075V203.544C439.088,196.876,433.681,191.469,427.013,191.469z M414.937,296.379H290.101v-80.76
                                        h124.836V296.379z"/>
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path d="M317.025,236.58c-6.668,0-12.075,5.407-12.075,12.076v14.689c0,6.668,5.407,12.076,12.075,12.076
                                        c6.669,0,12.076-5.407,12.076-12.076v-14.689C329.1,241.988,323.693,236.58,317.025,236.58z"/>
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path d="M233.974,191.469H84.987c-6.668,0-12.076,5.407-12.076,12.075v104.911c0,6.668,5.407,12.075,12.076,12.075h148.987
                                        c6.668,0,12.075-5.406,12.075-12.075V203.544C246.05,196.876,240.642,191.469,233.974,191.469z M221.899,296.379H97.063v-80.76
                                        h124.836V296.379z"/>
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path d="M194.975,236.58c-6.668,0-12.076,5.407-12.076,12.076v14.689c0,6.668,5.407,12.076,12.076,12.076
                                        s12.076-5.407,12.076-12.076v-14.689C207.051,241.988,201.643,236.58,194.975,236.58z"/>
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path d="M427.013,339.393H84.987c-6.668,0-12.076,5.407-12.076,12.076v104.91c0,6.668,5.407,12.076,12.076,12.076h342.026
                                        c6.669,0,12.076-5.406,12.076-12.076v-104.91C439.088,344.801,433.681,339.393,427.013,339.393z M414.937,444.304H97.063v-80.76
                                        h317.875V444.304z"/>
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path d="M266.264,391.853h-20.528c-6.668,0-12.075,5.407-12.075,12.076s5.407,12.075,12.075,12.075h20.528
                                        c6.668,0,12.075-5.407,12.075-12.075S272.932,391.853,266.264,391.853z"/>
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path d="M468.975,0h-37.479c-6.668,0-12.075,5.407-12.075,12.076c0,6.668,5.407,12.075,12.075,12.075H456.9v463.698H55.1V24.151
                                        h293.881c6.668,0,12.075-5.407,12.075-12.075C361.057,5.407,355.649,0,348.981,0H43.025c-6.668,0-12.075,5.407-12.075,12.076
                                        v487.849c0,6.668,5.407,12.075,12.075,12.075h425.95c6.669,0,12.075-5.407,12.075-12.075V12.076
                                        C481.051,5.407,475.643,0,468.975,0z"/>
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path d="M396.679,0h-9.057c-6.668,0-12.075,5.407-12.075,12.076c0,6.668,5.407,12.075,12.075,12.075h9.057
                                        c6.668,0,12.075-5.407,12.075-12.075C408.755,5.407,403.347,0,396.679,0z"/>
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
                        <span>Rooms available :</span><span>{ticketsAvailable}</span></p>
                </div>
                </div>
            </div>
            </div>
    )
}