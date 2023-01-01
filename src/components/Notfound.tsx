import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/notfoundstyles.css'
export default function Notfound() {
    return (
        <div className='notfound-container'>
            <img src='/imgs/notfound.jpg' alt='notfound-img' />
            <span className='overlay'></span>
            <div className='notfound-content'>
                <h1><span className='diff-font'>oops</span><span>ERROR</span></h1>
                <h2>404</h2>
                <Link to={'/'}>
                    <button type='button'>
                        HOME PAGE
                    </button>
                </Link>
            </div>
        </div>
    )
}
