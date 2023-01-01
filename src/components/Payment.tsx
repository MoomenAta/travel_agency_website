import React, { useEffect , useState} from 'react';
import { bookTrip } from '../globalFunctions';
import { useAppDispatch, useAppSelector } from '../hooks';
import { RootState } from '../store/store';
import { setToReserve } from '../store/toReserveTripsSlice';
import styles from '../styles/payment.module.css';
import { SUReservation } from '../subComponents/SpecificUserReservation';

export default function Payment() {
    let toReserve = useAppSelector((state:RootState) => state.toReserve);
    let loggedIn = useAppSelector((state:RootState) =>state.login)
    let dispatch = useAppDispatch();
    let [msg , setMsg] = useState<string>('You have no reservation yet!')
    useEffect(()=>{
        window.scrollTo(0,0);
        let rootCss:any = document.querySelector(':root');
        rootCss.style.setProperty('--nav-li-color', 'black')

        return()=>{
        rootCss.style.setProperty('--nav-li-color', 'white')
        }
    },[])
    let deleteReservation = (idx:number)=>{
        let filterReservation = toReserve?.filter((reservation , i) => i !== idx);
        dispatch(setToReserve(filterReservation))
        localStorage.setItem('reservedTrips' , JSON.stringify(filterReservation))
    }
    let reserve = ()=>{
        if(!(toReserve && toReserve.length>0)){
            return null;
        }
        let userEmail = loggedIn.user?.email;
        let userId = loggedIn.user?.userId;
        let cardNumber = (document.querySelector('[data-cardnumber]')as HTMLInputElement)?.value.trim();
        let cvvNumber = (document.querySelector('[data-cvv]')as HTMLInputElement)?.value.trim();
        let expiryMonth = (document.querySelector('[data-month]')as HTMLInputElement)?.value.trim();
        let expiryYear = (document.querySelector('[data-year]')as HTMLInputElement)?.value.trim();
            toReserve.forEach( async (tripItem) => {
            if(userEmail && (typeof userId !== "undefined")){
                console.log(cardNumber , cvvNumber , expiryMonth , expiryYear)
                if(cardNumber && cvvNumber && expiryMonth && expiryYear){
                    await bookTrip(tripItem.rowId , userId , userEmail , tripItem.name , tripItem.img , tripItem.adate , tripItem.ddate ,tripItem.price , tripItem.reservedSeat);
                    localStorage.removeItem('toReserve')
                    dispatch(setToReserve([]))
                    setMsg('Successful Reservation')
                    window.scrollTo(0,0);
                }else{
                    alert('fill your payment card info')
                }
            }else{
                alert('You must sign in , First')
            }
            })
        
    }
    return (
        <section className={styles.container}>
            <div className={styles.tripDetails}>
                {
                (toReserve && toReserve.length>0) ? toReserve.map((reservation , i)=> 
                    {
                        return <SUReservation key={i} idx={i} deleteReservation={deleteReservation} booking={reservation} /> })
                    : <p style={{paddingTop : '2rem' , textAlign : 'center'}}>{msg}</p>
                }
                {
                (toReserve && toReserve.length>0) && <div className={styles.priceTag}>
                    <p>Total : <span>{toReserve.reduce((curr ,reservation)=> reservation.price + curr , 0 )}</span>$</p>
                </div>
                }
            </div>
            <div className={styles.paymentFormContainer}>
                <h1 className={styles.title}>Card Information</h1>
                <form className={styles.paymentForm}>
                    <div className={styles.cardsTypes}>
                        <p className={styles.visa}>VISA</p>
                        <p className={styles.mc}>MASTER CARD</p>
                        <p className={styles.pp}>PAYPAL</p>
                    </div>
                    <div className={styles.cardNumbers}>
                        <div className={styles.cardNumber}>
                            <input data-cardnumber type={'text'} placeholder="Card Number" />
                            <label>
                                Card Number
                            </label>
                        </div>
                        <div className={styles.cvvNumber}>
                            <input data-cvv type={'text'} placeholder="CVV Number" />
                            <label>
                                CVV Number
                            </label>
                        </div>
                    </div>
                    <div className={styles.expireDate}>
                        <label>
                            Expiry Date
                        </label>
                        <div className={styles.date}>
                        <input data-month name='month' type={'number'} placeholder='Month'/>
                        <span>/</span>
                        <input data-year name='year' type={'number'} placeholder='year'/>
                        </div>
                    </div>

                    <button className={`${!(toReserve && toReserve.length>0) && 'disableBtn'}`} onClick={reserve} type='button' >PAY NOW</button>
                </form>
            </div>
        </section>
    )
}
