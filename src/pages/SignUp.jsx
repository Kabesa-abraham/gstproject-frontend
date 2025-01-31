import React, { useEffect, useRef, useState } from 'react'
import './CSS/signInUp.css'
import img12 from '../components/Assets/img12.png'
import img13 from '../components/Assets/img13.png'
import { HiEye, HiEyeOff, HiOutlineMailOpen, HiUser, HiX } from 'react-icons/hi'
import { FaKey } from 'react-icons/fa'
import {MdAddAlert} from 'react-icons/md'
import { Link } from 'react-router-dom'
import {signInFaillure,signInStart,signInSuccess} from '../Redux/user/userSlice.js'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

const SignUp = () => {

    const [showPassword,setShowPassword] = useState(false)
    const handleShowPassword = () =>{ //fonction de show et hide le password
        setShowPassword(prev => prev ? false : true);
    }

    const [urluploadImg, setUrlUploadImg] = useState(null)
    const [urlImg, setUrlImg] = useState(null) 
    const imgRef = useRef();
    const handleChangeImg = (e) =>{
        const file = e.target.files[0];
        if(file){
            setUrlUploadImg(file)
            setUrlImg(URL.createObjectURL(file))
        }
    }
    useEffect(() =>{ //va éxecuter la fonction d'upload de l'image
        if(urluploadImg){
            uploadImage();
        }
    },[urlImg])
    const uploadImage = async() =>{ //pour upload l'image
        const formdataImg = new FormData();
        formdataImg.append('image', urluploadImg);
        try {
            const res = await fetch('/backend/upload/upload_image', {
                method:"POST",
                headers:{
                    Accept:'application/json'
                },
                body:formdataImg
            })
            const data = await res.json();
            if(!res.ok){
                console.log(data.message)
            }
            if(res.ok){
                setUserData({...userData, image:data.image_url})
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading,error} = useSelector((state) => state.user);

    const [userData,setUserData] = useState({
        name:"",
        email:"",
        password:"",
        image:""
    })
    const handleChangedata = (e) =>{
        setUserData({...userData , [e.target.name] : e.target.value })
    }

    const handleSignUp = async(e) =>{ //pour créer un compte
        e.preventDefault();
        try {
            dispatch(signInStart());
            const res = await fetch('/backend/auth/signup', {
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(userData)
            })
            const data = await res.json();
            if(!res.ok){
                dispatch(signInFaillure(data.message));
            }
            if(res.ok){
                dispatch(signInSuccess(data))
                navigate('/')
            } 
        } catch (error) {
            dispatch(signInFaillure(error))
        }
    }

  console.log(userData);
  return (
    <section className='w-full min-h-screen flex justify-center items-center signInContainer'>
        <div className='max-w-5xl bg-white p-6 md:p-10 flex items-center gap-5 lg:gap-10 ' >
            <div className='hidden md:flex' >
                <img src={img12} alt="" className='min-w-[20em] w-[25em]' />
            </div>

            <div className='flex-1 flex flex-col gap-5 items-center' >
                <h1 className='text-lg md:text-xl font-bold text-zinc-400 ' >Créer un Compte maintenant</h1>

                <form action="" className='flex flex-col gap-9' onSubmit={handleSignUp} >

                    <label className='mx-auto' onClick={() => imgRef.current.click()} >
                        <img src={urlImg? urlImg : img13} alt="" className='w-32 h-32 object-cover bg-[#ccc9c94f] p-1 rounded-full' />
                    </label>
                    <input type="file" accept='image/*' ref={imgRef} onChange={handleChangeImg} hidden />

                    <div className='flex flex-col gap-7 containerFields' >
                        <div>
                            <HiUser className='signInIcon1'/>
                            <input type="text" name="name" placeholder='Nom...' 
                                   value={userData.name} onChange={handleChangedata}
                            />
                            { userData.name&& <HiX className='signInIcon2' onClick={()=>  setUserData({...userData, name:""})} /> }
                        </div>

                        <div>
                            <HiOutlineMailOpen className='signInIcon1' />
                            <input type="email" name="email"  placeholder='Email...'
                                   value={userData.email} onChange={handleChangedata}
                            />
                            { userData.email&& <HiX className='signInIcon2' onClick={() => setUserData({...userData, email:""})} /> }
                        </div>

                        <div>
                            <FaKey className='signInIcon1' />
                            <input type={showPassword? 'text' : 'password'} name="password" placeholder='Mot de passe...' 
                                   value={userData.password} onChange={handleChangedata}
                            />
                            {
                                showPassword? <HiEye className='signInIcon2' onClick={handleShowPassword}/> 
                                : <HiEyeOff className='signInIcon2' onClick={handleShowPassword}/>
                            }
                        </div>
                    </div>

                    <button type='submit' className='w-full md:w-[65%] mx-auto bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium px-10 py-2 rounded-full
                             text-xs md:text-sm hover:ring-4 ring-blue-100 duration-150 ' >
                        {
                         loading===true? 'en attente...' : "Créer Compte"
                        }        
                    </button>
                            
                    { error&& (
                        <p className='alert alert-error text-white flex items-center gap-3 text-sm rounded-full' >
                             <MdAddAlert className='text-lg' /> {error}</p>
                    )}

                    <p className='text-xs md:text-sm' >
                        Vous avez déjà un Compte? <Link to={'/signIn'} ><span className='text-orange-400 hover:underline duration-100' >Connectez vous</span></Link>
                    </p>
                </form>
            </div>
        </div>
    </section>
  )
}

export default SignUp
