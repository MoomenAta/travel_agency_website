import styled from 'styled-components'
import { gsap } from "gsap";
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux'
import type { RootState } from '../store/store'
import AddProduct from '../subComponents/AddProduct';
import { logout } from '../store/loginSlice';
import SpecificUserReservation from '../subComponents/SpecificUserReservation';
export default function Header() {
    // get state to check if user is loggedin
    const loggedin = useSelector((state : RootState)=> state.login)
    // burgerMenu element  
    let menuContainerRef = useRef<HTMLElement>(null);
    //html element that holds all header nav set to absolute
    let fixedMenuContainerRef = useRef<HTMLDivElement>(null);
    //state when user clicks outside nav it closes
    let [isOpen , setIsOpen ] = useState<boolean>(false);
    //create an array of refs to hold li elements
    let navUlLiRefs = useRef<HTMLLIElement[]>([])
    //open add trip
    let[openAddProduct , setOpenAddProduct] = useState<boolean>(false);
    let[openReservation , setOpenReservation] = useState<boolean>(false);

    let dispatch = useDispatch();


    /* gsap animation for li elements*/
    useEffect(()=>{
        gsap.fromTo(navUlLiRefs.current, { top : '-2rem' , opacity: 0 } , {top:'0' , opacity: 1 , stagger:0.3 ,  duration: 0.5 , delay : 1});
    },[])

    // function to detect clicked element 
    let detectClick = (e:Event)=>{
        let target = e.target as HTMLElement;
        if(!(fixedMenuContainerRef.current?.contains(target))){
            setIsOpen(false);
        }
    }
    //if nav is open when user click outside close it 
    if(isOpen){
        document.body.addEventListener('click',detectClick)
    }
    /* show side menu on min screen || on desktop when hover only
    used useeffect here as when page mount check screen size */
    useEffect(()=>{
        if(menuContainerRef.current)
        {
            menuContainerRef.current.onclick = ()=>{
                if(window.innerWidth <= 628){
                setIsOpen(!isOpen);
                }
            }
        }
        if(fixedMenuContainerRef.current){
            if(isOpen)
            fixedMenuContainerRef.current.style.right = '0%';
            else
            fixedMenuContainerRef.current.style.right = '-100%';
        }
    },[isOpen])

   /*  function handleopen(e:Event){
        setOpenAddProduct(true)
        e.stopPropagation()
    }
    useEffect(()=>{
        document.querySelector('[data-add]')?.addEventListener('click',handleopen)
    }) */
    function logOut(){
        dispatch(logout());
        sessionStorage.removeItem('data');
    }

    return (
            <Nav id="navContainer">
            <div className="navContainer">
                
                <div className="logoimg">
                    <Link to={'/'}>
                    <span>
                        <svg id="logo" width="3rem" height="2rem" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140.17 93.21"><path className="cls-1" d="M-38.58,332.75" transform="translate(171.25 -332.75)"/><path className="cls-2" d="M-38.58,332.75v54.71a31,31,0,0,1-31,31h-1.21a31,31,0,0,1-31-31V332.75" transform="translate(171.25 -332.75)"/><path className="cls-2" d="M-101.77,332.75v54.71a31,31,0,0,1-31,31h0a31,31,0,0,1-31-31V332.75" transform="translate(171.25 -332.75)"/></svg>
                    </span>
                    </Link>
                </div>
                
                <div ref={fixedMenuContainerRef} className={'ulContainerAndMenu'}>
                    <ul className={'mainNavUl'} >
                        <NavLink to='/' onClick={()=>setIsOpen(false)} className={(navData) => navData.isActive ? "active-route" : "" }>
                        <li ref={ (el : HTMLLIElement) => navUlLiRefs.current.push(el) }>
                                <svg className='home-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" height="2rem" width="2rem"><path d="M8 29.7V22Q8 21.6 8.15 21.25Q8.3 20.9 8.6 20.6L22.6 6.6Q22.9 6.3 23.25 6.15Q23.6 6 24 6Q24.4 6 24.75 6.15Q25.1 6.3 25.4 6.6L28.25 9.4ZM34 40V23.65L26.15 15.8L30.4 11.55L39.4 20.6Q39.65 20.9 39.825 21.25Q40 21.6 40 22V38Q40 38.85 39.425 39.425Q38.85 40 38 40ZM10 40Q9.15 40 8.575 39.425Q8 38.85 8 38V33.9L14 27.9V34H31V40Z"/></svg>
                        </li>
                        </NavLink>
                        <NavLink to='/about_us' onClick={()=>setIsOpen(false)} className={(navData) => navData.isActive ? "active-route" : "" }>
                        <li ref={ (el : HTMLLIElement) => navUlLiRefs.current.push(el) }>
                            About us
                        </li>
                        </NavLink>
                        <NavLink to='/search' onClick={()=>setIsOpen(false)} className={(navData) => navData.isActive ? "active-route" : "" }>
                        <li ref={ (el : HTMLLIElement) => navUlLiRefs.current.push(el) }>
                            Search
                        </li >
                        </NavLink>
                        <NavLink to='/routes' onClick={()=>setIsOpen(false)} className={(navData) => navData.isActive ? "active-route" : "" }>
                        <li ref={ (el : HTMLLIElement) => navUlLiRefs.current.push(el) }>
                            Routes
                        </li>
                        </NavLink>
                    </ul>
                    <div className={'menuAndSubUlContainer'}>
                        <span ref={menuContainerRef} className="menu-icon-container">
                            <svg version="1.1" className="menu-icon" width="1.1rem" height="1.1rem" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                viewBox="0 0 150 150" xmlSpace="preserve">
                            <g id="XMLID_240_">
                                <path id="XMLID_241_" d="M15,30h120c8.284,0,15-6.716,15-15s-6.716-15-15-15H15C6.716,0,0,6.716,0,15S6.716,30,15,30z"/>
                                <path id="XMLID_242_" d="M135,60H15C6.716,60,0,66.716,0,75s6.716,15,15,15h120c8.284,0,15-6.716,15-15S143.284,60,135,60z"/>
                                <path id="XMLID_243_" d="M135,120H15c-8.284,0-15,6.716-15,15s6.716,15,15,15h120c8.284,0,15-6.716,15-15S143.284,120,135,120z"/>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            </svg>
                        </span>
                        <div className='menu-items'>
                            <ul className={'subNavUl'}>
                                { !loggedin.loggedIn ? <><Link to={'/signin'}>
                                    <li>Sign In</li>
                                </Link>
                                <Link to={'/signup'}>
                                    <li>Sign Up</li>
                                </Link>
                                </> : <Link to={'/'}>
                                    <li onClick={logOut}>Log out</li>
                                </Link> }
                                {(loggedin.loggedIn) && <Link to='/profile'>
                                    <li>Profile</li>
                                </Link>}
                                {(loggedin.loggedIn) ? <>
                                <li data-reservation onClick={()=>setOpenReservation(true)}>Your Reservation</li> </> : null}
                                {(loggedin.loggedIn && loggedin.user?.isAdmin) ? <>
                                
                                <li data-add onClick={()=>setOpenAddProduct(true)}>Add Trip</li>
                                
                                <Link to='/users-reservation'>
                                <li>Users Reservation</li>
                                </Link></> : null}
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            { openAddProduct && <AddProduct openAddProduct={openAddProduct} setOpenAddProduct={setOpenAddProduct} />}
            { (openReservation && loggedin.user?.userId) && <SpecificUserReservation openReservation={openReservation} setOpenReservation={setOpenReservation} id={loggedin.user.userId} />}
        </Nav>
    )
}

const Nav = styled.nav`
    position: absolute;
    z-index: 999;
    display: flex;
    justify-content: space-between;
    
    width: 100%;
    margin: 0 auto;
    height: 6rem;

    .navContainer{
        display: flex;
        max-width: 90rem;
        width: 100%;
        padding : 0 1rem;
        margin: 0 auto;
        justify-content: space-between;
    }
    .logoimg{
        width: 5rem;
        height: 5rem;
        background-color: #0f0e13;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .cls-1,.cls-2{
        fill:none;
        stroke:var(--active-color);
        stroke-miterlimit:10;
    }
    .cls-1{
        stroke-width:8.03px;
    }
    .cls-2{
        stroke-width:15.01px;
    }
    .ulContainerAndMenu{
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition : 500ms right ease-in-out;
    }
    .mainNavUl {
        display: flex;
        align-items: center;
        list-style-type: none;
        justify-content: space-between;
        transition : 500ms right ease-in-out;

        li {
            height: -2rem;
            opacity : 0;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            font-weight: bold;
            margin-right: 2rem;
            color: var(--nav-li-color);
            cursor: pointer;
            transition: 250ms color ease-in-out;

            &:hover {
                color: var(--active-color);
                fill: var(--active-color);
            }
            &:hover svg {
                fill: var(--active-color);
                transition: 250ms fill ease-in-out;
            }
        }
        .minScreenSubMenu{
            display : none;
        }
    }
    .menuAndSubUlContainer{
        
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        font-weight: bold;
        color: var(--nav-li-color);
        cursor: pointer;
        transition: 250ms color ease-in-out;
        &:hover svg {
            fill: var(--active-color);
            transition: 250ms fill ease-in-out;
        }
        &:hover .menu-items{
            display : block !important;
        }
    }
    .menu-icon-container{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background-color: white;
        
    }
    .menu-icon{
        fill: var(--black-color);
        
    }
    .home-icon{
        fill: var(--nav-li-color);
    }
    .menu-items{
        display:none;
        position: absolute;
        padding: 0.5rem 0;
        top : 100%;
        right : 0;
        width: 12rem;
        
    }
    .menu-items .subNavUl{
        border-radius: 0.3rem;
        padding: 1rem;
        background-color: #f9f9f9;
        box-shadow: 0 4px 14px #32323229;
        display:flex;
        flex-direction :column !important;
        list-style-type : none;
        justify-content : flex-start;
        transition : 250ms right ease-in-out;
        gap:0.5rem;
        a{
            display : inline-block;
            width:100%;
            height:100%;
        }
        li{
            color:black;
            padding : 0.5rem 0;
            width:100%;
            height:100%;
            &:hover{
                color : var(--active-color);
            }
        }
    }

    @media screen and (max-width: 628px){
        .menu-icon-container{
            position : fixed;
            top:1rem;
            right : 1rem;
            
        }
        .menuAndSubUlContainer 
        {
            -webkit-tap-highlight-color: transparent;
            -moz-tap-highlight-color: transparent;

            width:100%;
            position : unset;
            .menu-items{
                
                display : block;
                top :unset;
                bottom: 2%;
                width: 100%;
                right: 0;
                border-radius : 0;
            }
        }
        .ulContainerAndMenu{
            position: fixed;
            top: 0;
            flex-direction: column;
            height: 100%;
            background-color: #2c2c2c;
            width: 56%;
            justify-content : center;
            right: -100%;
            gap:4rem;
        }
        .mainNavUl{
            height : 32%;
            flex-direction : column;
            align-items : center;
            justify-content : space-between;
        }
        .mainNavUl li{
            margin-right: 0;
        }
        ul .minScreenSubMenu {
            display : flex;
            > ul{
                display : flex;
                flex-direction : column;
                justify-content : center;
                margin-top : 6rem;
                border-top : 1px solid white;
                padding-top : 1rem;
                gap : 1rem;
                a{
                    min-width : 8rem;
                    padding : 0.5rem 2rem;
                    border-radius : 0.25rem;
                    background-color: var(--active-color);
                }
            }
        }
    }
    
`
