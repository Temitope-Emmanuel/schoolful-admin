import React from "react"
import './App.css'
import {useHistory, useLocation} from "react-router-dom"
import MainRouter from "./MainRouter"
import {useDispatch, useSelector} from "react-redux";
import {logout,setCurrentUser,hideLoading} from "store/System/actions"
import useToast from "utils/Toast"
import * as userService from "core/services/user.service"
import * as authManager from "utils/auth"
import {idleDetector} from "utils/functions"
import { AppState } from "store"
import localforage from "localforage"

const App = () => {

  
  const dispatch = useDispatch();
  const toast = useToast()
  const location = useLocation()
  const history = useHistory()
  const token = authManager.getToken();
  const isAuthenticated = useSelector((state:AppState) => state.system.isAuthenticated)
  const userDetail = JSON.parse(authManager.getUserDetail() as string)
  
  const CURRENT_LOCATION = "CURRENT_LOCATION"
  const inActive = () => {
        
    localforage.setItem(CURRENT_LOCATION,location.pathname).then(() => {
      dispatch(logout())
      toast({
        messageType:"info",
        subtitle:"Info: You've been logged out due to inactivity, Please Login again to continue",
        title:"Logged User Out due to Inactivity"
      })
    })
  }
  React.useEffect(() => {
    if(isAuthenticated){
      // idleDetector(() => {history.push("/login")},inActive)
    }
  },[isAuthenticated])
  
  React.useEffect(() => {
    if(!token || !userDetail){
      dispatch(hideLoading())
      dispatch(logout())
    }else{
      userService.verifyToken(token).then(payload => {
        if(!payload) dispatch(logout());
        const {auth_token,refreshToken} = payload.data;
        authManager.saveToken(refreshToken)
        const newUserDetail = {
          ...userDetail,
          auth_token
        }
        authManager.saveUserDetail(JSON.stringify(newUserDetail))
        const savedUserDetail = JSON.parse(authManager.getUserDetail() as string)
        dispatch(setCurrentUser(savedUserDetail))
        dispatch(hideLoading())
      }).catch((err) => {
        dispatch(hideLoading())
        toast({
          title:"Please Login Again",
          subtitle:`Error: ${err}`,
          messageType:"info"
        })
        dispatch(logout());
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return(
    <MainRouter/>
  )
}

export default App