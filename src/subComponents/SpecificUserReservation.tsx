import React , { SetStateAction, useEffect, useState }from 'react'
import styles2 from '../styles/usersResevation.module.css'
import ReactDOM from 'react-dom'
import styles from '../styles/sur.module.css'
import { surBooking } from '../interfaces'
import { RootState } from '../store/store'
import { useAppSelector , useAppDispatch } from '../hooks'
import { setToReserve } from '../store/toReserveTripsSlice'
import { Link } from 'react-router-dom'
import { Reservation } from '../components/UsersReservation'
import { getUserReservation } from '../store/userReservationSlice'
import { deleteBooking } from '../globalFunctions'
export interface SURProps {
    id: number,
    openReservation: boolean,
    setOpenReservation: React.Dispatch<SetStateAction<boolean>>
}

export interface SUReservationProps {
    idx : number,
    booking : surBooking,
    deleteReservation : (idx:number)=> void
}

export const SUReservation = ({ idx , deleteReservation , booking } : SUReservationProps )=> {
    return(
    <>
        <div className={styles2.reservation}>
            <div className={styles2.imgPart}>
                <img src={` https://travelagency7.infinityfreeapp.com/travelWebsite/api/upload/imgs/${booking.img}`} alt='reserved trip' />
            </div>
            <div className={styles2.reservationInfo}>
                <div className={styles2.tripInfo}>
                    <h1>{booking.name}</h1>
                    <div>
                        <span className='date-icon'></span>
                        <div className={styles2.datesContainer}>
                            <span className={styles2.adate}>{booking.adate}</span>
                            <span> - TO - </span>
                            <span className={styles2.ddate}>{booking.ddate}</span>
                        </div>
                    </div>
                    <div> 
                        <p>{booking.price} $</p>
                        {booking.reservedSeat && <p> Seat On :{booking.reservedSeat}</p>}
                    </div>
                </div>
            </div>
            <div onClick={()=>deleteReservation(idx)} className={styles2.closeContainer}>
                <span className="close-icon"></span>
            </div>
        </div>
    </>)
}


export default function SpecificUserReservation({id , openReservation , setOpenReservation} : SURProps) {
    let toReserve  = useAppSelector( (state : RootState) => state.toReserve);
    let confirmedReservation = useAppSelector((state : RootState)=>state.userReservation.reservation)
    let [tab , setTab] = useState<number>(0);
    let dispatch = useAppDispatch();
    let deleteReservation = (idx:number)=>{
        let filterReservation = toReserve?.filter((reservation , i) => i !== idx);
        dispatch(setToReserve(filterReservation))
        localStorage.setItem('reservedTrips' , JSON.stringify(filterReservation))
    }
    let deleteConfirmedReservation = async (idx:number)=>{
        await deleteBooking(idx).then(()=>dispatch(getUserReservation(id)));
    }
    useEffect(()=>{
        dispatch(getUserReservation(id));
    },[dispatch,id])
    return ReactDOM.createPortal(
        <aside>
            <div className={styles.surContainer}>
                <div onClick={()=>setOpenReservation(false)} className={styles.closeContainer}>
                    <span className='close-icon'></span>
                </div>
                <div className={styles.surContent}>
                    <select onChange={(e:React.ChangeEvent)=>setTab(+(e.target as HTMLOptionElement).value)} className={styles.tabs}>
                        <option value='0'>To Reserve</option>
                        <option value='1'>Confirmed Reservation</option>
                    </select>
                    
                    <div className={styles.reservationContainer}>
                        { tab===0 && ((toReserve && toReserve.length>0) ? toReserve.map((reservation , i)=> 
                        {
                            return <SUReservation key={i} idx={i} deleteReservation={deleteReservation} booking={reservation} /> })
                        : <p style={{paddingTop : '2rem' , textAlign : 'center'}}>You have no reservation yet!</p>)}

                        { tab===1 && ((confirmedReservation && confirmedReservation.length>0) ? confirmedReservation.map((reservation , i)=> 
                        {
                            return <Reservation key={i} deleteReservation={deleteConfirmedReservation} booking={reservation} /> })
                        : <p style={{paddingTop : '2rem' , textAlign : 'center'}}>You have no reservation yeeeet!</p>)}
                    </div>
                    {(toReserve && toReserve.length>0 && tab===0) && <Link to='/payment'><button className={styles.surBtn} onClick={()=>setOpenReservation(!openReservation)} type='button'>Complete Reservation</button></Link> }
                </div>
            </div>
        </aside>
    ,document.body)
}
