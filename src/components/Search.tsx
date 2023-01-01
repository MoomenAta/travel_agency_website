import React, { useEffect, useRef, useState } from 'react'
import '../styles/search.css';
import AirTicketsComponent from '../subComponents/AirTicketsComponent';
import Controllers from '../subComponents/Controllers';
import HotelsComponent from '../subComponents/HotelsComponent';
import LastMinutesDeals from '../subComponents/LastMinutesDeals';
import WildtripsComponent from '../subComponents/WildtripsComponent';
import { gsap } from "gsap";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { getAllTrips } from '../store/dataSlice';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useAppDispatch , useAppSelector } from '../hooks';


export function DefaultScreen(){
  //DATA VAR FROM REDUX
  let data = useAppSelector((state: RootState) => state.data);
  let wildTrips = data.filter((trip)=> trip.tableId === 'tourism_savage');
  let hotels = data.filter((trip)=> trip.tableId === 'camping');
  let airTickets = data.filter((trip)=> trip.tableId === 'hitch_hiking');
  let lastMinuteDeal = data.filter((trip)=> trip.tableId === 'car_travel');
  let dispatch = useAppDispatch();
  
  //FETCH DATA ON LOAD
  useEffect(()=>{
    dispatch(getAllTrips())
  },[dispatch])
  let navigate = useNavigate();
  function scrollplus(ele:HTMLDivElement , distance : number){
    ele.scrollBy(distance,0)
  }
  function scrollminus(ele:HTMLDivElement , distance : number){
    ele.scrollBy(-distance,0)
  }
  useEffect(()=>{
    window.scrollTo(0,0);
    let componentsContainer = document.querySelector('[data-routes-components-container]') as HTMLDivElement;
    let componentsContainer3 = document.querySelector('[data-components-container-sec-3]') as HTMLDivElement;
    let componentsContainer4 = document.querySelector('[data-components-container-sec-4]') as HTMLDivElement;
    let componentsContainer5 = document.querySelector('[data-components-container-sec-5]') as HTMLDivElement;
    let prevButton = document.querySelector('#search-sec2-prev') as HTMLSpanElement;
    let nextButton = document.querySelector('#search-sec2-next') as HTMLSpanElement;
    let prevButtonSec3 = document.querySelector('#search-sec3-prev') as HTMLSpanElement;
    let nextButtonSec3 = document.querySelector('#search-sec3-next') as HTMLSpanElement;
    let prevButtonSec4 = document.querySelector('#search-sec4-prev') as HTMLSpanElement;
    let nextButtonSec4 = document.querySelector('#search-sec4-next') as HTMLSpanElement;
    let prevButtonSec5 = document.querySelector('#search-sec5-prev') as HTMLSpanElement;
    let nextButtonSec5 = document.querySelector('#search-sec5-next') as HTMLSpanElement;
    let sec2Content = document.querySelector('[data-sec2-content]') as HTMLDivElement;
    let sec3Content = document.querySelector('[data-sec3-content]') as HTMLDivElement;
    let sec4Content = document.querySelector('[data-sec4-content]') as HTMLDivElement;
    let sec5Content = document.querySelector('[data-sec5-content]') as HTMLDivElement;
    let sec6Content = document.querySelector('[data-sec6-content]') as HTMLDivElement;
    prevButton.onclick = ()=>scrollminus(componentsContainer,200);
    nextButton.onclick = ()=>scrollplus(componentsContainer,200);
    prevButtonSec3.onclick = ()=>scrollminus(componentsContainer3, 200);
    nextButtonSec3.onclick = ()=>scrollplus(componentsContainer3,200);
    prevButtonSec4.onclick = ()=>scrollminus(componentsContainer4,200);
    nextButtonSec4.onclick = ()=>scrollplus(componentsContainer4,200);
    prevButtonSec5.onclick = ()=>scrollminus(componentsContainer5,200);
    nextButtonSec5.onclick = ()=>scrollplus(componentsContainer5,200);
    
    gsap.fromTo(sec2Content , {opacity : 0 } , {opacity : 1 ,y : 0 , delay : 2 , duration: 2 , ease : 'Elastic.easeOut'})
    gsap.fromTo(sec3Content , {opacity : 0 } , {opacity : 1 ,y : 0, delay : 3 , duration: 2 , ease : 'Elastic.easeOut'})
    gsap.fromTo(sec4Content , {opacity : 0 } , {opacity : 1 , y : 0,delay : 4 , duration: 2 , ease : 'Elastic.easeOut'})
    gsap.fromTo(sec5Content , {opacity : 0} , {opacity : 1 , y : 0,delay : 5 , duration: 2 , ease : 'Elastic.easeOut'})
    gsap.fromTo(sec6Content , {opacity : 0} , {opacity : 1 , y : 0,delay : 6 , duration: 2 , ease : 'Elastic.easeOut'})
  },[])
  return(
    <>
    <section className='sec-container'>
        <div data-sec2-content className='route-container'>
          <div className='route-header'>
            <div className='header-text'>
              <h1 className='text-route-name'>WILD TRIPS</h1>
              <button onClick={()=>navigate('/routes/wild-trips')} className='see-all-btn' type='button'>SEE ALL</button>
            </div>
            <Controllers ids={['search-sec2-prev' , 'search-sec2-next' ]} />
          </div>
          <div data-routes-components-container className='routes-components-container'>
            {wildTrips.length > 0 ? wildTrips.map((trip)=> <WildtripsComponent key={trip.rowId} {...trip} /> ) : 'Loading' }
          </div>
        </div>
      </section>
      <section className='sec-3 sec-container'>
        <div data-sec3-content className='route-container'>
          <div className='route-header'>
            <div className='header-text'>
              <h1 className='text-route-name'>HOTELS</h1>
              <button className='see-all-btn' onClick={()=>navigate('/routes/hotels')} type='button'>SEE ALL</button>
            </div>
            <Controllers ids={['search-sec3-prev' , 'search-sec3-next' ]} />
          </div>
          <div data-components-container-sec-3 className='routes-components-container'>
          {hotels.length > 0 ? hotels.map((trip)=> <HotelsComponent key={trip.rowId} {...trip} /> ) : 'Loading' }
            
            
          </div>
        </div>
      </section>
      <section className='sec-4 sec-container'>
        <div data-sec4-content className='route-container'>
          <div className='route-header'>
            <div className='header-text'>
              <h1 className='text-route-name'>AIR TICKETS</h1>
              <button className='see-all-btn' onClick={()=>navigate('/routes/air-tickets')} type='button'>SEE ALL</button>
            </div>
            <Controllers ids={['search-sec4-prev' , 'search-sec4-next' ]} />
          </div>
          <div data-components-container-sec-4 className='routes-components-container'>
            
            {airTickets.length > 0 ? airTickets.map((trip)=> <AirTicketsComponent key={trip.rowId} {...trip} /> ) : 'Loading' }
          </div>
        </div>
      </section>
      <section className='sec-5 sec-container'>
        <div data-sec5-content className='route-container'>
          <div className='route-header'>
            <div className='header-text'>
              <h1 className='text-route-name'>LAST MINUTES DEALS</h1>
            </div>
            <Controllers ids={['search-sec5-prev' , 'search-sec5-next' ]} />
          </div>
          <div data-components-container-sec-5 className='routes-components-container'>
            
            {lastMinuteDeal.length > 0 ? lastMinuteDeal.map((trip)=> <LastMinutesDeals key={trip.rowId} {...trip} /> ) : 'Loading' }
          </div>
        </div>
      </section>
      <section className='sec-container discover-photo-container'>
        <LazyLoadImage src='/imgs/mountain.jpg' alt='mountain' />
        <div data-sec6-content className='discover-photo'>
          <div className='discover-photo-content'>
            <div className='head-text'>
              <h1>DICOVER THE WORLD <span className='diff-font'>With</span></h1>
              <h3>DISCOVER THE PLANET</h3>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <button type='button'>TO BEGIN</button>
          </div>
        </div>
      </section>
    </>
  )
}

export default function Search() {
  let navigate = useNavigate();
  let useQuery = new URLSearchParams(useLocation().search);
  let [searchInput , setSearchInput] = useState<string>(useQuery.get('name')||'');
  let [searchType , setSearchType] = useState<string>(useQuery.get('type') || '');
  let searchParamRef = useRef<HTMLInputElement>(null);

  window.onload = ()=>{
    if(searchType){
      document.querySelector(`[data-type=${searchType.replace('_','-')}]`)?.classList.add('search-active-btn');
    }
  }
  useEffect(()=>{
    let sec1Content = document.querySelector('[data-sec1-content]') as HTMLDivElement;
    gsap.fromTo(sec1Content , {opacity : 0 , y : -300} , {opacity : 1 , y : 0 , delay : 1 , duration: 2 , ease : 'Elastic.easeOut'});
  },[])

  useEffect(()=>{
    let buttons = document.querySelectorAll('.input-buttons button') as NodeListOf<HTMLButtonElement>;
    buttons.forEach((btn)=>{
      btn.onclick = ()=>{
        document.querySelector('.search-active-btn')?.classList.remove('search-active-btn');
        btn.classList.add('search-active-btn');
      }
    })
  })
  
  
  function navigateToInput(type:string , input : string){
    setSearchType(type.toLowerCase().replace('-','_'));
    if(!input && !type) {
      navigate(`/search`)
      return;
    }
    if(type){
      navigate(`query?type=${type.toLowerCase().replace('-','_')}`);
    }
    if(input){
      navigate(`query?name=${input.replace(' ','-')}`);
    }
    if(input && type){
      navigate(`query?type=${type.toLowerCase().replace('-','_')}&name=${input.replace(' ','-')}`);
    }
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target?.value.trim());
  };
  return (
    <>
      <section className="search-sec-1-container">
                <LazyLoadImage className='absolute-img' src="/imgs/icemountain.jpg" alt="search" />
                <div data-sec1-content className="content-container">
                    <h1><span>EXPAND YOUR</span> <span>WORLD</span></h1>
                    <div className="search-input">
                        <input type="text" ref={searchParamRef} value={searchInput} placeholder="Find your adventure" onChange={handleChange}/>
                        <button onClick={()=>navigateToInput(searchType , searchInput)} type="button">SEARCH</button>
                    </div>
                    <div className="input-buttons">
                      <button data-type='all' onClick={()=>navigateToInput('' , '')}  className='search-btn' type="button"><span>All</span></button>
                      <button data-type='tourism-savage' onClick={()=>navigateToInput('tourism-savage' , searchInput)}  className='search-btn' type="button"><span>Hotels</span></button>
                      <button data-type='camping' onClick={()=>navigateToInput('camping' , searchInput)}  className='search-btn' type="button"><span>Camping</span></button>                      
                      <button data-type='hitch-hiking' onClick={()=>navigateToInput('hitch-hiking' , searchInput)}  className='search-btn' type="button"><span>Flights</span></button>
                      <button data-type='car-travel' onClick={()=>navigateToInput('car-travel' , searchInput)}  className='search-btn' type="button"><span>Excursions</span></button>
                      <button data-type='hitch-hiking' onClick={()=>navigateToInput('hitch-hiking' , searchInput)}  className='search-btn' type="button"><span>Bike travel</span></button>
                      <button data-type='camping' onClick={()=>navigateToInput('camping' , searchInput)}  className='search-btn' type="button"><span>Tours</span></button>
                      <button data-type='tourism-savage' onClick={()=>navigateToInput('tourism-savage' , searchInput)}  className='search-btn' type="button"><span>one-day</span></button>
                    </div>
                </div>
      </section>
      <Outlet />
      
    </>
  )
}
