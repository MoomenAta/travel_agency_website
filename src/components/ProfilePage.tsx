
import styles from '../styles/profilePage.module.css';
import Controllers from '../subComponents/Controllers';
import LastMinutesDeals from '../subComponents/LastMinutesDeals';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
import { useEffect, useRef, useState } from 'react';
import { RootState } from '../store/store';
import AddCardPopUp from '../subComponents/AddCardPopUp';
//import { login } from '../store/loginSlice';
import { trip } from '../interfaces'; 
import { useAppSelector } from '../hooks';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );
  export const options = {
    responsive: true,
    maintainAspectRatio : false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: false,
        text: 'Chart.js Line Chart - Multi Axis',
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
      },
    },
  };

  
export type cardInfo = {
    name : string , cardNumber : number , month : number , year : number
}
export default function ProfilePage() {
    let user = useAppSelector((state : RootState)=> state.login.user);
    let [cards,setCards] = useState<cardInfo[] | []>([{name : 'Moomen' , cardNumber : 8064 , month : 11 , year : 23}]);
    let [historyTrips , setHistoryTrips] = useState<trip[]>([])
    let [openPopUp , setOpenPopUp] = useState<boolean>(false);
    useEffect(()=>{
        let prevIcon = document.querySelector('#purchaseHistory-prev') as HTMLSpanElement;
        let nextIcon = document.querySelector('#purchaseHistory-next') as HTMLSpanElement;
        let itemsContainer = document.querySelector('#purchaseHistoryItems') as HTMLDivElement;
        prevIcon.onclick = ()=>{
            itemsContainer.scrollBy(-250 , 0);
        }
        nextIcon.onclick = ()=>{
            itemsContainer.scrollBy(250 , 0);
        }
    })
    fetch(`${process.env.REACT_APP_API_LINK}/routes/readSpecificRoute.php?&type=camping`)
    .then((res)=>res.json()).then((data)=>{if(data)setHistoryTrips(data)})

    const labelss = () : number[]=> {
        let arr : number[] = [];
        for(let i :number = 1 ; i<=30 ; i++){
            arr.push(i);
        }
        return [...arr];
    };
    const labelssData = () : number[]=> {
        let arr : number[] = [];
        for(let i :number = 1 ; i<=30 ; i++){
            let arrayNum = [5 , 14 , 23]
            if(arrayNum.includes(i))
            arr.push(5000*Math.random());
            else arr.push(i*1000*Math.random())
        }
        return [...arr];
    };
    const labels = labelss();
    const labelsData1 = labelssData();
    
    const data = useRef<any>({
        labels,
        datasets: [
            {
                data: labelsData1,
                label: 'Dataset 1',
                borderColor: '#ea2d46',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                fill: true,
                tension: 0
            }
        ],
    });

    function removeEle(x:number){
        setCards(cards.filter((card , i)=> {return i !== x}))
    }
    let currentCard = useRef<number>(0)
    function prevCard(){
        let allCards = document.querySelectorAll('[data-num]');
        currentCard.current = currentCard.current === 0 ?  allCards.length - 2 : currentCard.current -1;
        document.querySelector('.highZIndex')?.classList.remove('highZIndex');
        (allCards[currentCard.current] as HTMLElement).classList.add('highZIndex');
        console.log(allCards[currentCard.current])
    }
    function nextCard(){
        let allCards = document.querySelectorAll('[data-num]');
        currentCard.current = currentCard.current === allCards.length-1 ?  0 : currentCard.current + 1;
        document.querySelector('.highZIndex')?.classList.remove('highZIndex');
        (allCards[currentCard.current] as HTMLElement).classList.add('highZIndex');
    }
    
    
    return(
    <main className={styles.prfilePageContainer}>
        <section className={styles.profilePageHead}>
            <img className={styles.bgImg} src='/imgs/waterfall.jpg' alt='waterfallIamge' />
            <div className={styles.profileInfo}>
                <div className={styles.profileImgContainer}>
                    <img src='/imgs/travelMountains.jpg' alt='profileImg' />
                    <span className={styles.cameraIconContainer}><span className='camera-icon'></span></span>
                </div>
                <div className={styles.profileName}>
                    <h1>{user && user.firstName} {user && user.lastName}</h1>
                    <div className={styles.profileRoutes}>
                        <ul>
                            <a href='#personalData'>
                                <li>Personal data</li>
                            </a>
                            <a href='#purchaseHistory'>
                                <li>Purchase history</li>
                            </a>
                            <a href='#favourites'>
                                <li>Favourites</li>
                            </a>
                            <a href='#interests'>
                                <li>Interests</li>
                            </a>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <section id='perosnalData' className={styles.personalDataContainer}>
            <div className={styles.personalData}>
                <h1>PERSONAL DATA</h1>
                
                <div className={styles.personalDataForm}>
                    
                    <div className={styles.inputNameContainer}>
                        <label>Your Name</label>
                        <div className={styles.inputContainer}>
                            <input type={'text'} placeholder='name' defaultValue={user?.firstName}  />
                            <span className='person-icon'></span>
                            <span className='edit-icon'></span>
                        </div>
                        
                    </div>
                    
                    <div className={styles.inputSurNameContainer}>
                        <label>Sur Name</label>
                        <div className={styles.inputContainer}>
                            <input type={'text'} placeholder='sur name' defaultValue={user?.lastName} />
                            <span className='person-icon'></span>
                            <span className='edit-icon'></span>
                        </div>
                        
                    </div>
                    
                    <div className={styles.inputDateContainer}>
                        <label>Date of birth</label>
                        <div className={styles.inputContainer}>
                            <input type={'date'} defaultValue={'2000-01-01'} />
                            <span className='date-icon'></span>
                            <span className='edit-icon'></span>
                        </div>
                    </div>
                    <div className={styles.inputResidenceAddressContainer}>
                        <label>Residence Address</label>
                        <div className={styles.inputContainer}>
                            <input type={'text'} placeholder='enter your address' />
                            <span className='location-icon'></span>
                            <span className='edit-icon'></span>
                        </div>
                    </div>
                    <div className={styles.inputPhoneContainer}>
                        <label>Phone</label>
                        <div className={styles.inputContainer}>
                            <input type={'text'} placeholder='enter your phone' />
                            <span className='phone-icon'></span>
                            <span className='edit-icon'></span>
                        </div>
                    </div>
                    <div className={styles.inputEmailContainer}>
                        <label>Email</label>
                        <div className={styles.inputContainer}>
                            <input type={'email'} placeholder='enter your email' defaultValue={user?.email} />
                            <span className='email-icon'></span>
                            <span className='edit-icon'></span>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className={styles.personalData}>
                <h1>CARDS</h1>
                {cards.length > 1 && <div className={styles.controllersContainer}><Controllers next={nextCard} prev={prevCard} ids={['prevCard' , 'nextCard']} /></div> }
                <div className={styles.cardsContainer}>
                    {cards.length === 0 && <div style={{display : 'flex' , alignItems:'center',height : '14rem' , justifyContent : 'center' , border : '1px dashed gray'}}>
                            <h2>You no credit cards</h2>
                    </div> }
                    {cards.map( (card , i) => {return(
                        <div key={i} data-num style={{left: `${(i > 2 ? 2 : i)*1}rem`,top: `${(i > 2 ? 2 : i) *0.3 }rem` , zIndex : i+1}} className={styles.cardInfoContainer}>
                            <div className={styles.pContainer}>
                                <p>MasterCard {card.cardNumber.toString().padStart(14,'*').slice(6)}</p>
                                <p>{card.month} / {card.year}</p>
                            </div>
                            <div className={styles.buttonLogoContainer}>
                                <button onClick={()=>removeEle(i)} type={'button'}>REMOVE</button>
                                <img src='/imgs/mc.png' width={100} height={50} alt='logo'/>
                            </div>
                        </div>
                    )})}
                    
                    
                </div>
                <button onClick={()=>setOpenPopUp(true)} className={styles.addCardButton} type='button'>ADD CARD</button>
                {openPopUp && <AddCardPopUp setOpenPopUp={()=>setOpenPopUp(!openPopUp)} cards={cards} setCards={setCards} />}
            </div>
        </section>
        <section className={styles.activityStatsContainer}>
            <h1>ACTIVITY STATISTICS</h1>
            <div className={styles.graphContainer}>
            <Line data={data.current} options={options} style={{maxHeight: '15rem' , height:'100%'}}/>
            </div>
        </section>
        <section className={styles.purchaseContainer}>
            <div id='purchaseHistory' className={styles.purchaseHead}>
                <h1>PURCHASE HISTORY</h1>
                <Controllers ids={['purchaseHistory-prev' , 'purchaseHistory-next' ]} />
            </div>
            <div id='purchaseHistoryItems' className={styles.purchaseHistoryItems}>
                {historyTrips && historyTrips.map(trip => {return <LastMinutesDeals key={trip.rowId} {...trip}/>})}
            </div>
        </section>
    </main>
    )
}
