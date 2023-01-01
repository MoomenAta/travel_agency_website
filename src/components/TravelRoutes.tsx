import React, { ChangeEvent, useEffect, useRef, useState , useMemo} from 'react'
import { useNavigate } from 'react-router-dom';
import styles from '../styles/routes.module.css'
import WildtripsComponent from '../subComponents/WildtripsComponent';

import { searchKeys, update } from '../store/searchKeysSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setData } from '../store/dataSlice';
import TourismSavageComponent from '../subComponents/TourismSavageComponent';
import { expandList } from './SingleRoute';


export default function TravelRoutes() {
  let [numOfRooms , setNumOfRooms] = useState<number>(1);
  let [priceStart , setPriceStart] = useState<number>(10);
  let [priceEnd , setPriceEnd] = useState<number>(50);
  let nameRef = useRef<string>('');
  let adateRef = useRef<string >('');
  let ddateRef = useRef<string >('');
  let sk : searchKeys = useSelector((state : RootState)=> {return state.searchKeys})
  let dispatch = useDispatch();
  let stars = useRef<number[]>([...sk.stars]);
  let navigate = useNavigate();
  let [activeTab , setActiveTab] = useState<number>(1);
  let data = useSelector((state: RootState) => state.data);
  let tourismSavage = data.filter((trip)=> trip.tableId === 'tourism_savage');
  let camping = data.filter((trip)=> trip.tableId === 'camping');
  let hitchHiking = data.filter((trip)=> trip.tableId === 'hitch_hiking');
  let carTravel = data.filter((trip)=> trip.tableId === 'car_travel');
  //MEMOIZED FUNCTION TO FETCH DATA
  let fetchDataMemo = useMemo(()=> async function fetchData(url:string){
      try{
          let res = await fetch(url);
          let data = await res.json();
          if(data) dispatch(setData(data.data))
      }
      catch(e){
          console.log('failed to fetch Data');
      }
  },[dispatch])
  //FETCH DATA ON LOAD
  useEffect(()=>{
    fetchDataMemo(`${process.env.REACT_APP_API_LINK}/routes/read.php`);
  },[fetchDataMemo])



  useEffect(()=>{
    window.scrollTo(0,0);
    let rootCss:any = document.querySelector(':root');
    rootCss.style.setProperty('--nav-li-color', 'black')

    return()=>{
        rootCss.style.setProperty('--nav-li-color', 'white')
    }
  },[])

  useEffect(()=>{
    let personAdultIcons : NodeListOf<HTMLSpanElement> = document.querySelectorAll('[data-person-adult-container] span');
    let personChildrenIcons : NodeListOf<HTMLSpanElement> = document.querySelectorAll('[data-person-children-container] span');
    let starIcons : NodeListOf<HTMLDivElement> = document.querySelectorAll('[data-star-container] div');
    handleActive(personAdultIcons , 'activePersonIcon');
    handleActive(personChildrenIcons , 'activePersonIcon');
    handleActive(starIcons , 'activeStarIcon');
  })

  function handleStars(ele:HTMLElement){
    if(ele.dataset.star){
      let toRemove = stars.current.indexOf(+ele.dataset.star);
      if(toRemove<0){
        stars.current.push(+ele.dataset.star)
      }else{
        stars.current = stars.current.filter((item , index)=> {return index !== toRemove})
      }
    }
  }

  
  function handleActive(elements : NodeListOf<HTMLElement> , className : string){
    elements.forEach((ele : HTMLElement)=>{
      ele.onclick = ()=>{
        handleStars(ele);
        if(ele.classList.contains(`${className}`))
        ele.classList?.remove(`${className}`);
        else
        ele.classList.add(`${className}`);
      }
    })
  }
  function handleNumOfRooms(actionType : string){
    if(actionType === '+' && numOfRooms!== 6){
      setNumOfRooms(numOfRooms + 1);
    }
    if(actionType === '-' && numOfRooms !== 1){
      setNumOfRooms(numOfRooms - 1);
    }
  }
  
  function handleChange(e:ChangeEvent){
    let ele = e.target as HTMLInputElement;
    switch (ele.dataset.ref){
      case 'nameRef' : 
        nameRef.current = ele.value
        break;
      case 'adateRef':
        
        if(ddateRef.current){
          if(new Date(ele.value) > new Date(ddateRef.current))
          ele.value = new Date().toDateString();
          else
          adateRef.current = ele.value
        }else
        adateRef.current = ele.value
        break;
      case 'ddateRef':
        if(adateRef.current){
          if(new Date(ele.value) < new Date(adateRef.current))
          ele.value = new Date().toDateString();
          else
          ddateRef.current = ele.value
        }else
        ddateRef.current = ele.value
      break;
    }
  }

  function updateAndNavigate(){
    dispatch(update({
      name : nameRef.current,
      adate : adateRef.current,
      ddate : ddateRef.current,
      rooms : numOfRooms,
      adults : document.querySelectorAll('[data-person-adult-container] .activePersonIcon').length,
      children :document.querySelectorAll('[data-person-children-container] .activePersonIcon').length,
      stars : stars.current,
      priceStart : priceStart,
      priceEnd : priceEnd
    }));
    navigate('/routes/search')
  }
  function handleLeftPrice(e:React.ChangeEvent<HTMLInputElement>){
    if(+e.target.value > (priceEnd) - 20){ 
      e.target.value = priceStart.toString();
      return;
    }
    setPriceStart(+e.target.value);
    let leftEle = document.getElementById('leftPrice') as HTMLElement;
    leftEle.style.left = `${priceStart}%`
    leftEle.style.transform =`translate(${-priceStart}%, -50%)`;
    document.getElementById('rangeTrack')!.style.left = `${priceStart}%`
  }
  function handleRightPrice(e:React.ChangeEvent<HTMLInputElement>){
    e.preventDefault();
    if(+e.target.value < priceStart + 20){ 
      e.target.value = priceEnd.toString()
      return;
    }
    setPriceEnd(+e.target.value);
    let rightEle = document.getElementById('rightPrice') as HTMLElement;
    rightEle.style.left = `${priceEnd}%`
    rightEle.style.transform =`translate(${-priceEnd}%, -50%)`;
    document.getElementById('rangeTrack')!.style.right = `${100 - (priceEnd)}%`
  }

  function updateTab(tab:number){
    document.querySelector('.active')?.classList.remove('active');
    document.querySelectorAll('[data-tabs] li')[tab-1].classList.add('active')
    setActiveTab(tab)
  }
  
  return (
    <section className={styles.routesSection}>
      <div className={styles.leftSideWrapper}>
        <div className={styles.searchContainer}>
          <div className={styles.searchRow1}>
            <div className={styles.location}>
              <label>Location</label>
              <div className={styles.searchLocationInput}>
                <span className='location-icon'></span>
                <input type={'text'} data-ref='nameRef' onChange={(e)=>handleChange(e)} placeholder={'location to go'} />
              </div>
            </div>
            <div className={styles.arrivalDepartureButtonContainer}>
              <div className={styles.arrival}>
                <h2>Arrival</h2>
                <span>
                  <input type={'date'} data-ref='adateRef' onChange={(e)=>handleChange(e)} defaultValue={sk.adate} />
                </span>
              </div>
              <div className={styles.departure}>
                <h2>Departure</h2>
                <span>
                  <input type={'date'} data-ref='ddateRef' onChange={(e)=>handleChange(e)} defaultValue={sk.ddate} />
                </span>
              </div>
              <button onClick={()=>updateAndNavigate()} type='button'>SEARCH</button>
            </div>
          </div>
          <div className={styles.searchRow2}>

            <div className={styles.numOfRooms}>
              <h2>Number of Rooms</h2>
              <div className={styles.numOfRoomsInput}>
                <span onClick={()=>handleNumOfRooms('-')} className={styles.minus}>-</span>
                <span>{numOfRooms}</span>
                <span onClick={()=>handleNumOfRooms('+')} className={styles.plus}>+</span>
              </div>
            </div>

            <div className={styles.numAdults}>
              <h2>Adults</h2>
              <div data-person-adult-container className={styles.personsContainer}>
                <span className='person-icon activePersonIcon'>
                </span>
                <span className='person-icon'>
                </span>
                <span className='person-icon'>
                </span>
                <span className='person-icon'>
                </span>
              </div>
            </div>

            <div className={styles.numChildren}>
              <h2>Children</h2>
              <div data-person-children-container className={styles.personsContainer}>
                <span className='person-icon activePersonIcon'>
                </span>
                <span className='person-icon'>
                </span>
                <span className='person-icon'>
                </span>
                <span className='person-icon'>
                </span>
                <span className='person-icon'>
                </span>
                <span className='person-icon'>
                </span>
              </div>
            </div>

            <div data-star-container className={styles.hotelClass}>
              <div data-star='1' className={styles.starContainer }>
                <span className='star-icon'></span>
                <span>1</span>
              </div>
              <div data-star='2' className={styles.starContainer}>
                <span className='star-icon'></span>
                <span>2</span>
              </div>
              <div data-star='3' className={styles.starContainer}>
                <span className='star-icon'></span>
                <span>3</span>
              </div>
              <div data-star='4' className={styles.starContainer}>
                <span className='star-icon'></span>
                <span>4</span>
              </div>
              <div data-star='5' className={styles.starContainer}>
                <span className='star-icon'></span>
                <span>5</span>
              </div>
            </div>
          </div>
          <div className={styles.searchRow3}>
              <div className={styles.priceLine}>
                
                <input type="range" defaultValue={+priceStart} name="minValue"
                min="0" max={100} onChange={handleLeftPrice}  />

                <input type="range" defaultValue={+priceEnd} name="maxValue"
                min='0' onChange={handleRightPrice} max="100" />
                
                <span id={'rangeTrack'} style={{left : `${priceStart}%`,right: `${100 - +priceEnd}%`}}className={styles.lineRange}></span>
                <span id={'Track'} className={styles.line}></span>

                <div id={'leftPrice'} style={{left : `${priceStart}%`,transform: `translate(${-priceStart}% , -50%)`}} className={styles.price + ' ' + styles.priceLeft}>
                  <span className={styles.pricePoint}></span>
                  <span className={styles.priceTag}>
                    {(priceStart/100) * 1000} <span>$</span>
                  </span>
                </div>
                <div id={'rightPrice'} style={{left : `${priceEnd}%`,transform: `translate(${-priceEnd}% , -50%)`}} className={styles.price + ' ' + styles.priceRight}>
                  <span className={styles.pricePoint}></span>
                  <span className={styles.priceTag}>
                  {(priceEnd/100) * 1000} <span>$</span>
                  </span>
                </div>
              </div>
            </div>
        </div>
        {/*  Second Div  */}
        <div className={styles.allRoutes}>
          <div className={styles.routesSubNav}>
            <ul data-tabs>
              <li onClick={()=>updateTab(1)} className={'active'}>
                Tourism Savage
              </li>
              <li onClick={()=>updateTab(2)}>
                Camping
              </li>
              <li onClick={()=>updateTab(3)}>
                Hitch-hiking
              </li>
              <li onClick={()=>updateTab(4)}>
                Car travel
              </li>
            </ul>

            <div className={styles.showIcons}>
              <span onClick={(e:React.MouseEvent)=>expandList(e,false)} className='shrink-icon activeExpandState'></span>
              <span onClick={(e:React.MouseEvent)=>expandList(e,true)} className='expand-icon'></span>
            </div>
          </div>

          <div data-components-container className={styles.routesComponentsContainer}>
            {activeTab===1 && tourismSavage.map((trip)=> <TourismSavageComponent key={trip.rowId} {...trip} />)}
            {activeTab===2 && camping.map((trip)=> <WildtripsComponent key={trip.rowId} {...trip} />)}
            {activeTab===3 && hitchHiking.map((trip)=> <TourismSavageComponent key={trip.rowId} {...trip} />)}
            {activeTab===4 && carTravel.map((trip)=> <TourismSavageComponent key={trip.rowId} {...trip} />)}
          </div>
          
        </div>
      </div>
      <div className={styles.rightSideWrapper}>
        <img className={styles.mapImg} src={'/imgs/map.jpg'} alt={'mapImage'} />
      </div>
    </section>
  )
}
