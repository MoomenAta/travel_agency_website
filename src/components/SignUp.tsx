import React, { ChangeEvent, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../hooks';
import { signUpUser } from '../store/loginSlice';
//import { login } from '../store/loginSlice';
import styles from '../styles/signup.module.css'
export default function SignUp() {
    let navigate = useNavigate();
    let dispatch = useAppDispatch();
    let fnRef = useRef<string>('');
    let lnRef = useRef<string>('');
    let emailRef = useRef<string>('');
    let passRef = useRef<string>('');
    function checkSet(e:ChangeEvent<HTMLInputElement> , refName : string){
        if(e.target.value.trim()){
            if(e.target.parentElement?.querySelector('p')){
                e.target.parentElement.removeChild(e.target.parentElement?.querySelector('p')!)
            }
            switch (refName){
            case 'fnRef' :
                fnRef.current = e.target.value.trim();
            break;
            case 'lnRef' :
                lnRef.current = e.target.value.trim();
            break;
            case 'emailRef' :
                emailRef.current = e.target.value.trim();
            break;
            case 'passRef' :
                passRef.current = e.target.value.trim();
            break;
            }
        }else{
            if(!(e.target.parentElement?.querySelector('p'))){
                let ele = document.createElement('p');
                ele.setAttribute('class' , 'invalid')
                let msg = document.createTextNode('Invalid Input');
                ele.appendChild(msg);
                e.target.parentElement!.appendChild(ele);
            }
        }
        

    }

    function signUp(){
        let confirmEle = document.querySelector('[data-confirm]') as HTMLInputElement;
        if(confirmEle.value.trim() !== passRef.current){
            if(!(confirmEle.parentElement?.querySelector('p'))){
                let ele = document.createElement('p');
                ele.setAttribute('class' , 'invalid')
                let msg = document.createTextNode('Invalid Input');
                ele.appendChild(msg);
                confirmEle.parentElement!.appendChild(ele);
            }
            return;
        }
        
        let newUser = {
            firstName : fnRef.current,
            lastName : lnRef.current,
            email : emailRef.current,
            password : passRef.current,
            isAdmin : 0,
        }
        dispatch(signUpUser(newUser)).then((data)=>{
            if(!data.payload.email){
                alert('Email is already existed')
            }else{
                navigate('/profile');
            }
        })
    }
    return (
        <main className={styles.signUpMain}>
            <img className={styles.bluredImg} src='/imgs/mountain.jpg' alt='bluredImage' />
            <section className={styles.signUpContent}>
                <Link className={styles.backHomepage} to='/'>
                    Go to Homepage
                </Link>
                <div className={styles.formContainer}>
                    <div className={styles.formContainerAbsolute}>
                    <img className={styles.bluredImg} src='/imgs/mountain.jpg' alt='bluredImage' />
                        <h1>Let's Discover the World</h1>
                        <div className={styles.firstName}>
                        <input type={'text'} placeholder={'First Name'} onChange={(e:ChangeEvent<HTMLInputElement>)=> checkSet(e,'fnRef')} />
                        <label className={styles.floatLabel}>First Name</label>
                        </div>
                        <div className={styles.lastName}>
                            <input type={'text'} placeholder={'Last Name'} onChange={(e:ChangeEvent<HTMLInputElement>)=> checkSet(e,'lnRef')}/>
                            <label className={styles.floatLabel}>Last Name</label>
                        </div>
                        <div className={styles.email}>
                            <input type={'email'} placeholder={'Email'} onChange={(e:ChangeEvent<HTMLInputElement>)=> checkSet(e,'emailRef')} />
                            <label className={styles.floatLabel}>Email</label>
                        </div>
                        
                        <div className={styles.password}>
                            <input type={'password'} placeholder={'Password'} onChange={(e:ChangeEvent<HTMLInputElement>)=> checkSet(e,'passRef')} />
                            <label className={styles.floatLabel}>Password</label>
                        </div>
                        <div className={styles.password}>
                            <input type={'password'} data-confirm placeholder={'Confirm Password'} />
                            <label className={styles.floatLabel}>Confirm Password</label>
                        </div>
                        
                        <div className={styles.button}>
                            <div className={styles.check}>
                                <input type={'checkbox'} />
                                <span>I agree to terms & conditions</span>
                            </div>
                            <button onClick={signUp} type={'button'}>Sign Up</button>
                            <div className={styles.otherLoginOptions}>
                                <span>OR</span>
                                <div className={styles.buttonsOptions}>
                                    <button type='button'>
                                        <img className={styles.googleLogin} src='/icons/google.png' alt='google' />
                                    </button>
                                    <button type='button'>
                                        <img className={styles.facebookLogin} src='/icons/facebook.png' alt='fb' />
                                    </button>
                                    <button type='button'>
                                        
                                        <img className={styles.linkedinLogin} src='/icons/linkedin.png' alt='in' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.contentContainer}>
                    
                        <h1>Have An Account ?</h1>
                        <p>Join us to discover new places across the world with best offers , Don't hesitate Join us NOW</p>
                        <Link to={'/signin'}>
                            <button type={'button'}>Sign In</button>
                        </Link>
                    
                </div>
            </section>
        </main>
    )
}
