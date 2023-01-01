import Header from './components/Header';
import styled from 'styled-components'
import Home from './components/Home';
import Footer from './components/Footer';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Aboutus from './components/Aboutus';
import Search, { DefaultScreen } from './components/Search';
import TravelRoutes from './components/TravelRoutes';
import Notfound from './components/Notfound';
import SpecificPage from './components/SpecificPage';
import SearchQueryPage from './components/SearchQueryPage';
import ProfilePage from './components/ProfilePage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { Provider} from 'react-redux';
import { RootState, store } from './store/store'
import SingleRoute from './components/SingleRoute';
import Payment from './components/Payment';
import { useAppDispatch , useAppSelector } from './hooks';
import { getUserData } from './store/loginSlice';
import { useEffect, useState } from 'react';
import UserReservation from './components/UsersReservation';
import { getUserReservation } from './store/userReservationSlice';

const Protected = ({isValid , children} : { isValid : boolean , children : any}) => {
  if (!isValid) {
  return <Navigate to="/signin" replace />;
  }
  return(
    <Container>
        <Header />
            {children}
        <Footer />
      </Container>
  );
};
const ProtectedAdminRoute = ({ children} : { children : any})=>{
  let [isAdmin , setIsAdmin] = useState<boolean>(false);
  let [loading , setLoading] = useState<boolean>(true);
  let dispatch = useAppDispatch();
    useEffect(()=>{
      if(sessionStorage.getItem('authData') && !isAdmin){
        if(JSON.parse(`${sessionStorage.getItem('authData')}`).user.email && JSON.parse(`${sessionStorage.getItem('authData')}`).user.password){
          let userInfo = {
            email : JSON.parse(`${sessionStorage.getItem('authData')}`).user.email,
            password : JSON.parse(`${sessionStorage.getItem('authData')}`).user.password
          }
          dispatch(getUserData(userInfo)).then((data)=>{
            setLoading(false);
            if(data.payload.isAdmin){
              dispatch(getUserReservation(data.payload.userId))
              setIsAdmin(true)}
          });
        }
      }else
      setLoading(false);
    },[dispatch,isAdmin,loading])
  return (<>{loading ? 'Loading...' : <Protected isValid={isAdmin}>{children}</Protected>}</>);
}
const ProtectedUserRoute = ({ children} : { children : any})=>{
    let [isLogged , setIsLogged] = useState<boolean>(false)
    let [loading , setLoading]   = useState<boolean>(true);

    let dispatch = useAppDispatch();
    useEffect(()=>{
      if(sessionStorage.getItem('authData') && !isLogged){
        if(JSON.parse(`${sessionStorage.getItem('authData')}`).user.email && JSON.parse(`${sessionStorage.getItem('authData')}`).user.password){
          let userInfo = {
            email : JSON.parse(`${sessionStorage.getItem('authData')}`).user.email,
            password : JSON.parse(`${sessionStorage.getItem('authData')}`).user.password
          }
          dispatch(getUserData(userInfo)).then((data)=>{
            setLoading(false);
            if(data.payload.email){
              dispatch(getUserReservation(data.payload.userId))
              setIsLogged(true)
            }
          });
        }
      }else
      setLoading(false);
    },[dispatch,isLogged,loading])
    return (<>{loading ? 'Loading...' : <Protected isValid={isLogged}>{children}</Protected>}</>);
}
const WithNav = ()=> { 
  let isLogged : boolean = useAppSelector((state : RootState)=> state.login.loggedIn);
  let dispatch = useAppDispatch();
  useEffect(()=>{
    if(sessionStorage.getItem('authData') && !isLogged){
      if(JSON.parse(`${sessionStorage.getItem('authData')}`).user.email && JSON.parse(`${sessionStorage.getItem('authData')}`).user.password){
        let userInfo = {
          email : JSON.parse(`${sessionStorage.getItem('authData')}`).user.email,
          password : JSON.parse(`${sessionStorage.getItem('authData')}`).user.password
        }
        dispatch(getUserData(userInfo)).then((data)=>dispatch(getUserReservation(data.payload.userId)))
      }
    }
  })
  return (
      <Container>
        <Header />
          <main>
            <Outlet />
          </main>
        <Footer />
      </Container>
  )}
const WithOutNav = ()=> { 
  return (
    <Outlet />
  )}

function App() {
  return (
    <Provider store = {store}>
      <Router>
        <Routes>
          <Route path="/users-reservation" element={ <ProtectedAdminRoute><UserReservation /></ProtectedAdminRoute> } />
          <Route path="/profile" element={ <ProtectedUserRoute><ProfilePage /></ProtectedUserRoute> } />
          <Route element={<WithNav />}>
            <Route path='/' element={ <Home /> } />
            <Route path='/about_us' element={ <Aboutus /> } />
            {/* search  */}
            <Route path='/search'  element={ <Search /> } >
              {<Route path=''  element={ <DefaultScreen /> } />}
              <Route path='query'  element={ <SingleRoute /> } />
            </Route>
            <Route path="/trip/:id" element={ <SpecificPage />} />
            
            {/* when in route page and search locations routes */}
            <Route path='/routes' element={ <TravelRoutes /> } />
            {/* go to what inputed in search input */}
            <Route path='/routes/search' element={ <SearchQueryPage />} />
            {/* When click on see all or when go to specific route */}
            <Route path='/routes/:routeName' element={ <SearchQueryPage />} />

            <Route path="*" element={ <Notfound />} />
            <Route path="/payment" element={ <Payment />} />
          </Route>
          <Route element={<WithOutNav />}>
            <Route path='/signin' element={ <SignIn /> } />
            <Route path='/signup' element={ <SignUp /> } />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

const Container = styled.div`
  width: 100%;
  overflow: hidden;
`

export default App;
