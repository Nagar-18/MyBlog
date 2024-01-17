import React, { useState } from 'react'
import { login as authLogin } from '../store/authSlice'
import authService from '../appWrite/service'
import {Link ,useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {useForm} from 'react-hook-form'
import {Buttonx, Input, Logo} from './index'
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                 
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
               
                if(userData)
                {
                    const notify = () => toast.success("Login SuccessFully",{ position: toast.POSITION.TOP_CENTER,});
                    notify();
                   
                    alert("logged")
                }

                navigate("/")
            }
            else {  toast('🦄 Invalid Credentials!', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Bounce,
});}
        } catch (error) {
             
            
          
            setError(error.message)
        }
    }

  return (
    <div
    style={{display:'flex', flexDirection:'column',justifyContent:'space-between', alignItems:'center'}}
    className='flex  w-full justify-center items-center'
    >
        <div className=" w-full mx-auto  max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center items-center">
                    <br/>
                    <br/>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center  text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <div>
        <form style={{display:"flex", justifyContent:'center',alignItems:'center', height:'50vh',  }} onSubmit={handleSubmit(login)} className='mt-8 '>
            <div  className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <ToastContainer/>
                <Buttonx
                type="submit"
                className="w-2/3 bg-slate-600"
                >Sign in</Buttonx>
            </div>
        </form>
        </div>
        </div>
        <ToastContainer/>
    </div>
    
  )
}

export default Login
