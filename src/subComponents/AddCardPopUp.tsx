import React , { useRef, useState }from 'react'
import { cardInfo } from '../components/ProfilePage'
import styles from '../styles/addCardPopUp.module.css'

const alertStyle = {
        color : 'red',
        position : 'absolute',
        left : '50%',
        transform : 'translateX(-50%)',
        top: '5rem'
} as React.CSSProperties ;
export default function AddCardPopUp({setOpenPopUp , cards , setCards} : {setOpenPopUp : ()=>void , cards : [] | cardInfo[] , setCards : React.Dispatch<React.SetStateAction<[] | cardInfo[]>> }) {
    let [ alert , setAlert ] = useState<Boolean>(false)
    let mainContainer = useRef<HTMLDivElement>(null);
    function updateCards(){
        let card = {
        name : (document.querySelector('[data-cardname]') as HTMLInputElement).value,
        cardNumber : +(document.querySelector('[data-cardnumber]') as HTMLInputElement).value,
        month : +(document.querySelector('[data-cardmonth]') as HTMLInputElement).value,
        year : +(document.querySelector('[data-cardyear]') as HTMLInputElement).value
        }
        if(card.name && card.cardNumber && card.month && card.year){
            setCards([...cards , card]);
            setOpenPopUp()}
        else setAlert(true);
    }
    const closeModal = (e:React.MouseEvent)=>{
        if(mainContainer.current && !mainContainer.current.contains(e.target as HTMLElement))
        setOpenPopUp()
    }
    return (
    <div onClick={(e:React.MouseEvent)=>closeModal(e)} className={styles.overlay}>
        <div ref={mainContainer} className={styles.mainContainer}>
            {alert && <span style={alertStyle}>Please fill all fields</span>}
            <h1>Add Card Details</h1>
            <span className={styles.close} onClick={setOpenPopUp}>Close</span>
            <form>
                <div className={styles.name}>
                    <input data-cardname type={'text'} placeholder='enter name on card' />
                    <label>Name on card</label>
                </div>
                <div className={styles.cardNumber}>
                    <input data-cardnumber type={'number'} placeholder='enter card number' />
                    <label>Card Number</label>
                </div>
                <div className={styles.expiration}>
                    <div className={styles.month}>
                        <input data-cardmonth type={'number'} placeholder='enter Month' />
                        <label>Expiry Month</label>
                    </div>
                    <div className={styles.year}>
                        <input data-cardyear type={'number'} placeholder='enter Year' />
                        <label>Expiry Year</label>
                    </div>
                </div>
                <button onClick={updateCards} data-addcard type='button'>Add Card</button>
            </form>
        </div>
    </div>
    )
}
