import React, { useCallback , useEffect, useRef, useState , useMemo } from 'react'
import { useParams } from 'react-router';
import { trip } from '../interfaces'; 
import '../styles/specificPageStyles.css'
import styles from '../styles/specificShipTripPageStyle.module.css'
import { RootState } from '../store/store';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setToReserve } from '../store/toReserveTripsSlice';
import { Notification } from '../subComponents/Notification';




export function Flighttrip( {trip , reservedTrip} : {trip:trip , reservedTrip : boolean}){
  let {rowId , name , img , secondaryImg , adate , ddate , price , dfrom , star } = trip;
  let loggedIn  = useAppSelector( (state : RootState) => state.login);
  let toReserve  = useAppSelector( (state : RootState) => state.toReserve)
  let dispatch = useAppDispatch()
  let [mainImg , setMainImg] = useState<string>(img);
  let [imgs , setImgs] = useState<string[]>(JSON.parse(`${secondaryImg}`));
  let [openNotification , setON] = useState<boolean>(false);
  let success : boolean = false;

  async function bookNow(){
    if(reservedTrip){
      return;
    }
    if(loggedIn.user?.userId){
      if(localStorage.getItem('reservedTrips')){
        dispatch(setToReserve([...toReserve,{rowId , name , img , adate , ddate ,price}]))
        setON(true);
        success = true;
      }else{
        setON(true);
        success = true;
        dispatch(setToReserve([{rowId , name , img , adate , ddate ,price}]))
      }
      
    }else{
      alert('You must login to continue')
    }
  }
  function makeMain(img : string , i:number){
    let mappedArray = imgs.map((img , idx) => {
      if(i === idx){
      return img = mainImg; 
      }
      return img});
    setImgs(mappedArray);
    setMainImg(img)
  }
return(
  <section className='specificPage-container'>
      <div className='sp-elementImages'>
        <div className='sp-elementImage'>
          <img src={`${process.env.REACT_APP_API_LINK}/upload/imgs/${mainImg}`} alt='img-element' />
        </div>
        <div className='sp-allImages'>
          {imgs.map((img , i) => {return <img key={i} onClick={()=>makeMain(img , i)} src={`${process.env.REACT_APP_API_LINK}/upload/imgs/${img}`} alt='img-element' /> })}
        </div>
      </div>
      <div className='sp-contentContainer'>
        <div className='sp-contentContainer-info'>
          <h1>{name}</h1>
          <div className='star-rating'>
            <p>{star}.0</p>
            {Array.from({length : star} , (item , index )=> {return <span key={index} className='star-icon'></span>})}
          </div>
          <div className='price-persons'>
            <p>{price} $</p>
            <p>FOR TWO</p>
          </div>
          <div className='locations-info'>
            <div>
              <span className='location-icon'></span>
              <p>Hotel , {name}</p>
            </div>
            <div>
              <span className='date-icon'></span>
              <p>{adate} - {ddate}</p>
            </div>
            <div>
              <span className='plane-icon'></span>
              <p>Departure from {dfrom}</p>
            </div>
          </div>
          <div className='extra-services'>
            <div>Free Wi-Fi</div>
            <div>Free Parking</div>
            <div>Open Pool</div>
            <div>Air Conditioning</div>
            <div>Animal Allowed</div>
            <div>Free Endursion</div>
          </div>
          <button className={`book-now ${reservedTrip ? 'disableBtn' : ''}`} onClick={bookNow} type='button'>BOOK NOW</button>
          {openNotification && <Notification success={success} msg='Successfully Added To Reservation List' openNotification={openNotification} setON={setON} />}
        </div>
        <div className='other-routes'>
          <div className='popular-routes'>
          <img src='/imgs/mountain.jpg' alt='pop-img' />
            <div className='popular-routes-info'>
              <h1>POPULAR ROUTES</h1>
              <div className='pop-location'>
                <span className='location-icon'></span>
                <p>Madrid</p>
              </div>
            </div>
          </div>
          <div className='popular-routes'>
            <img src='/imgs/mountain.jpg' alt='pop-img' />
            <div className='popular-routes-info'>
              <h1>POPULAR ROUTES</h1>
              <div className='pop-location'>
                <span className='location-icon'></span>
                <p>Madrid</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
)
}
export function Shiptrip({trip , reservedTrip} : {trip:trip , reservedTrip : boolean}){
  let {rowId, name , img , adate , ddate , atime , dtime , price , ticketsAvailable } = trip;
  let loggedIn  = useAppSelector( (state : RootState) => state.login)
  let toReserve  = useAppSelector( (state : RootState) => state.toReserve)
  let dispatch = useAppDispatch()
  let seat = useRef<number | null>(null);
  let [openNotification , setON] = useState<boolean>(false)
  let success : boolean = true;
  function bookSeat(e:React.MouseEvent){
    let bgColor = (e.target as HTMLSpanElement).classList.contains('activePersonIcon');
    if(bgColor){
      (e.target as HTMLSpanElement).classList.remove('activePersonIcon');
      seat.current = null;
    }else{
      (e.target as HTMLSpanElement).classList.add('activePersonIcon');
      seat.current = +((e.target as HTMLSpanElement).dataset.seat)!+1;
    }
  }

  async function bookNow(){
    if(reservedTrip){
      return;
    }

    if(seat.current && loggedIn.user?.userId){
      let reservedSeat = seat.current;
      if(localStorage.getItem('reservedTrips')){
        dispatch(setToReserve([...toReserve,{rowId , name , img , adate , ddate ,price , reservedSeat}]))
      
      }else{
        dispatch(setToReserve([{rowId , name , img , adate , ddate ,price , reservedSeat}]))
      }
    }else{
      alert('You must login to continue')
    }
  }
return(
  <section className={styles.shipTripContainer}>
        <div className={styles.imgContainer}>
            <img src={`${process.env.REACT_APP_API_LINK}/upload/imgs/${img}`} alt='tripImage' />
            <span>Choose Your Path</span>
        </div>
        <div className={styles.infoContainer}>
            <h1>{name}</h1>
            <div className={styles.tripDates}>
                <div className={styles.arrivalDate}>
                    <h4>ARRIVAL</h4>
                    <p><span>{adate}</span><span> {atime}</span></p>
                </div>
                <span className={styles.line}></span>
                <div className={styles.departureDate}>
                    <h4>DEPARTURE</h4>
                    <p><span>{ddate}</span><span> {dtime}</span></p>
                </div>
            </div>
            <div className={styles.partsContainer}>
            <div className={styles.choosePlaceContainer + ' ' + styles.part}>
                <h2><span>Ch</span>oose a place</h2>
                <div className={styles.shipPlacesInfo}>
                    <div className={styles.placesInfo}>
                        <h2>Free Places : <span> {ticketsAvailable} </span></h2>
                        <h2>Selected : <span> {100-ticketsAvailable} </span></h2>
                    </div>
                    <div className={styles.shipLook}>
                        <div className={styles.shipLookAllGrid}>
                            <div className={styles.shipColumn}>
                                <span>A</span>
                                <span>B</span>
                                <span>C</span>
                                <span>D</span>
                                <span>E</span>
                            </div>
                            <div className={styles.shipGridAndRow}>
                                <div className={styles.shipGrid}>
                                  {Array.from({length : 100} , (val , index)=> {return (
                                  (index+1 > 100-ticketsAvailable) ? <span key={index} data-seat={index+1} onClick={(e:React.MouseEvent)=>bookSeat(e)} className={styles.placePoint}></span> : <span key={index} data-seat={index+1} className={`${styles.placePoint} activePersonIcon`}></span>
                                  )})}
                                </div>
                                <div className={styles.shipRow}>
                                {Array.from({length : 20} , (val , index)=> {return <span key={index}>{index+1}</span>})}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.yourDataContainer + ' ' + styles.part}>
                <h2><span>Y</span>our data</h2>
                <div className={styles.yourDataInfo}>
                    <div className={styles.firstNameInputContainer}>
                        <label>Your Name</label>
                        <input type={'text'} placeholder='your name' />
                    </div>
                    <div className={styles.surNameInputContainer}>
                        <label>Surname</label>
                        <input type={'text'} placeholder='your surname' />
                    </div>
                    <div className={styles.emailInputContainer}>
                        <label>Email</label>
                        <input type={'text'} placeholder='your email' />
                    </div>
                    <div className={styles.phoneInputContainer}>
                        <label>Phone</label>
                        <input type={'text'} placeholder='your phone' />
                    </div>
                </div>
                <div className={styles.priceAndButton}>
                    <div className={styles.priceContainer}>
                        <p>To Pay : <span>396</span><span>$</span></p>
                    </div>
                    <button onClick={bookNow} className={`${reservedTrip && 'disableBtn'}`} type={'button'}>BOOK NOW</button>
                    {openNotification && <Notification success={success} msg='Successfully Added To Reservation List' openNotification={openNotification} setON={setON} />}
                </div>
            </div>
            </div>
            
        </div>
    </section>
)
}
export default function SpecificPage() {
  let toReserve = useAppSelector((state : RootState) => state.toReserve)
  let {id} = useParams();
  let [trip , setTrip] = useState<trip | null>(null)
  let [loading , setLoading] = useState<boolean>(true);
  let [reservedTrip , setReservedTrip] = useState<boolean>(false);
  let [error , setError] = useState<boolean>(false)
  const fetchTrip = useCallback(async ()=>{
    try{
      let req = await fetch(`${process.env.REACT_APP_API_LINK}/routes/readSpecificRoute.php?id=${id}`)
      let res = await req.json();
      if(res.length !== 0){
        setTrip(res[0]);
      }else{
        setLoading(false);
        setError(true);
      };
    } catch(e){
      setError(true);
      setLoading(false);
    }
  },[id])

  const updateRes = useMemo(()=>{
    if(toReserve && toReserve.findIndex(reservation => +reservation.rowId === +id!) >=0){
      setLoading(false);
      return true
    }else{
      setLoading(false);
      return false;
    }
  },[toReserve,id])

  useEffect(()=>{
    let rootCss:any = document.querySelector(':root');
    rootCss.style.setProperty('--nav-li-color', 'black')

    return()=>{
      rootCss.style.setProperty('--nav-li-color', 'white')
    }
  })
  
  useEffect(()=>{
    setReservedTrip(updateRes)
    fetchTrip();
    
  },[fetchTrip,updateRes]) 
  
  return (
    <>
    { !error ? (!loading ? (trip && ((trip?.tripType === 'Flight') ? <Flighttrip trip={trip} reservedTrip={reservedTrip} /> : <Shiptrip trip={trip} reservedTrip={reservedTrip} />)) 
      : <div style={{height : '60rem' , display : 'grid' , placeItems : 'center'}}><h1>Loading...</h1></div>)
      : <div style={{height : '60rem' , display : 'grid' , placeItems : 'center'}}><h1>NOT FOUND</h1></div>
    }
    
    </>
  )
}
