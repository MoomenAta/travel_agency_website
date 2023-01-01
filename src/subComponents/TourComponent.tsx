import React , {useState , useMemo, useEffect} from 'react'
import { trip } from '../interfaces';
import styles from '../styles/tourComponentStyles.module.css'
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from 'react-router-dom'
import { Notification } from './Notification';
import { useAppDispatch, useAppSelector } from '../hooks';
import { RootState } from '../store/store';
import { setToReserve } from '../store/toReserveTripsSlice';

export default function TourComponent({name , rowId , description , img , price , star , adate , ddate , ticketsAvailable }:trip) {
    let navigate = useNavigate();
    let toReserve = useAppSelector((state:RootState)=> state.toReserve)
    let loggedIn  = useAppSelector( (state : RootState) => state.login)
    let [reservedTrip , setReservedTrip] = useState<boolean>(false);
    let dispatch = useAppDispatch();
    let [openNotification , setON ] = useState<boolean>(false)
    let success : boolean = true;

    const updateRes = useMemo(()=>{
        if(toReserve && toReserve.findIndex(reservation => +reservation.rowId === +rowId!) >=0){
            return true
        }else{
            return false;
        }
    },[toReserve,rowId])
    
    async function bookNow(){
    if(reservedTrip){
        return;
    }

    if(loggedIn.user?.userId){
        
        if(localStorage.getItem('reservedTrips')){
        dispatch(setToReserve([...toReserve,{rowId , name , img , adate , ddate ,price }]))
        
        }else{
        dispatch(setToReserve([{rowId , name , img , adate , ddate ,price }]))
        }
        
        }else{
            alert('You must login to continue')
        }
    }

    useEffect(()=>{
        setReservedTrip(updateRes);
        
    },[updateRes])
    return (
        <div className={styles.tourComponentContainer}>
            <div style={{cursor : 'pointer'}} onClick={()=> navigate(`/trip/${rowId}`)} className={styles.tourImg}>
                <LazyLoadImage src={`https://travelagency7.infinityfreeapp.com/travelWebsite/api/upload/imgs/${img}`} alt={`${img}`} width={500} height={500} />
                
            </div>
            <div className={styles.tourInfo}>
                <div className={styles.headPrice}>
                    <h1>{name}</h1>
                    <span>$ {price}</span>
                </div>
                <div className={styles.locationRatingDescription}>
                    <div className={styles.tourLocation}>
                        <span className='location-icon'></span> <p>{name}</p>
                    </div>
                    <div className={styles.tourRating}>
                        {
                            Array.from({length : star} , (item , index)=>{return <span key={index} className='star-icon'></span>})
                        }
                        
                    </div>
                    <div className={styles.tourDescription}>
                        <p>
                            {description}
                        </p>
                    </div>
                </div>
                <div className={styles.dateCTAButton}>
                    <div className={styles.datePersonsRooms}>
                        <div className={styles.date}>
                            <span className='date-icon'></span>
                            <span>{adate}</span>
                        </div>
                        <div className={styles.persons}>
                            <span className='person-icon'></span>
                            <span>5 People</span>
                        </div>
                        <div className={styles.rooms}>
                            <span className='room-icon'></span>
                            <span>3 Rooms</span>
                        </div>
                    </div>

                    <div className={styles.ctaButtons}>
                        <button className={styles.heartButton}>
                            <span className='heart-icon'></span>
                        </button>
                        <button onClick={bookNow} className={`${styles.ctaButton} ${reservedTrip ? 'disableBtn' : ''}`}>
                            Contact
                        </button>
                    </div>
                </div>
            </div>
            {openNotification && <Notification success={success} msg='Successfully Added To Reservation List' openNotification={openNotification} setON={setON} />}
        </div>
    )
}
