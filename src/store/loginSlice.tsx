import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
export interface userInfo {
    userId? : number,
    firstName : string,
    lastName : string,
    email : string,
    password : string,
    isAdmin : number,
}
export interface loginInfo {
    email : string,
    password : string,
}
export interface loginType {
    loggedIn : boolean,
    user : userInfo | null
}
const initialState : loginType= {
    loggedIn : false ,
    user : null,
}

export const getUserData = createAsyncThunk('users/getuser' , async (loginInfo : loginInfo , { rejectWithValue } ) =>
{
    const requestOptions = {
        method: 'Post',
        body: JSON.stringify(loginInfo)
    };
    try{
        let loginReq = await fetch(`${process.env.REACT_APP_API_LINK}/users/login.php` , requestOptions);
        if(!loginReq.ok){
            if(loginReq.status === 404)
            throw Error(`NOT FOUND`)
            else
            throw Error(`Connection Error`)
        }
        let res = await loginReq.json();
        return res;
    }catch(e:any){
        return rejectWithValue(e);
    }
});

export const signUpUser = createAsyncThunk('users/signup', async (newUserInfo : userInfo , {rejectWithValue} ) =>{
    const requestOptions = {
        method : 'POST' , 
        body : JSON.stringify(newUserInfo)
    }
    try{
        let signUpReq = await fetch(`${process.env.REACT_APP_API_LINK}/users/createUser.php` , requestOptions);
        if(!signUpReq.ok){
            throw Error(`Connection Error`)
        }
        let res = await signUpReq.json();
        return res;
    }catch(e){
        return rejectWithValue(e);
    }
})

export const loginSlice = createSlice({
    name : 'login',
    initialState,
    reducers :{
        logout : (state) => {
            sessionStorage.removeItem('authData');
            return {loggedIn : false, authToken : null , user : null}}
    },
    extraReducers : (builder) => {
        builder.addCase(getUserData.pending , (state:loginType)=>{
            return {loggedIn : false , user : null}
        })
        builder.addCase(getUserData.fulfilled , (state:loginType , action)=>{
            sessionStorage.setItem('authData' , JSON.stringify({loggedIn : true , user : action.payload}));
            return { loggedIn : true ,user : action.payload}
        })
        builder.addCase(getUserData.rejected , (state:loginType , action)=>{
            return {loggedIn : false,user : null}
        })
        builder.addCase(signUpUser.pending , (state:loginType)=>{
            return {loggedIn : false , user : null}
        })
        builder.addCase(signUpUser.fulfilled , (state:loginType , action)=>{
            sessionStorage.setItem('authData' , JSON.stringify({loggedIn : true , user : action.payload}));
            return { loggedIn : true ,user : action.payload}
        })
        builder.addCase(signUpUser.rejected , (state:loginType , action)=>{
            return {loggedIn : false,user : null}
        })
    }
})

export const { logout } = loginSlice.actions;
export default loginSlice.reducer
