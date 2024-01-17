import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../appWrite/service'
import {logout} from '../store/authSlice'
import { useNavigate } from 'react-router-dom'
import Buttonx from './Buttonx'

function LogoutBtn() {
  const navigate=useNavigate();
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
            navigate("/")
        })
    }
  return (
    <Buttonx
    className='bg-teal-500'
    onClick={logoutHandler}
    >Logout</Buttonx>
  )
}

export default LogoutBtn
