import React , {useEffect , useState , useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { trip } from '../interfaces'; 
import { searchKeys, update } from '../store/searchKeysSlice';
import { RootState } from '../store/store';
import styles from '../styles/searchQueryPage.module.css'
import TourComponent from '../subComponents/TourComponent';
export default function SearchQueryPage() {
    let searchKeys : searchKeys = useSelector((state : RootState)=> {return state.searchKeys});
    let stars = useRef<number[]>([...searchKeys.stars]);
    let [ searchRes , setSearchRes] = useState<trip[]>([]);
    
    let dispatch = useDispatch();

    useEffect(()=>{
        let rootCss:any = document.querySelector(':root');
        rootCss.style.setProperty('--nav-li-color', 'black')
        
        return()=>{
            rootCss.style.setProperty('--nav-li-color', 'white')
        }
    },[])

    
    //ADD CLASSES FOR ACTIVE BUTTON
    useEffect(()=>{
        let collapseIcons = document.querySelectorAll('.collapseIcon') as NodeListOf<HTMLSpanElement>;
        collapseIcons.forEach(element => {
            element.onclick = ()=>{
                let innerBody = element.parentElement?.nextSibling as HTMLElement;
                innerBody.classList.toggle('collapseSec');
            }
        });

        let expandAll = document.querySelector('#expandAll') as HTMLElement
        expandAll.onclick = ()=>document.querySelector('[data-target=bodyPartContainer]')?.classList.toggle('expandAll');

        if(searchKeys.rooms){
            document.querySelector('[data-rooms] .activeStarIcon')?.classList.remove('activeStarIcon')
            document.querySelectorAll('[data-rooms] span')[searchKeys.rooms-1].classList.add('activeStarIcon')
        }

        let starsSpans = document.querySelectorAll('[data-stars]') as NodeListOf<HTMLSpanElement>;
        starsSpans.forEach((ele:HTMLElement , index:number)=>{
            ele.onclick = ()=>{
                handleStars(index+1)
            }
        })
        if(searchKeys.stars){
            stars.current.forEach((ele:number)=>{
                document.querySelectorAll('[data-stars]')[ele-1].classList.add('activeStarIcon')
            })
        }

        let locationInputs = document.querySelectorAll('[data-locations] li') as NodeListOf<HTMLUListElement>;
        locationInputs.forEach((ele:HTMLElement , index)=>{
            ele.onclick = ()=>{
                    let input = document.querySelectorAll('[data-locations] li input')[index] as HTMLInputElement
                    dispatch(update({...searchKeys , name : input.value}));
            }
        })
    })

    let fetchUponSearchKeys = useCallback(()=>{
        if(searchKeys.stars.length > 0){
            setSearchRes([]);
            for(let i = 0 ; i < searchKeys.stars.length ; i++){
                fetch(`${process.env.REACT_APP_API_LINK}/routes/readSpecificRoute.php?name=${searchKeys.name}&star=${searchKeys.stars[i]}&min=${searchKeys.priceStart * 10}&max=${searchKeys.priceEnd * 10}&adate=${searchKeys.adate}&ddate=${searchKeys.ddate}`)
                .then((res)=>res.json()).then((data)=>{
                    if(data) setSearchRes(s=> [...s,...data].filter((trip:trip , index , self)=> index === self.findIndex(item=>item.rowId === trip.rowId )))
                })
            }
        }else{
            fetch(`${process.env.REACT_APP_API_LINK}/routes/readSpecificRoute.php?name=${searchKeys.name}&min=${searchKeys.priceStart * 10}&max=${searchKeys.priceEnd * 10}&adate=${searchKeys.adate}&ddate=${searchKeys.ddate}`)
            .then((res)=>res.json()).then((data)=>{if(data)setSearchRes(data)})
        }
    },[searchKeys])
    useEffect(()=>{
        fetchUponSearchKeys();
    },[fetchUponSearchKeys])
    function handleStars(val : number){
        let toRemove = stars.current.indexOf(val);
        if(toRemove<0){
            stars.current.push(val)
        }else{
            stars.current = stars.current.filter((item , index)=> {return index !== toRemove})
            document.querySelectorAll('[data-stars]')[val-1].classList.remove('activeStarIcon');
        }
        dispatch(update({...searchKeys , stars : [...stars.current]}))
    }

    function updateSearchKeys( key : string , value:any){
        switch (key){
        case 'priceStart' :
            if(value > searchKeys.priceEnd - 20){ 
                value = searchKeys.priceStart
                return;
            }else
            dispatch(update({...searchKeys , priceStart : value}))
            break;
        case 'priceEnd' :
            if(value  < searchKeys.priceStart + 20 ){ 
                value = searchKeys.priceEnd
                return;
            }else
            dispatch(update({...searchKeys , priceEnd : value}))
            break;
        case 'adate' :
            if(searchKeys.ddate){
                if(new Date(value) > new Date(searchKeys.ddate))
                value = new Date();
                else
                dispatch(update({...searchKeys , adate : value}))
            }else
            dispatch(update({...searchKeys , adate : value}))
            break;
        case 'ddate' :
            if(searchKeys.adate){
                if(new Date(value) < new Date(searchKeys.adate))
                value = new Date();
                else
                dispatch(update({...searchKeys , ddate : value}))
            }else
            dispatch(update({...searchKeys , ddate : value}))
            break;
        case 'numRooms' :
            dispatch(update({...searchKeys , rooms : value}))
            break;
        }
    }
    return (
    <>
    <section className={styles.sectionContainer}>
        <div className={styles.searchFilter}>
            <div className={styles.header}>
                <h1>Filters</h1>
                <div>
                    <span>Reset All</span>
                    <span id='expandAll' className={styles.seeAll}>See All</span>
                </div>
            </div>
            <div data-target='bodyPartContainer' className={styles.bodyPartContainer}>
                <div className={`${styles.pricerange} ${styles.bodyPart}`}>
                    <div className={styles.Head}>
                        <h1>Price</h1>
                        <span className='collapseIcon'>-</span>
                    </div>
                    <div data-innerbody className={styles.innerBody}>
                        <div className={styles.pricerangeNums}>
                            <span>{searchKeys.priceStart/100 * 1000} $</span>
                            <span>{searchKeys.priceEnd/100 *1000} $</span>
                        </div>
                        <div className={styles.pricerangeLine}>
                            <span className={styles.line}></span>
                            <span className={styles.range} style={{left : `${searchKeys.priceStart}%`,right: `${100 - searchKeys.priceEnd}%`}}></span>
                            <input type={'range'} min='0' max='100' onChange={(e:React.ChangeEvent<HTMLInputElement>) => updateSearchKeys('priceStart',e.target.value)}
                            value={searchKeys.priceStart} name='pricerange'/>
                            <input type={'range'} min='0' max='100' onChange={(e:React.ChangeEvent<HTMLInputElement>) => updateSearchKeys('priceEnd',e.target.value)}
                            value={searchKeys.priceEnd} name='pricerange'/>
                        </div>
                    </div>
                </div>
                <div className={`${styles.numrooms}  ${styles.bodyPart}`}>
                    <div className={styles.Head}>
                        <h1 style={{color:'gray'}}>Number of rooms</h1>
                        <span className='collapseIcon'>-</span>
                    </div>
                    <div data-innerbody className={styles.innerBody}>
                        <div data-rooms className={styles.numRoomsOptions}>
                            <span onClick={()=>updateSearchKeys('numRooms',1)} className={styles.searchfilterSelectedspan}>1 Room</span>
                            <span onClick={()=>updateSearchKeys('numRooms',2)} className={styles.searchfilterSelectedspan}>2 Rooms</span>
                            <span onClick={()=>updateSearchKeys('numRooms',3)} className={styles.searchfilterSelectedspan}>3 Rooms</span>
                            <span onClick={()=>updateSearchKeys('numRooms',4)} className={styles.searchfilterSelectedspan}>4 Rooms</span>
                            <span onClick={()=>updateSearchKeys('numRooms',5)} className={styles.searchfilterSelectedspan}>5 Rooms</span>
                            <span onClick={()=>updateSearchKeys('numRooms',6)} className={styles.searchfilterSelectedspan}>6 Rooms</span>
                        </div>
                    </div>
                </div>
                <div className={`${styles.hotelClass} ${styles.bodyPart}`}>
                    <div className={styles.Head}>
                        <h1>Hotel class</h1>
                        <span className='collapseIcon'>-</span>
                    </div>
                    <div data-innerbody className={styles.innerBody}>
                        <div  className={styles.hotelClassOptions}>
                            <span data-stars className={styles.searchfilterSelectedspan}>1 <span className='star-icon'></span></span>
                            <span data-stars className={styles.searchfilterSelectedspan}>2 <span className='star-icon'></span></span>
                            <span data-stars className={styles.searchfilterSelectedspan}>3 <span className='star-icon'></span></span>
                            <span data-stars className={styles.searchfilterSelectedspan}>4 <span className='star-icon'></span></span>
                            <span data-stars className={styles.searchfilterSelectedspan}>5 <span className='star-icon'></span></span>
                        </div>
                    </div>
                </div>
                <div className={`${styles.locations} ${styles.bodyPart}`}>
                    <div className={styles.Head}>
                        <h1>Location</h1>
                        <span className='collapseIcon'>-</span>
                    </div>
                    <div data-innerbody className={styles.innerBody}>
                        <div className={styles.locationsOptions}>
                            <ul data-locations className={styles.locationsList}>
                                <li>
                                    <input type={'radio'} id='madrid' name='locations' value='Madrid' />
                                    <label htmlFor='madrid'>Madrid</label>
                                </li>
                                <li>
                                    <input type={'radio'} id='London' name='locations' value='London' />
                                    <label htmlFor='London'>London</label>
                                </li>
                                <li>
                                    <input type={'radio'} id='Roma' name='locations' value='Roma' />
                                    <label htmlFor='Roma'>Roma</label>
                                </li>
                                <li>
                                    <input type={'radio'} id='Maldives' name='locations' value='Maldives' />
                                    <label htmlFor='Maldives'>Maldives</label>
                                </li>
                                <li>
                                    <input type={'radio'} id='Monterial' name='locations' value='Monterial' />
                                    <label htmlFor='Monterial'>Monterial</label>
                                </li>
                                <li>
                                    <input type={'radio'} id='NYC' name='locations' value='NYC' />
                                    <label htmlFor='NYC'>NYC</label>
                                </li>
                                <li>
                                    <input type={'radio'} id='Cairo' name='locations' value='Cairo' />
                                    <label htmlFor='Cairo'>Cairo</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={`${styles.additionalServices} ${styles.bodyPart}`}>
                    <div className={styles.Head}>
                        <h1>Additional Services</h1>
                        <span className='collapseIcon'>-</span>
                    </div>
                    <div data-innerbody className={styles.innerBody}>
                        <h3>No Additionl Services</h3>
                    </div>
                </div>
                <div className={`${styles.arrivalDeparture} ${styles.bodyPart}`}>
                    
                    <div className={styles.arrival}>
                        <h1>Arrival</h1>
                        <input type={'date'} id='arrival' onChange={(e:React.ChangeEvent<HTMLInputElement>) => updateSearchKeys('adate',e.target.value)}
                        value={searchKeys.adate} />
                    </div>
                    <span className='collapseIcon'>-</span>
                    <div className={styles.departure}>
                        <h1>Departure</h1>
                            <input type={'date'} id='departure' onChange={(e:React.ChangeEvent<HTMLInputElement>) => updateSearchKeys('ddate',e.target.value)}
                            value={searchKeys.ddate} />
                    </div>
                    
                </div>
            </div>
        </div>
        <div className={styles.searchResults}>
            <h2 className={styles.searchResultsHeading}>Our Tours</h2>
            <div className={styles.toursContainer}>
                {searchRes.length>0 ? searchRes.map((trip:trip)=> {return <TourComponent key={trip.rowId} {...trip} />}) : 'No Trips reached , Change your preference a bit '}
                
            </div>
        </div>
    </section>
    </>
    )
}
