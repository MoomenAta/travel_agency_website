import React , {useState , useEffect, useCallback} from 'react'
import styles from '../styles/usersResevation.module.css'
import { bookingInterface } from '../interfaces'
import { deleteBooking } from '../globalFunctions'
export interface reservationProps {
    booking : bookingInterface,
    deleteReservation? : (id:number)=> void
}
export const Reservation = ({ booking , deleteReservation } : reservationProps )=> {
    
    return(
    <>
        <div className={styles.reservation}>
            <div className={styles.imgPart}>
                <img src={`${process.env.REACT_APP_API_LINK}/upload/imgs/${booking.img}`} alt='reserved trip' />
            </div>
            <div className={styles.reservationInfo}>
                <div className={styles.tripInfo}>
                    <h1>{booking.trip_title}</h1>
                    <div>
                        <span className='date-icon'></span>
                        <div className={styles.datesContainer}>
                            <span className={styles.adate}>{booking.adate}</span>
                            <span> - TO - </span>
                            <span className={styles.ddate}>{booking.ddate}</span>
                        </div>
                    </div>
                    <div> 
                        <p>{booking.price} $</p>
                        {booking.ship_place && <p> Seat On :{booking.ship_place}</p>}
                    </div>
                </div>
                <div className={styles.userInfo}>
                    <p>User Info : </p>
                    <h1>{booking.email}</h1>
                </div>
            </div>
            <div onClick={()=>deleteReservation && deleteReservation(booking.id)} className={styles.closeContainer}>
                <span className="close-icon"></span>
            </div>
        </div>
    </>)
}

export default function UsersReservation() {
    let [booking , setBooking] = useState<bookingInterface[]>([]);
    let [total , setTotal] = useState<number>(0);
    useEffect(()=>{
        let rootCss:any = document.querySelector(':root');
        rootCss.style.setProperty('--nav-li-color', 'black')

        return()=>{
        rootCss.style.setProperty('--nav-li-color', 'white')
        }
    },[])
    
    async function deleteReservation(id:number){
        let req = await deleteBooking(id);
        if(req){
            fetchData();
        }
    }

    let fetchData = async ()=>{
        try{
            let req = await fetch(`${process.env.REACT_APP_API_LINK}/booking/getAllBookedTrips.php`);
            if(!req.ok){
                throw Error('No Reservation')
            }
            let res = await req.json();
            setBooking(res);
        }catch(e){
            console.log(e);
        }
    }

    let totalPrice = useCallback(()=>{setTotal(booking.reduce((total , reservation)=> total + (reservation.price) , 0));},[booking])
    useEffect(()=>{
        fetchData();
        totalPrice();
    },[totalPrice])
    return (
        <div className={styles.wrapper}>
            <div className={styles.head}>
                <h1>All Users Reservation</h1>
                {total && <p> Total : {total} $</p>}
            </div>
            
            <div className={styles.reservationsContainer}>
                {booking.length>0 ? booking.map((reservation , i) => {return <Reservation key={reservation.id} deleteReservation={deleteReservation} booking={reservation} />}) : <p style={{padding:'1rem 0'}}>NO RESERVATION YET , BE PATIENT!</p>}
            </div>
        </div>
    )
}
