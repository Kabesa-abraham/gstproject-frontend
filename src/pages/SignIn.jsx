import React, { useState } from 'react'
import "./CSS/signInUp.css"
import img15 from '../components/Assets/img15.png'
import img13 from '../components/Assets/img13.png'
import { HiEye, HiEyeOff, HiOutlineMailOpen, HiX } from 'react-icons/hi'
import { FaKey } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {motion} from 'framer-motion'
import { signInFaillure,signInStart,signInSuccess } from '../Redux/user/userSlice.js'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { MdAddAlert } from 'react-icons/md'

const SignIn = () => {
    const [showPassword,setShowPassword] = useState(false)
    const handleShowPassword = () =>{
        setShowPassword(prev => prev ? false : true);
    }

    const [userData,setUserData] = useState({
        email:"",
        password:""
    });
    const handleChangeData = (e) =>{
        setUserData({...userData, [e.target.name]:e.target.value })
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading,error} = useSelector((state) => state.user);

    const handleSignin = async(e) =>{
        e.preventDefault();
        try {
            dispatch(signInStart());
            const res = await fetch('/backend/auth/signin', {
                method:'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(userData)
            })
            const data = await res.json();
            if(!res.ok){
                dispatch(signInFaillure(data.message))
            }
            if(res.ok){
                dispatch(signInSuccess(data))
                navigate('/')
            }
        } catch (error) {
            dispatch(signInFaillure(error))
        }
    }

    console.log(userData)

  return (
    <section className='w-full min-h-screen flex justify-center items-center signInContainer'>
        <div className='max-w-5xl bg-white p-6 md:p-10 flex items-center gap-5 lg:gap-10 ' >
            <motion.div className='hidden md:flex' 
                        initial={{opacity:0, scale:0.5}}
                        whileInView={{opacity:1,scale:1}}
                        viewport={{amount:0.5}}
                        transition={{duration:.8,delay:.6}}
            >
                <img src={img15} alt="" className='min-w-[20em] w-[23em]' />
            </motion.div>

            <div className='flex-1 flex flex-col gap-5 items-center' >
                <div className='flex flex-col items-center ' >
                    <img src={img13} alt="" className='w-40 sm:w-44' />
                    <h1 className='text-lg md:text-xl text-zinc-400' >Connectez Vous maintenant</h1>
                </div>

                <form action="" className='flex flex-col gap-9' onSubmit={handleSignin} >
                    <div className='flex flex-col gap-7 containerFields' >
                        <div>
                            <HiOutlineMailOpen className='signInIcon1' />
                            <input type="email" name="email" placeholder='Email...'
                                   value={userData.email} onChange={handleChangeData}
                            />
                            { userData.email&& <HiX className='signInIcon2'/> }
                        </div>
                        <div>
                            <FaKey className='signInIcon1' />
                            <input type={showPassword? 'text' : 'password'} name="password" placeholder='Mot de passe...'
                                   value={userData.password} onChange={handleChangeData}
                            />
                            {
                                showPassword? <HiEye className='signInIcon2' onClick={handleShowPassword}/> 
                                : <HiEyeOff className='signInIcon2' onClick={handleShowPassword}/>
                            }
                        </div>
                    </div>

                    <button type='submit' className='w-full md:w-[65%] mx-auto bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium px-10 py-2 rounded-full
                             text-xs md:text-sm hover:ring-4 ring-blue-100 duration-150 ' >
                        { loading===true? 'En attente' : 'Connection' }
                    </button>

                    { error&& (
                        <p className='alert alert-error text-white flex items-center gap-3 text-sm rounded-full' >
                             <MdAddAlert className='text-lg' /> {error}</p>
                    )}

                    <p className='text-xs md:text-sm' >
                        Vous n'avez pas de Compte? <Link to={'/signUp'} ><span className='text-orange-400 hover:underline duration-100' >Créer un Compte</span></Link>
                    </p>

                </form>
            </div>
        </div>
    </section>
  )
}

export default SignIn
