import React, { SetStateAction  , useEffect } from 'react'

import ReactDOM from 'react-dom'


type notificationProps = {
    success : boolean ,msg : string , setON : React.Dispatch<SetStateAction<boolean>> , openNotification : boolean
}
export function Notification({success , msg  , setON , openNotification} : notificationProps){
let mainStyle : React.CSSProperties = {
    maxWidth:'40rem',
    minWidth:'14rem',
    borderRadius: '0.5rem',
    position : 'fixed',
    zIndex : '999',
    top : '50%',
    left : '50%',
    transform : 'translate(-50% , -50%)',
    backgroundColor : 'white',
    padding : '2rem',
    display : 'flex',
    alignItems : 'center',
    justifyContent : 'center',
    boxShadow : '#36363647 0px 4px 24px'
}
let subStyle : React.CSSProperties = {
    fontSize : '1.7rem',
    height : '100%',
    textAlign : 'center'
}
let colorSuccess : React.CSSProperties = {
    color : '#00e100',
}
let colorWrong : React.CSSProperties = {
    color : 'red',
}

useEffect(()=>{
    setTimeout(() => {
    setON(false);
    }, 2000);
},[setON])
return ReactDOM.createPortal(
    <div style={mainStyle} >
    <div style={subStyle}>
        <img src={`${success ? '/icons/success.png': '/icons/wrong.png'}`} width='100' style={{margin : '0.5rem'}} alt={`successful`} />
        <p style={success ? colorSuccess: colorWrong}>{msg}</p>
    </div>
    </div>
,document.body)
}