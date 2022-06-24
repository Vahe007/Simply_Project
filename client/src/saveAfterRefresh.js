import React, {useEffect} from 'react'
import { useSelector } from 'react-redux';
import {useAuth} from "./components/auth.js";

const saveAfterRefresh = () => {
  const {email, password} = useSelector((state) => {
    state.login.userInfo;
  })

  useEffect(() => {
    
  })
  return (
    <div>
        
    </div>
  )
}


export default saveAfterRefresh;
