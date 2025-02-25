import React, { useEffect, useRef, useState } from 'react'
import backgroundImg from '../../Assets/img11.jpg'
import userImg from '../../Assets/img13.png'
import {MdClose, MdEdit, MdError} from 'react-icons/md'
import './dashProfile.css'
import {useSelector, useDispatch} from 'react-redux'
import { updateUserFaillure,updateUserStart,updateUserSuccess,signOutSuccess,deleteFailuer,deleteStart,deleteSuccess } from '../../../Redux/user/userSlice.js'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import {ToastContainer,toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const DashProfile = () => {

  const navigate = useNavigate();

  const [showImageProfile,setShowImageProfile] = useState(false); //pour l'affichage d'un modal qui va montrer l'img du profil
  const handleChangeShowImage = () =>{
    setShowImageProfile(showImageProfile? false : true)
  }
  const [visiblePassword,setVisiblePassword] = useState(false) //pour masquer ou démasquer le password
  const handleShowPassword = () =>{
    setVisiblePassword(visiblePassword? false : true);
  }

  const dispatch = useDispatch();
  const {currentUser,loading,error} = useSelector(state => state.user); //les données du userSlice

  const [userData,setUserData] = useState({}) //va stocker les données d'un user
  const handleChangeUserData = (e) =>{
    setUserData({...userData , [e.target.id]:e.target.value});
  }
  const handleUpdateUser = async(e) =>{  //fonction pour mettre à jour un user
    e.preventDefault();
    if(Object.keys(userData).length === 0){ //donc si il n'ya rien dans formdata
       dispatch(updateUserFaillure("Aucun changement n'a été fait"));
       toast.error(error,{draggable:true,autoClose:3000,position:'top-center'})
      return;
    }
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/backend/auth/updateUser/${currentUser._id}`,{//j'envois l'_id du user que j'ai fait persister grâce à redux-persist
        method:'PUT',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(userData)
      })
      const data = await res.json();
      if(!res.ok){
       dispatch(updateUserFaillure(data.message)) //error
       toast.error(error&&error,{ draggable:true, autoClose:4000, position:'top-center'});
      }
      if(res.ok){
        dispatch(updateUserSuccess(data))
        toast.success('Profile Utilisateur mise à jour avec succée!',{
          draggable:true,
          autoClose:4000,
          position:'top-center'
        })
      }  
    } catch (error) {
      dispatch(updateUserFaillure(error.message));
      toast.error(error&&error,{ draggable:true, autoClose:4000, position:'top-center'});
    }
  }
  //pour le image profile du user
  const profileImgRef = useRef();
  const [uploadProfileImage,setUploadProfileImage] = useState(null)
  const [imageProfileUrl,setImageProfileUrl] = useState(null)
  const handleChangebgImge = (e) =>{
    const file = e.target.files[0];
    if(file){
      setUploadProfileImage(file);
      setImageProfileUrl(URL.createObjectURL(file))
    }
  }
  const uploadImage = async() =>{ //pour upload l'image
    const formdataImg = new FormData();
    formdataImg.append('image', uploadProfileImage);
    try {
        const res = await fetch('/backend/upload/upload_image', {
            method:"POST",
            headers:{ Accept:'application/json'},
            body:formdataImg
        })
        const data = await res.json();
        if(!res.ok){ console.log(data.message)}
        if(res.ok){
          setUserData({...userData, image:data?.image_url});
        }
    } catch (error) {
        console.log(error.message)
    }
  }
  useEffect(() =>{
    if(uploadProfileImage){
      uploadImage()
    } 
  },[imageProfileUrl]);
  //--------------------------------------------------------------
  
  //pour se déconnecter
  const handleSignOut = async() =>{
    try {
       const res = await fetch('/backend/auth/signout',{method : 'POST'});
       const data = await res.json();

       if(!res.ok){
        console.log(data.message)
       }
       if(res.ok){ //donc si le token est clear alors ce fonction est éxecuté
        dispatch(signOutSuccess());
        navigate('/presentation');
       }
    } catch (error) {
      console.log(error.message)
    }
  }
  const desconnecteAlert = () =>{
    Swal.fire({
      icon : "warning",
      position: 'center',
      text:"Êtes-vous sûr de vouloir vous déconnecté ?",
      showCancelButton:true,
      cancelButtonText: 'Annuler',
      confirmButtonText: "Oui, je suis sûr",
    }).then((res) =>{
      if(res.isConfirmed){
        handleSignOut();
      }
    })
  }

  //pour supprimer le user
  const handleDeleteUser = async() =>{
    try {
      dispatch(deleteStart());
      const res = await fetch(`/backend/auth/deleteUser/${currentUser._id}`,{
        method : 'DELETE'
      })
      const data = await res.json();
      if(!res.ok){
        deleteFailuer(data.message)
      }
      if(res.ok){
        dispatch(deleteSuccess())
        navigate('/presentation')
      }
    } catch (error){console.log(error.message)}
  }
  const deleteUserAlert = () =>{
    Swal.fire({
      icon : "question",
      position: 'center',
      text:"Êtes-vous sûr de vouloir supprimer ce compte ?",
      showCancelButton:true,
      cancelButtonText: 'Annuler',
      confirmButtonText: "Oui, je suis sûr",
    }).then((res) =>{
      if(res.isConfirmed){
        handleDeleteUser();
      }
    })
  }


  return (
    <section className='w-full mx-auto flex flex-col gap-5 relative'>
      <div className='w-full cursor-pointer' >
          <img src={backgroundImg} alt="" className='w-full h-48 sm:h-56 md:h-72 lg:h-80 object-cover' />
      </div>

      <form className='max-w-xl w-full mx-auto mt-10 md:mt-24 mb-5' onSubmit={handleUpdateUser} >

        <input type="file" ref={profileImgRef} onChange={handleChangebgImge} hidden />
        <div className='cursor-pointer rounded-full absolute top-28 sm:top-36 md:top-52 left-20 sm:left-28 md:left-40 lg:left-52'>
            <img src={imageProfileUrl ||currentUser?.image || "./avatar.png"} alt="" onClick={handleChangeShowImage}
                  className='w-32 h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 rounded-full object-cover border-8 border-[lightgray]'/>
        </div>

        <div className='text-black text-xl md:text-2xl bg-blue-200 p-2 rounded-full absolute top-[10em] left-[8.8em] sm:top-[11.7em] sm:left-[10.3em] md:top-[13.2em] md:left-[11.8em]
                         lg:top-[14.8em] lg:left-[15.6em] hover:text-blue-700 duration-150 cursor-pointer'
             onClick={() => profileImgRef.current.click()} >
          <MdEdit/> 
        </div>
    
        <div className='flex flex-col gap-5 mx-6' >
            <input type="text" placeholder='Entrez un nouveau nom...' 
                   className='theInput' id='name' defaultValue={currentUser?.name} onChange={handleChangeUserData} />
            <input type="email" placeholder='Entrez un nouveau email...'
                   className='theInput' id='email' defaultValue={currentUser?.email} onChange={handleChangeUserData} />
            <div className='w-full relative' >
              <input type={visiblePassword? 'text' : 'password'} placeholder='****************' className='theInput w-full'
                     id='password' onChange={handleChangeUserData} />
                {
                  visiblePassword? <HiEye className='signInIcon2' onClick={handleShowPassword} /> 
                  : <HiEyeOff className='signInIcon2' onClick={handleShowPassword} />
                }
            </div>

            <button type='submit' className='btn btn-sm md:btn-md bg-gradient-to-r from-indigo-500 to-pink-600 text-xs md:text-sm text-white' disabled={loading===true&&true}  >     
              {loading? "En attent..." : "Mettre à jour"}
            </button>

        </div>
    </form>

    <div className='max-w-xl w-full mx-auto px-7 flex flex-wrap items-center justify-between font-bold text-xs lg:text-sm' >
        <button type='button' className='text-red-500' onClick={deleteUserAlert} > Supprimer Compte </button>
        <button type='button' className='text-pink-500' onClick={desconnecteAlert} > Se déconnecter </button>   
    </div>

    {
      showImageProfile&& (
        <div className='w-full h-full fixed inset-0 flex justify-center bg-black bg-opacity-40 overflow-hidden backdrop-blur-sm animate-fadeIn' >
          <div className='bg-white pt-1 max-w-lg md:max-w-3xl lg:max-w-5xl w-full h-[35%] md:h-[60%] lg:h-[80%] mt-10 overflow-hidden rounded-lg' >
            <MdClose className=' ml-2 text-xl md:text-2xl cursor-pointer hover:text-pink-500 duration-150' onClick={handleChangeShowImage}  />
            <img src={currentUser.image} className='w-full h-full object-cover lg:object-contain animate-zoomIn' />
          </div>
        </div>
      )
    }

    <ToastContainer/>
  </section>
  )
}

export default DashProfile
