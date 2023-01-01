import React , {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch , useAppSelector } from '../hooks';
import { getUserData } from '../store/loginSlice';
import { RootState } from '../store/store';
import { getUserReservation } from '../store/userReservationSlice';
import styles from '../styles/signIn.module.css'
export default function SignIn() {
    
    let [invalid , setInvalid] = useState<boolean>(false);
    let userLoged = useAppSelector((state : RootState)=> state.login);
    let dispatch = useAppDispatch();
    let navigate = useNavigate();
    useEffect(()=>{
        if(userLoged.loggedIn){
            navigate('/profile');
        }
    },[userLoged,dispatch,navigate])
    function loginUser(){
        let loginInfo = {
            email : (document.querySelector('[data-email]') as HTMLInputElement).value.trim(),
            password : (document.querySelector('[data-pass]') as HTMLInputElement).value.trim(),
        }
        dispatch(getUserData(loginInfo)).then((data)=>{
            if(data.payload.userId){
                dispatch(getUserReservation(data.payload.userId));
                navigate('/profile');
            }else{
                setInvalid(true)
            }
        });
    }
    return (
        <main className={styles.signInMain}>
            <img className={styles.bluredImg} src='/imgs/mountain.jpg' alt='bluredImage' />
            <section className={styles.signInContent}>
                <Link className={styles.backHomepage} to='/'>
                    Go to Homepage
                </Link>
                <div className={styles.formContainer}>
                    
                    <div className={styles.formContainerAbsolute}>
                    <img className={styles.bluredImg} src='/imgs/mountain.jpg' alt='bluredImage' />
                        <h1>Let's Discover the World</h1>
                        <form className={styles.form}>
                            <div className={styles.email}>
                                <input type={'email'} data-email placeholder={'Email'} />
                                <label className={styles.floatLabel}>Email</label>
                            </div>
                            <div className={styles.passAndquest}>
                                <div className={styles.password}>
                                    <input type={'password'} data-pass placeholder={'Password'} />
                                    <label className={styles.floatLabel}>Password</label>
                                </div>
                                <p>Forget Password ?</p>
                            </div>
                        </form>
                        <div className={styles.button}>
                            {invalid && <p className={styles.invalidMessage}>invalid email or password</p>}
                            <button onClick={loginUser} type={'button'}>Sign In</button>
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
                    
                        <h1>Don't Have An Account ?</h1>
                        <p>Join us to discover new places across the world with best offers , Don't hesitate Join us NOW</p>
                        <Link to={'/signup'}>
                            <button type={'button'}>JOIN US</button>
                        </Link>
                    
                </div>
            </section>
        </main>
    )
}
