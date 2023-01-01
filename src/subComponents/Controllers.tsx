import React from 'react'
import styled from 'styled-components'

type controllersProps = {
    ids : string[]
    next? : ()=>void,
    prev? : ()=>void
}

export default function Controllers({ids , next , prev} : controllersProps) {
    return (
        
        <ControllersContainer className="controllers">
            <span onClick={prev && prev} id={ids[0]} className="prev-icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 50 50" width="1.5rem" fill="black"><path style={{transform: 'translate(5%)'}} d="M28.05 36.7 15.3 23.95 28.05 11.2 30.9 14.05 21 23.95 30.9 33.85Z"/></svg>
            </span>
            <span onClick={next && next} id={ids[1]} className='active-controllers next-icon-container' >
                <svg xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 50 50" width="1.5rem" fill="black"><path style={{transform: 'translate(5%)'}} d="M18.75 36.7 15.9 33.85 25.8 23.95 15.9 14.05 18.75 11.2 31.5 23.95Z"/></svg>
            </span>
        </ControllersContainer>
    )
}

let ControllersContainer = styled.div`
    display: flex;
    justify-content : end;
    gap: 1rem;
    padding-right : 1rem;
    span{
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background-color: white;
        box-shadow: 0 4px 16px rgba(109, 109, 109, 0.301);
        svg path{
            stroke: black;
            stroke-width: 2px;
        }
    }
    .prev-icon-container , .next-icon-container {
        display: flex;
        width: 2rem;
        height: 2rem;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 50%;
        background-color: white;
    }
`
