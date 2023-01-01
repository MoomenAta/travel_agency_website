import React, {RefObject, useEffect , useMemo, useRef , useState} from 'react'
import styled from 'styled-components'
import { gsap } from "gsap";
import {useNavigate } from 'react-router-dom';
import Controllers from '../subComponents/Controllers';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { getAllTrips } from '../store/dataSlice';
import TourismSavageComponent from '../subComponents/TourismSavageComponent';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useAppDispatch } from '../hooks';
import { searchKeys, update } from '../store/searchKeysSlice';

export default function Home() {
    let navigate = useNavigate();
    //NAVIGATOR WHEN SEARCH BTN CLICKED & WINDOW SIZE LESS 628PX NO SEARCH BOX ANIAMTION PLAYED AND NAVIGATE TO SEARCH

    let [targetRoute , setTargetRoute] = useState<string>('tourism_savage');

    //VARS TO DETERMINE WHICH IMG INDEX TO DISPLAY
    let num : number = 1;
    let beforeImgNum : number = 0;

    //VARS THAT USED IN SEARCH PREFS
    let locationRef  = useRef<string>('');
    let starRef = useRef<number | null>(null);
    let locationItemsRef = useRef<HTMLLIElement[]>([]);
    let starItemsRef = useRef<HTMLLIElement[]>([]);
    let clickable = useRef<boolean>(true);

    //SEARCH BTN & ITS CONTAINER WHEN CLICKED PLAY ANIMATION AND SHOW SEARCH BOX CONTENT & WHEN HOVERED PLAY SLIDEUPDOWN ANIMATION 
    let searchBtnContainer = useRef<HTMLButtonElement>(null)
    let searchBtn = useRef<HTMLDivElement>(null)

    //SEARCH BOX THAT 'LL BE ANIMATED
    let search_box = useRef<HTMLDivElement>(null)
    //ICONS INSIDE SEARCH BOX
    let icon_container = useRef<HTMLSpanElement[]>([])
    //TEXT INSIDE SEARCH BOX
    let txt_container = useRef<HTMLSpanElement[]>([])
    //LIST EXPAND ICONS SPAN INSIDE SEARCH BOX 
    let list_expand_container = useRef<HTMLSpanElement[]>([])
    // LIST EXPAND ICON 
    let list_expand = useRef<any[]>([])
    //SEARCH BTN INSIDE SEARCH BOX
    let search_box_btn = useRef<HTMLButtonElement>(null)

    //DATA VAR FROM REDUX
    let data = useSelector((state: RootState) => state.data);
    let dispatch = useAppDispatch();
    //SEARCH KEYS
    let searchKeys : searchKeys = useSelector((state : RootState)=> {return state.searchKeys});
    //FETCH DATA ON LOAD
    useEffect(()=>{
        dispatch(getAllTrips());
    },[dispatch])

    let navigateToSearch = ()=>{
        if(locationRef.current){
            dispatch(update({...searchKeys , name : locationRef.current }))
        }
        if(starRef.current){
            dispatch(update({...searchKeys , stars : [...searchKeys.stars,starRef.current]}))
        }
        navigate({
            pathname : '/routes/search',
        })
    }
    

    /* FUNCTION TO CREATE REFS ARRAY BY PASSING REFNAME AND ELEMENT*/
    let addToRefsArray = <T,>(el : T , refName : RefObject<T[]>)=>{
        if(el && !refName.current?.includes(el) ){
            refName.current?.push(el);
        }
    }

    /* FUNCTION THAT PLAYS IMGS ANIMATION */
    let showImgMemo = useMemo(()=> function showImg(num:number,beforeImgNum:number){
        
            clickable.current = false;
            let currentActiveImg =  document.querySelectorAll(`.img-${num}`) as NodeListOf<HTMLElement>;
            let previousActiveImg = document.querySelectorAll(`.img-${beforeImgNum}`) as NodeListOf<HTMLElement>;
            let solidSliders = document.querySelectorAll(`.solid-slider`) as NodeListOf<HTMLElement>;
            /* LINE ANIMATION */
            let line_two = document.querySelector('[data-line-two]') as HTMLElement;
            line_two.style.width = `${num*(100/3)}%`
    
            for(let i = 0 ; i < currentActiveImg.length ; i++){
                currentActiveImg[i].style.zIndex = '4'
                if(beforeImgNum>0){
                    previousActiveImg[i].style.zIndex = '2';
                }
            }
            let imgSlidetl = gsap.timeline({defaults:{duration : 1}})
            if(beforeImgNum>0){
            imgSlidetl.to(solidSliders , { width:'90%' , duration:0.5 , stagger : {each : 0.2 , from : 'end'} , ease : 'Power1.easeInOut'  } )
            .to(currentActiveImg , { x:'80%' , duration:0.5 , stagger : {each : 0.2 , from : 'end'} , ease : 'Power1.easeInOut'  } ,0.25)
            .to(solidSliders , { width:'0%' , duration:0.5 , stagger : {each : 0.2 , from : 'end'} , ease : 'Power1.easeInOut'} ,0.5)
            .to(currentActiveImg , { x:0 , duration:0.5 , stagger : {each : 0.2 , from : 'end'} , ease : 'Power1.easeInOut'  } ,0.5)
            .to(previousActiveImg , { x:'100%' , duration:0.5 , stagger : {each : 0.2 , from : 'end'} , ease : 'Power1.easeInOut'} , 1 )}
            else{
            imgSlidetl.to(solidSliders , { width:'90%' , duration:0.5 , stagger : {each : 0.2 , from : 'end'} , ease : 'Power1.easeInOut'  } )
            .to(currentActiveImg , { x:'80%' , duration:0.5 , stagger : {each : 0.2 , from : 'end'} , ease : 'Power1.easeInOut'  } ,0.25)
            .to(solidSliders , { width:'0%' , duration:0.5 , stagger : {each : 0.2 , from : 'end'} , ease : 'Power1.easeInOut'} ,0.5)
            .to(currentActiveImg , { x:0 , duration:0.5 , stagger : {each : 0.2 , from : 'end'} , ease : 'Power1.easeInOut'  } ,0.5)}
            setTimeout(() => {
                clickable.current = true;
            }, 1000);
        }
    ,[])
    /* PLAY ANIMATION WHEN COMPONENT AMOUT */
    useEffect(()=>{
        window.scrollTo(0,0);
        showImgMemo(num,beforeImgNum);
    },[showImgMemo,beforeImgNum,num])

    /* SEARCH BOX ANIMATION */
    var tl1 = gsap.timeline({defaults: {duration : 0.5}});
    //BOOLEAN TO CHECK IS SEARCH BOX IS OPEN OR NOT
    let searchBoxOpen = false;
    
    function addSearchBoxAnimation(){
        if( window.innerWidth >= 628 && window.innerHeight > 500)
        {
            if(searchBoxOpen) return;
            searchBoxOpen = true;
            tl1.to(search_box.current,{ zIndex : 7,opacity : 1 , width: '80%' , height: '1px' , ease:'ease-in-out'}) //0
            .to(search_box.current,{ height: '10rem' ,ease:'ease-in-out'}) // 0.5
            .to(icon_container.current[0] , {scale : 1 , opacity : 1  ,ease:'ease-in-out' }) //1
            .to(icon_container.current[1] , {scale : 1 , opacity : 1 ,top:'0' ,ease:'ease-in-out'}) //1.5
            .to(txt_container.current[0] , {bottom : 0 , opacity : 1  ,ease:'ease-in-out'} , '1')//1.5
            .to(txt_container.current[1] , {bottom : 0 , opacity : 1  ,ease:'ease-in-out'} ,'1.5') //2
            .to(txt_container.current[2] , {bottom : 0 , opacity : 1  ,ease:'ease-in-out'} ) //2.5
            .to(txt_container.current[3] , {bottom : 0 , opacity : 1  ,ease:'ease-in-out'} ) //3
            .to(list_expand_container.current[0] , {scale : 1 , opacity : 1  ,ease:'ease-in-out' } , "1.5")
            .to(list_expand.current[0] , {top : 0 , opacity : 1  ,ease:'ease-in-out'} , "2")//10
            .to(list_expand_container.current[1] , {scale : 1 , opacity : 1  ,ease:'ease-in-out' } , "2")
            .to(list_expand.current[1] , {top : 0 , opacity : 1  ,ease:'ease-in-out'} , "2.5")
            .to(search_box_btn.current , {width : '100%'  ,ease:'ease-in-out'} )
            tl1.play();
            
        }
        else{
            navigate('/search')
        }
    }

    function removeBoxAnimation(){
        searchBoxOpen = false;
        tl1.reverse();
    }

    /* WHEN NEXT BUTTON IS BEING CLICKED */
    let nextImg = ()=>{
        if(!clickable) return;
        num = (num === 3) ? 1 : num+1
        beforeImgNum = (num === 1) ? 3 : num-1
        showImgMemo(num,beforeImgNum);
    }
    /* WHEN PREV BUTTON IS BEING CLICKED */
    let prevImg = ()=>{
        if(!clickable) return;
        num = (num === 1) ? 3 : num-1
        beforeImgNum = (num === 3) ? 1 : num+1
        showImgMemo(num,beforeImgNum);
    }
    
    /* SCROLL MOUSE ANIMATION  */
    let slideUpDownAnimation = ()=>{
        searchBtn.current?.classList.remove('btn-top')
        searchBtn.current?.classList.add('btn-top')
        searchBtnContainer.current?.addEventListener('mouseout',()=>{
            searchBtn.current?.classList.remove('btn-top')
        })
    }

    //show expandable List
    function showExpandableList(i:number){
        let listToExpand = document.getElementsByClassName('listToExpand')[i] as HTMLElement;
        listToExpand.classList.add('showExpandableList')
    }
    function hideExpandableList(i:number){
        let listToExpand = document.getElementsByClassName('listToExpand')[i] as HTMLElement;
        listToExpand.classList.remove('showExpandableList')
    }
    
    /* END SEC-1 ANIMATION ************************************************************************/
    
    //function to slide up div on scroll
    function slideUpDiv(){
        let sec2 = document.getElementById('sec2') as HTMLElement;
        let sec3 = document.getElementById('sec3') as HTMLElement;
        let sec4 = document.getElementById('sec4') as HTMLElement;
        [sec2 , sec3 , sec4].forEach((ele)=>{
            let eleRect = ele.getBoundingClientRect();
            if(eleRect.y + 150 < window.innerHeight){
            ele.classList.add('slideUpDiv');
            }
        })
    }

    // ALL LOGIC
    useEffect(()=>{
        locationItemsRef.current?.forEach((el)=>{
            el.addEventListener('click',()=>{
                let curr = locationItemsRef.current?.find((ele) => ele.classList.contains('activeListItem'));
                curr?.classList.remove('activeListItem');
                el.classList.add('activeListItem');
                if(el.dataset.name !== undefined)
                locationRef.current = el.dataset.name;
            })
        });
        starItemsRef.current?.forEach((el , i)=>{
            el.addEventListener('click',()=>{
                let curr = starItemsRef.current?.find((ele) => ele.classList.contains('activeListItem'));
                curr?.classList.remove('activeListItem');
                el.classList.add('activeListItem');
                starRef.current = -i + 5;
            })
        })


        /* START OF SEC 2 */
        let sec2 = document.getElementById('sec2') as HTMLElement;
        window.addEventListener('scroll' , slideUpDiv);
        if(sec2.getBoundingClientRect().y + 150 < window.innerHeight){
            sec2.classList.add('slideUpDiv');
        }
        let routesUl = document.querySelectorAll('[data-sec2-ul] li') as NodeListOf<HTMLLIElement>;
        routesUl.forEach((li : HTMLLIElement)=>{
            li.addEventListener('click',()=>{
            let currentActive = document.querySelector('.active') as HTMLElement;
            currentActive.classList.remove('active');
            li.classList.add('active');
            setTargetRoute(li.dataset.target!.replace(' ','_'))
            })
        })

        /* CONTROLLERS */
        let sec_2_controllers_next = document.querySelector('#sec2-next') as HTMLElement;
        let sec_2_controllers_prev = document.querySelector('#sec2-prev') as HTMLElement
        let components_container = document.querySelector('.components-container') as HTMLElement;
        sec_2_controllers_next.addEventListener('click',()=>{
            components_container.scrollBy(250,0)
        })
        sec_2_controllers_prev.addEventListener('click',()=>{
            components_container.scrollBy(-250,0)
        })
        /* END OF SEC 2 */


        /* START OF SEC 3 */
        let sec3 = document.getElementById('sec3') as HTMLElement;
        if(sec3.getBoundingClientRect().y < window.innerHeight){
            sec3.classList.add('slideUpDiv');
        }
        const path = document.querySelector('[data-road-path]') as HTMLElement;
        let sec_3 = document.querySelector('[data-sec-3]') as HTMLDivElement;
        let points_span = document.querySelectorAll('.point');
        let p_1 = document.querySelector('[data-p-1]')
        let p_2 = document.querySelector('[data-p-2]')
        let msgkm = document.querySelector('[data-msgkm]')
        let tl2run = false;
        //ANIMATION FUNCTION ON SEC3 ON SCROLL
        function sec3Scroll(){
            let currPos = sec_3.getBoundingClientRect();
            let tl2 = gsap.timeline({defaults:{duration : 1}});
            if(currPos.top + 200 <= window.innerHeight && !tl2run)
            {
                tl2run = true;
                gsap.to('.sec-3-part-2-txt-container' , {ease:'Power1.easeIn' , duration : 1.2 , scale : 1 ,opacity : 1 , left : 0 })
                tl2.to(points_span[0],{scale : 0 , duration:0.4 , ease : 'Power1.easeIn'})
                .to(points_span[0],{scale : 1.4 , duration:0.4 , ease : 'Power1.easeIn'})
                .to(points_span[0],{scale : 1.2 , duration:0.2 , ease : 'Power1.easeIn'})
                .to(path,{strokeDashoffset : '1095.38', strokeDasharray : '1425.38' , duration:3 , ease : 'Power1.easeIn'},1)
                .to(p_1,{y : 0 , opacity : 1 , duration:1 , ease : 'Power1.easeIn'},'2.8')
                .to(points_span[1],{scale : 0 , duration:0.4 , ease : 'Power1.easeIn'},4)
                .to(points_span[1],{scale : 1.4 , duration:0.4 , ease : 'Power1.easeIn'},4)
                .to(points_span[1],{scale : 1.2 , duration:0.2 , ease : 'Power1.easeIn'},4)
                .to(path,{strokeDashoffset : '866.38', strokeDasharray : '1425.38' , duration:3 , ease : 'Power1.easeIn'},4)
                .to(points_span[2],{scale : 0 , duration:0.4 , ease : 'Power1.easeIn'},7)
                .to(points_span[2],{scale : 1.4 , duration:0.4 , ease : 'Power1.easeIn'},7)
                .to(points_span[2],{scale : 1.2 , duration:0.2 , ease : 'Power1.easeIn'},7)
                .to(path,{strokeDashoffset : '400.38', strokeDasharray : '1425.38' , duration:3 , ease : 'Power1.easeIn'},7)
                .to(p_2,{ rotation : '180deg' , y : 0 , opacity : 1 , duration:1 , ease : 'Power1.easeIn'},12)
                .to(points_span[3],{scale : 0 , duration:0.4 , ease : 'Power1.easeIn'},10)
                .to(points_span[3],{scale : 1.4 , duration:0.4 , ease : 'Power1.easeIn'},10)
                .to(points_span[3],{scale : 1.2 , duration:0.2 , ease : 'Power1.easeIn'},10)
                .to(path,{strokeDashoffset : '0', strokeDasharray : '1425.38' , duration:3 , ease : 'Power1.easeIn'},10)
                .to(points_span[4],{scale : 0 , duration:0.4 , ease : 'Power1.easeIn'},13)
                .to(points_span[4],{scale : 1.4 , duration:0.4 , ease : 'Power1.easeIn'},13)
                .to(points_span[4],{scale : 1.2 , duration:0.2 , ease : 'Power1.easeIn'},13)
                .to(msgkm,{y: 0 , opacity : 1 , duration:1 , ease : 'Power1.easeIn'},12.5)
            }
        }
        window.addEventListener('scroll',sec3Scroll);
        /* END OF SEC 3 */

        /* START SEC 4 */
        let sec4 = document.getElementById('sec4') as HTMLElement;
        if(sec4.getBoundingClientRect().y < window.innerHeight){
            sec4.classList.add('slideUpDiv');
        }
        /* CONTROLLERS */
        let sec_4_controllers_next = document.querySelector('#sec4-next') as HTMLSpanElement;
        let sec_4_controllers_prev = document.querySelector('#sec4-prev') as HTMLSpanElement;
        let media_container = document.querySelector('[data-media-container]') as HTMLDivElement;
        let mediaH1 = document.querySelectorAll('.media h1') as NodeListOf<HTMLHeadingElement>
        let h1Num = 0;
        var imgWidth = document.querySelector('.media-active')?.clientWidth || 800;
        window.onresize = ()=>{
            imgWidth = document.querySelector('.media-active')!.clientWidth;
        }
        sec_4_controllers_next.addEventListener('click',()=>{
            if(h1Num === mediaH1.length-1){
                media_container.scrollBy(imgWidth,0);
                return;
            }
            h1Num++;
            document.querySelector('.media-active')?.classList.remove('media-active')
            mediaH1[h1Num].classList.add('media-active');
            media_container.scrollBy(imgWidth,0)

        })
        sec_4_controllers_prev.addEventListener('click',()=>{
            if(h1Num === 0){
                media_container.scrollBy(-imgWidth,0);
                return;
            }
            h1Num--;
            document.querySelector('.media-active')?.classList.remove('media-active')
            mediaH1[h1Num].classList.add('media-active');
            media_container.scrollBy(-imgWidth,0)
        })
        /* END OF SEC 4 */

        return ()=> {
            window.removeEventListener('scroll' ,slideUpDiv);
            window.removeEventListener('scroll',sec3Scroll);
        };
        
    },[])

    return (
        <>
        <Sec1Container className="sec-1-container">
                <ImgsContainer className="imgsContainer">
                    <div className="imgs-container imgs-part-1">
                        <span className="solid-slider"></span>
                        <img className='img-1' src="./imgs/1/0.jpg" alt="0" />
                        <img className='img-2' src="./imgs/1/1.jpg" alt="1" />
                        <img className='img-3' src="./imgs/1/2.jpg" alt="2" />
                    </div>
                    <div className="imgs-container imgs-part-2">
                        <span className="solid-slider"></span>
                        <img className='img-1' src="./imgs/2/0.jpg" alt="0" />
                        <img className='img-2' src="./imgs/2/1.jpg" alt="1" />
                        <img className='img-3' src="./imgs/2/2.jpg" alt="2" />
                    </div>
                    <div className="imgs-container imgs-part-3">
                        <span className="solid-slider"></span>
                        <img className='img-1' src="./imgs/3/0.jpg" alt="0" />
                        <img className='img-2' src="./imgs/3/1.jpg" alt="1" />
                        <img className='img-3' src="./imgs/3/2.jpg" alt="2" />
                    </div>
                    <div className="imgs-container imgs-part-4">
                        <span className="solid-slider"></span>
                        <img className='img-1' src="./imgs/4/0.jpg" alt="0" />
                        <img className='img-2' src="./imgs/4/1.jpg" alt="1" />
                        <img className='img-3' src="./imgs/4/2.jpg" alt="2" />
                    </div>
                    <div className="imgs-container imgs-part-5">
                        <span className="solid-slider"></span>
                        <img className='img-1' src="./imgs/5/0.jpg" alt="0" />
                        <img className='img-2' src="./imgs/5/1.jpg" alt="1" />
                        <img className='img-3' src="./imgs/5/2.jpg" alt="2" />
                    </div>
                    
                </ImgsContainer>
                <div className="txtContainer">
                        <h1>Discover <span className="diff-font">the</span></h1>
                        <h1>
                            <span>P</span>
                            <span>L</span>
                            <span>A</span>
                            <span>N</span>
                            <span>E</span>
                            <span>T</span>
                        </h1>
                        <button onMouseOver={()=>slideUpDownAnimation()} onClick={()=> addSearchBoxAnimation()} ref={searchBtnContainer} type="button">
                            <div className="btn-content" ref={searchBtn}>
                                <span>TO BEGIN</span>
                                <span className='search-icon' style={{ backgroundColor: 'white' , width:'1.5rem' , height : '1.5rem'}}></span>
                                </div>
                        </button>
                </div>
                <div className="controllersContainer">
                    <span data-mouse-scroll className="mouse-icon-container">
                        <span className='mouse-icon'></span>
                        <span></span>
                        <span></span>
                    </span>
                    <div className="controllers-line">
                        <div className="controllers">
                            <span className="location-icon-container">
                                <span className='location-icon' style={{backgroundColor : 'white'}}></span>
                            </span>
                            <span data-prev onClick={prevImg} className="prev-icon-container">
                                <span className='prev-icon' style={{backgroundColor : 'black' , width : '2rem' , height : '2rem'}}></span>
                            </span>
                            <span data-next onClick={nextImg} className="next-icon-container">
                                <span className='next-icon' style={{backgroundColor : 'black' , width : '2rem' , height : '2rem'}}></span>
                            </span>
                            <span className="line"><span data-line-two className="line-two"></span></span>
                        </div>
                    </div>
                </div>
                <SubSearchContent data-search-box ref={search_box} className="sub-search-content">
                    <span className='close-icon-container' >
                        <span className='close-icon' onClick={()=> removeBoxAnimation() }></span>
                    </span>
                    <ul className="search-box-ul">
                        <li onMouseEnter={()=>showExpandableList(0)} onMouseLeave={()=>hideExpandableList(0)} className='itemExpandable'>
                            <div className="li-content">
                            <span data-icon ref={el => addToRefsArray(el , icon_container)} className="icon">
                            <span className='location-icon' style={{width : '1.5rem' , height : '1.5rem'}}></span>
                            </span>
                            <span data-txt ref={el => addToRefsArray(el , txt_container)} className="txt search-li-text">LOCATION</span>
                            </div>
                            <span  data-list-expand-container ref={el => addToRefsArray(el , list_expand_container)} className="list-expand-container">
                                <svg data-list-expand ref={el => addToRefsArray(el , list_expand)} className="list-expand" xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 50 50" width="1.5rem" ><path d="M18.75 36.7 15.9 33.85 25.8 23.95 15.9 14.05 18.75 11.2 31.5 23.95Z"/></svg>
                            </span>
                            <ul className='listToExpand'>
                                <li ref={el => addToRefsArray(el , locationItemsRef ) } data-name='Cairo'>Cairo</li>
                                <li ref={el => addToRefsArray(el , locationItemsRef ) } data-name='London'>London</li>
                                <li ref={el => addToRefsArray(el , locationItemsRef ) } data-name='Roma'>Roma</li>
                                <li ref={el => addToRefsArray(el , locationItemsRef ) } data-name='Madrid'>Madrid</li>
                            </ul>
                        </li>
                        <li onMouseEnter={()=>showExpandableList(1)} onMouseLeave={()=>hideExpandableList(1)} className='itemExpandable'>
                            <div className="li-content">
                            <span data-icon ref={el => addToRefsArray(el , icon_container)} className="icon route-icon">
                                <span className='location-icon' style={{width : '1.5rem' , height : '1.5rem'}}></span>
                            </span>
                            <span data-txt ref={el => addToRefsArray(el , txt_container)} className="txt search-li-text">ROUTE LEVEL</span>
                            </div>
                            <span  data-list-expand-container ref={el => addToRefsArray(el , list_expand_container)} className="list-expand-container">
                                <svg data-list-expand ref={el => addToRefsArray(el , list_expand)} className="list-expand" xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 50 50" width="1.5rem" ><path d="M18.75 36.7 15.9 33.85 25.8 23.95 15.9 14.05 18.75 11.2 31.5 23.95Z"/></svg>
                            </span>
                            <ul className='listToExpand' >
                                <li ref={el => addToRefsArray(el , starItemsRef ) }>5 Star</li>
                                <li ref={el => addToRefsArray(el , starItemsRef ) }>4 Star</li>
                                <li ref={el => addToRefsArray(el , starItemsRef ) }>3 Star</li>
                                <li ref={el => addToRefsArray(el , starItemsRef ) }>2 Star</li>
                                <li ref={el => addToRefsArray(el , starItemsRef ) }>1 Star</li>
                            </ul>
                        </li>
                        <li>
                            <div className="li-content">
                            <span data-txt ref={el => addToRefsArray(el , txt_container)} className="txt search-li-text">With guide</span>
                            <input type="radio" name="type" />
                            </div>
                        </li>
                        <li>
                            <div className="li-content">
                            <span data-txt ref={el => addToRefsArray(el , txt_container)} className="txt search-li-text">Savage</span>
                            <input type="radio" name="type" />
                            </div>
                        </li>
                        <li>
                            <button onClick={()=>navigateToSearch()} data-search-btn ref={search_box_btn} type="button">SEARCH</button>
                        </li>
                    </ul>
                </SubSearchContent>
        </Sec1Container>
        
        <Sec2Container id="sec2" className="sec-2-container">
                    <h1>POPULAR ROUTES</h1>
                    <ul data-sec2-ul>
                        <li data-target='tourism savage' className="active">Tourism savage</li>
                        <li data-target='camping'>Camping</li>
                        <li data-target='hitch hiking'>Hitch-hiking</li>
                        <li data-target='car travel'>Car travel</li>
                    </ul>
                    <div className="components-container">
                        {!(data.length<0) ? data.filter((trip)=> trip.tableId === targetRoute).map((tripdata)=> {return (<TourismSavageComponent key={tripdata.rowId} {...tripdata}/>)})  : 'Loading...'}
                    </div>
                    <Controllers ids={['sec2-prev' , 'sec2-next' ]}/>

        </Sec2Container>
        
        <Sec3Container id="sec3" data-sec-3 className="sec-3-container">
            <div className="sec-3-part-1">
                <LazyLoadImage src="./imgs/roadedit.jpg" alt="road"/>
                <div className="sec-3-part-1-txt-container">
                    <div className="svg-points-container">
                        <svg xmlns="http://www.w3.org/2000/svg" width="379" height="295" viewBox="0 0 379 295">
                            <path data-road-path className="road-path" d="M378,269s-23.5-10.5-34-41-32,24.5-35,30-52,68-114,13c0,0-12.5-16.5-44-1,0,0-16.5,29-40,18s-34-25-24-60-53-38-59-38-32,2.5-25-31,25-31,32-32,16-7.5,18,7,1.382,32.618,28,6c17-17,66.5,80.5,110,50,41.308-28.963,36.5-48.5,91-55,0,0,31-2.5,52-26s18.5-18,4-63c0,0,14.5-24-12-27s-26.5,2-79-17c0,0-1-3.5-22,10s-35.5,29-51,2c0,0-8-11.5-31-7s-25,15.5-31,20S74,72,65,57,47,23.5,42,13"/>
                        </svg>
                        <span className="point"></span>
                        <span className="point"></span>
                        <span className="point"></span>
                        <span className="point"></span>
                        <span className="point"></span>
                        <span data-p-1 className="plane p-1 p-1-hidden">
                            <svg width="14px" height="14px" fill="red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.21v-1.895L14 8V4a2 2 0 0 0-4 0v4.105L2 14.42v1.789l8-2.81V18l-3 2v2l5-2 5 2v-2l-3-2v-4.685l8 2.895z"/></svg>
                        </span>
                        <span data-p-2 className="plane p-2 p-2-hidden">
                            <svg width="14px" height="14px" fill="red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.21v-1.895L14 8V4a2 2 0 0 0-4 0v4.105L2 14.42v1.789l8-2.81V18l-3 2v2l5-2 5 2v-2l-3-2v-4.685l8 2.895z"/></svg>
                        </span>
                        <span data-msgkm className="msgkm msgkm-hidden">
                            658 Km
                        </span>

                    </div>
                    
                </div>
            </div>
            <div className="sec-3-part-2">
                <LazyLoadImage src="./imgs/travelMountainsedit.jpg" alt="travelMountains"/>
                <div className="sec-3-part-2-txt-container">
                    <h1>HOW <span>DOES</span> <span className="diff-font">It</span> <br/> WORK ?</h1>
                    <p>Lorem lpsum is simply dummy text of the printing and typeset
                    ting industry. Lorem Ipsum has been the industry's standard
                    dummy text ever since the 1500s, when an unknown printer
                    took a galley of type and scrambled it to make a type speci-
                    men book. It has survived not only fve centuries, but also the
                    leap into electronic typesetting, rémaining essentially un-
                    changed. It was popularised in the 1960s with the release of
                    Letraset sheets containing Lorem Ipsum passages, and more
                    recently with desktop publishing software like Aldus PageMak
                    or including versions of Lorem Ipsum.</p>
                    <button type="button">DETAILS</button>
                </div>
            </div>
        </Sec3Container>

        <Sec4Container id="sec4" className="sec-4-container">
            <div data-media-container className="media-container">
                <div className="media">
                    <h1 className="media-active">MOUNTAINS RANGES</h1>
                    <div className="media-part">
                        <LazyLoadImage src="./imgs/mountain.jpg" alt="media" />
                    </div>
                </div>
                <div className="media">
                    <h1>FAR FROM PEOPLE</h1>
                    <div className="media-part">
                        <LazyLoadImage src="./imgs/icemountain.jpg" alt="media" />
                    </div>
                </div>
                <div className="media">
                    <h1>FAR FROM PEOPLE</h1>
                    <div className="media-part">
                        <LazyLoadImage src="./imgs/mountain.jpg" alt="media" />
                    </div>
                </div>
            </div>
            <div className='controllers-container'>
                <Controllers ids={['sec4-prev' , 'sec4-next' ]} />
            </div>
            
        </Sec4Container>
        
        </>
    )
}

const ImgsContainer = styled.div`
    position: relative;
    height: 98vh;
    display: grid;
    grid-template-columns: repeat(5,1fr);
    background-color: rgb(0, 0, 75);
    &::before{
        content: '';
        position: absolute;
        z-index: 5;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: #0f0e131f;
    }

    div{
        position : relative;
        overflow : hidden;

        img{
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 2;
            transform: translateX(100%);
            transform-origin: right;
        }
        .solid-slider{
            display: inline-block;
            position: absolute;
            width: 0%;
            transform-origin: left;
            height: 100%;
            background-color: rgb(0, 0, 75);
            z-index: 6;
            border-left: 1px solid rgb(230, 230, 230);
        }
    }
    @media screen and (max-width : 628px){
        height : 80vh;
    }

`
const Sec1Container = styled.section`
    position : relative;
    .txtContainer
    {
        font-size : 16px;
        position: absolute;
        z-index: 7;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        h1:nth-of-type(1){
            font-size: 3.5em;
            padding-bottom: 0.7em;
            text-align: center;
            color: white;
            position: relative;
            font-weight: 800;

            &::before{
                position: absolute;
                content: '';
                width: 130%;
                bottom: 0.9em;
                left: 50%;
                right: 50%;
                transform: translate(-50%,-50%);
                height: 2px;
                background-color: white;
            }
        }
        h1:nth-of-type(2){
            font-size: 7em;
            color: white;
            -webkit-text-fill-color: #f0f8ff00;
            -webkit-text-stroke-width: 3px;
            -webkit-text-stroke-color: white;
            padding-bottom: 0.1em;
            display : flex;
            align-items : center;
            gap : 0.5em;
        }

        button{
            padding: 0.7em 2em;
            font-size: 1em;
            font-weight: bold;
            letter-spacing: 0.2rem;
            border: none;
            outline: none;
            background-color: var(--active-color);
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            position : relative;
            z-index : 999;
        }
        .btn-content{
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            transition: all 500ms ease-in-out;
        }
        .search-icon{
            fill: white;
        }

        @media screen and (max-height : 500px){
            font-size : 8px;
        }
    }
    .controllersContainer{
        position: absolute;
        width: 100%;
        color: white;
        z-index: 6;
        bottom: 2em;
        left: 50%;
        transform: translate(-50%,0%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1em;
    }
    .mouse-icon-container{
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        align-items: center;
        justify-content: center;
        animation: scroll-icon-animation 1.5s ease-in-out infinite both;

        span{
            display: flex;
            width: 0.2em;
            height: 0.2em;
            border-radius: 50%;
            background-color: #9f9f9f;
        }
        @media screen and (max-width:628px){
            display : none;
        }
    }
    .controllers-line{
        width: 60%;

        .controllers{
            display: flex;
            align-items: center;
            gap: 0.5em;
        }
    }
    .location-icon-container , .prev-icon-container , .next-icon-container {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .prev-icon-container , .next-icon-container{
        
        border-radius: 50%;
        background-color: white;
    }
    .line{
        width: 100%;
        height: 1px;
        background-color: rgba(255, 255, 255, 0.295);
        display: inline-block;
        position: relative;
    }
    .line-two{
        position: absolute;
        width: 0%;
        height: 1px;
        background-color: white;
        transition: all 2s ease-in-out;
    }

    @media screen and (max-width : 628px){
        .txtContainer{
            font-size : 14px;

            h1:nth-of-type(2){
                gap : 0.2em;
                font-size : 5em;
            }
        }
        .controllersContainer{
            .controllers-line{
                width : 90%;
            }
        }
    }
    @media screen and (max-width : 280px){
        .txtContainer{
            h1:nth-of-type(1){
                font-size : 2em;
            }
            h1:nth-of-type(2){
                font-size : 3.5em;
            }
        }
    }
`

const SubSearchContent = styled.div`
    opacity : 0;
    position: absolute !important;
    width: 0%;
    height: 1px;
    color: rgb(49, 49, 49);
    background-color: white;
    z-index: 0;
    top: 85%;
    left: 50%;
    transform: translate(-50%,0%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow : 0 0 14px #7a7a7a4f;
    

    .close-icon-container{
        z-index : 5;
        position : absolute;
        width : 2rem;
        height : 2rem;
        border-radius : 50%;
        text-align : center;
        top : -1rem;
        right : 0;
        background-color : white;
        color : white;
        display : flex;
        justify-content : center;
        align-items : center;
        cursor : pointer;
    }
    ul{
        list-style-type: none;
        max-width: 86%;
        width: 100%;
        margin: 0 auto;
        /* display: grid;
        grid-template-columns: repeat(5,1fr); */
        display : flex;
        flex-wrap : wrap;
        align-items : center;
        justify-content : space-between;
        gap: 0.5rem;

        li{
            flex-shrink : 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;

            &:nth-of-type(3), :nth-of-type(4){
                justify-content: flex-end;
            }
            &:nth-of-type(5){
                width : 20%;
            }
            button{
                width: 0%;
                height: 3rem;
                display : flex;
                align-items : center;
                justify-content : center;
                background-color: var(--active-color);
                color: white;
                font-weight: bold;
                overflow: hidden;
                border: none;
                border-radius: 3px;
                cursor: pointer;
            }
        }
        .li-content{
            display: flex;
            align-items: center;
            width: fit-content;
            overflow: hidden;
            gap: 0.5rem;
        }
        .search-li-text{
            font-size: 1.2rem;
            font-weight: bold;
        }

        .itemExpandable{
            position : relative;
        }
        .listToExpand{
            width : 100%;
            position : absolute;
            bottom : -7rem;
            flex-direction : column;
            align-items : flex-start;
            height: 7rem;
            overflow-y: scroll;
            flex-wrap: nowrap;
            max-width : 100%;
            
            background-color : white;
            box-shadow : 0 0 16px #28282836;
            gap : 0;
            border-radius : 0.2rem;
            display : none;
            li{
                width:100%;
                justify-content : flex-start;
                font-weight : bold;
                height: 3rem;
                align-items: center;
                line-height: 0;
                padding: 0rem 1rem;
            }
        }

        .list-expand-container{
            cursor : pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 50%;
            box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.205);
            transform-origin: center;
            transform:scale(0);
            overflow: hidden;
        }
        .route-icon{
            top: -2rem;
        }
        .icon{
            fill: var(--active-color);
            opacity: 0;
            transform: scale(0.4);
            transform-origin: bottom;
            position: relative;
        }
        .txt{
            position: relative;
            overflow: hidden;
            bottom : -5rem;
        }
        .list-expand{
            position: relative;
            transform: rotate(90deg);
            fill:var(--active-color);
            overflow: hidden;
            top: -50px;
        }
    }

    @media screen and (max-width: 628px){
        padding : 0.5rem;
        
        ul{
            max-width : 100%;
            gap : 1rem;
            justify-content : center;

            li{
                max-width : 8rem;
                &:nth-of-type(3), :nth-of-type(4){
                    justify-content: flex-start;
                    div{
                        width : 100%;
                        display : flex;
                        align-items : center;
                        justify-content : space-between;
                    }
                }
                &:last-child{
                    width: 30%;
                }
            }

            .list-expand-container{
                width : 1.5rem;
                height : 1.5rem;
            }

            .search-li-text{
                font-size : 0.8em;
            }
        }

        
    }

`
const Sec2Container = styled.div`
    opacity : 0;
    position : relative;
    max-width: 90rem;
    margin: 0 auto;
    padding: 4rem 1rem;

    h1{
        font-size: 3rem;
        font-weight: bold;
        padding: 3rem 0;
    }

    ul{
        display: flex;
        max-width: 30rem;
        width: 100%;
        height: 2rem;
        justify-content: space-between;
        align-items: center;
        list-style-type: none;
        font-weight: bold;
        color: rgb(202, 202, 202);
        font-size: 0.85rem;
        padding-bottom: 0rem;
        position: relative;
        gap : 0.5rem;
        overflow : overlay;

        &::before{
            content: '';
            width: 100%;
            height: 2px;
            bottom: 0;
            z-index: 1;
            background-color: rgb(226, 226, 226);
            position: absolute;
        }

        li{
            flex-shrink : 0;
            cursor: pointer;
            position: relative;
            height: 2rem;
            padding-bottom: 0.8rem;
            height: 100%;
            z-index: 1;
        }
    }

    .components-container{
        padding: 2rem 0;
        display: flex;
        gap: 2rem;
        align-items: flex-start;
        overflow: hidden;
        scroll-behavior: smooth;
        -webkit-scroll-snap-type: both mandatory;
        -moz-scroll-snap-type: both mandatory;
        -ms-scroll-snap-type: both mandatory;
        scroll-snap-type: both mandatory;
        -webkit-scroll-snap-align: start;
        -moz-scroll-snap-align: start;
        -ms-scroll-snap-align: start;
        scroll-snap-align: start;
    }
    @media screen and (max-width : 768px){
        padding: 2rem 1rem;
        h1{
            font-size: 1.5rem;
            padding: 2rem 0;
        }
        ul{
            &::before{
                display : none;
            }
        }
    }

    @media screen and (max-width : 320px){
        .components-container{
            overflow : scroll;
        }
        .components-container > div{
            max-width : 16rem;
        }
    }
`
const Sec3Container = styled.div`
    display: flex;
    margin: 0 auto;
    width: 100%;
    opacity : 0;
    position : relative;
    & > div{
        position: relative;
        width: 50%;
        min-height: 35rem;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;

        &> img{
            width: 100%;
            height: 100%;
            z-index: -1;
            position: absolute;
            top: 0;
            left: 0;
            object-fit: cover;
        }
    }
    .sec-3-part-2{
        padding : 1rem 0;
    }
    .sec-3-part-1-txt-container , .sec-3-part-2-txt-container{
        width: 50%;
        display: flex;
        flex-direction: column;
    }
    .sec-3-part-1-txt-container{
        align-items: center;
    }
    .sec-3-part-2-txt-container{
        width : 70%;
    }
    .svg-points-container{
        position: relative;
        &> span {
            position: absolute;
        }
    }
    .point{
        width: 16px;
        height: 16px;
        background-color: var(--active-color);
        border: 3px solid white;
        border-radius: 50%;
        display: inline-block;
        position: absolute;
        transform: scale(0);
        
        &:nth-of-type(1){
            bottom: 7%;
            right: -2%;
        }
        &:nth-of-type(2){
            bottom: 0rem;
            left: 29%;
        }
        &:nth-of-type(3){
            bottom: 47%;
            left: -0.2%;
        }
        &:nth-of-type(4){
            bottom: 79%;
            right: 8.2%;
        }
        &:nth-of-type(5){
            bottom: 95%;
            left: 9%;
        }
    }
    
    .plane{
        background-color: white;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        box-shadow: inset 4px 8px 16px 16px rgba(29, 29, 29, 0.103);
    }
    
    .p-1{
        transform: translateY(50px);
        opacity: 0;
        bottom: 0rem;
        right: 55%;

        &::before{
            content: '';
            border-left: 3px solid transparent;
            border-right: 3px solid transparent;
            border-bottom: 6px solid rgb(255, 255, 255);
            width: 0px;
            height: 0px;
            position: absolute;
            top: -0.32rem;
            left: 50%;
            transform: translateX(-50%);
        }
    }
    .p-2{
        transform: translateY(-50px) rotate(180deg);
        opacity: 0;
        bottom: 100%;
        right: 55%;

        svg{
            transform: rotate(90deg);
        }

        &::before{
            content: '';
            border-left: 3px solid transparent;
            border-right: 3px solid transparent;
            border-bottom: 6px solid rgb(255, 255, 255);
            width: 0px;
            height: 0px;
            position: absolute;
            top: -0.32rem;
            left: 50%;
            transform: translateX(-50%);
        }
    }
    .msgkm{
        padding: 0.5rem 1rem;
        background-color: var(--active-color);
        color: white;
        font-weight: bold;
        font-size: 0.8rem;
        border-radius: 3px;
        text-align: center;
        display: flex;
        bottom: 105%;
        left: 10%;
        transform: translateY(-50px);
        opacity: 0;

        &::before{
            content: '';
            position: absolute;
            border-right: 13px solid transparent;
            border-top: 12px solid var(--active-color);
            bottom: -10px;
            left: 0;
        }
    }
    .road-path {
        fill: none;
        stroke: #fff;
        stroke-width: 2px;
        fill-rule: evenodd;
        stroke-dashoffset: 1425.38;
        stroke-dasharray: 1425.38;
    }
    
    .sec-3-part-2-txt-container{
        align-items: flex-start;
        position: relative;
        opacity: 0;
        h1{
            font-size: 3rem;
            color: rgb(163 ,163 ,163);

            span{
                &:nth-of-type(1){
                    color: white;
                }
                &:nth-of-type(2){
                    font-size: 4rem;
                }
            }
        }
        p{
            font-size: 0.8rem;
            color: rgb(163 ,163 ,163);
            margin: 2rem 0;
            line-height: 18px;
            letter-spacing: 1px;
        }
        button{
            background-color: var(--active-color);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0.7rem 2rem;
            border: none;
            color: white;
            border-radius: 3px;
            font-weight:bold;
            letter-spacing: 2px;
        }
    }
    @media screen and (max-width : 628px){
        flex-direction : column;

        & > div{
            width : 100%;
            height: 40rem;
        }
        .sec-3-part-1-txt-container , .sec-3-part-2-txt-container{
            width : 86%;
        }
        .sec-3-part-1-txt-container{
            .svg-points-container {
                width : 90%;
                height : 90%;

                svg{
                    width : 100%;
                    height : 100%;
                }
            }
        }
        .sec-3-part-2-txt-container{
            padding-top : 2rem;

            h1{
                font-size : 2rem;

                span{
                    &:nth-of-type(2){
                        font-size: 3rem;
                    }
                }
            }
        }
    }
`
const Sec4Container = styled.div`
    margin: 3rem auto;
    width: 100%;
    padding-left: 12rem;
    opacity : 0;
    position : relative;
    .media-container{
        display: flex;
        align-items: flex-start;
        gap: 3rem;
        overflow: hidden;
        scroll-behavior: smooth;
        scroll-snap-type: x mandatory;
        
    }
    .media{
        flex-shrink: 0;
        width: 60rem;
        scroll-snap-align: end;

        h1{
            font-size: 1.5rem;
            color: rgb(180, 180, 180);
            transition: all 500ms ease-in-out;
        }
    }
    .media-part{
        height: 35rem;
        margin: 2rem 0;

        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    @media screen and (max-width : 1024px){
        padding-left: 3rem;
        .media{
            width:100%;
            h1{
                padding-left : 1rem;
            }
            .media-part{
                padding: 0 1rem;
            }
        }
        .controllers-container{
            padding-left: 1rem;
        }
        .media-container{
            overflow : scroll;
            gap : 0;
        }
        .media-part{
            min-height : 14rem;
        }
    }
    @media screen and (max-width : 1024px){
        padding-left : 0;
    }
`