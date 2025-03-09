import React, { useEffect, useState } from 'react'
import { AiFillDelete, AiFillEdit, AiFillEye, AiOutlinePlusCircle, AiOutlineSearch } from 'react-icons/ai'
import {MdAdd} from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { fetchProjects,handleShowMoreProjects,fetchProjectsParticiped } from '../../../Redux/project/projectSlice.js'
import Swal from 'sweetalert2'
import {ToastContainer, toast} from 'react-toastify'
import backendUrl from '../../../utils/backendUrl.js'

const DashProjet = () => {

  const dispatch = useDispatch();
  const {loading,projects,showMore} = useSelector(state => state.project);
  const [theSearchValue,setTheSearchValue] = useState("") //pour écouter les valeur du champ de recherche
  const [typeProjects,setTypeProjects] = useState("") //pour changer entre MES PROJETS crée ou LES PROJETS PARTICIPE

  useEffect(()=>{
    if(typeProjects===""){
      dispatch(fetchProjects(theSearchValue));
    }
    if(typeProjects==="paticipated"){
      dispatch(fetchProjectsParticiped(theSearchValue));
    }
  },[theSearchValue,typeProjects])

  const deleteTheProject = async(projectId) =>{ //fonction pour la suppression d'un projet
    try {
      const res = await fetch(`${backendUrl}/projet/deleteProject/${projectId}`,{
        method:"DELETE",
        headers:{
          Accept:"application/json"
        },
        credentials: 'include',
      })
      const data = await res.json();
      if(!res.ok){
        console.log(data.message)
      }
      if(res.ok){
        dispatch(fetchProjects(theSearchValue));
        toast.success(data,{
          autoClose:3000,
          position:'top-center',
          draggable:true
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  const mySwalAlertDelete = (projectId) =>{
    Swal.fire({
      icon:'warning',
      position:'center',
      text:'En supprimant ce Projet tout les tâches assignés à celui-ci seront eux aussi supprimées?',
      showCancelButton:true,
      cancelButtonText:'Non, annuler',
      cancelButtonColor:'red',
      confirmButtonText:'Oui, je suis sûr',
    }).then((res)=>{
      if(res.isConfirmed){
        deleteTheProject(projectId);
      }
    })
  }

  return (
    <div className=' w-full mx-auto overflow-hidden' >
      <div className={`max-w-7xl mx-auto px-2 lg:px-5 py-2 md:py-4 flex flex-col gap-3`} >

        <div className='flex items-center justify-between gap-2 sm:gap-5'>
          <h2 className='text-sm sm:text-xl md:text-3xl font-medium text-[#3f84c4]' >Mes Projets</h2>

          <div className='flex items-center gap-2' >
            <Link to={"addProject"} ><button  className={`min-w-[105px] px-2 py-2 md:py-3 flex items-center gap-1 hover:bg-[#3974ac] text-[#3974ac] font-medium hover:text-white transition-all
                border-[2px] border-[#3974ac] text-xs md:text-sm rounded-lg `} > 
              <AiOutlinePlusCircle className='text-xs md:text-lg' />Créer Projet
            </button></Link>

            <Link to={"../tache/AddTache"} ><button  className={`min-w-[125px] px-2 py-2 md:py-3 flex items-center gap-1 hover:bg-[#633cac] text-[#633cac] hover:text-white transition-all
                border-[2px] border-[#633cac] text-xs md:text-sm font-medium rounded-lg `} > 
              <MdAdd className='text-xs md:text-lg' />Créer une Tâche
            </button></Link>
          </div>
        </div>

        <div className="bg-[#7db9f12d] shadow-sm rounded-lg p-2 w-full">
          <div className="w-full flex flex-col md:flex-row gap-1 md:gap-4 md:items-center ">
            <div className='w-full relative' >
              <input type="text" placeholder='Rechercher un Projet' value={theSearchValue} onChange={(e) =>setTheSearchValue(e.target.value)}
                    className='bg-transparent border border-[#3e98ec6c] w-full md:w-[75%] outline-none py-3 pl-5 text-sm rounded-md' />
              <AiOutlineSearch className='text-xl text-zinc-500 cursor-pointer absolute top-3 right-[3%] md:right-[26%] ' />
            </div>

            <div className="relative">
              <select className='text-sm text-zinc-700 font-semibold appearance-none w-full bg-white px-4 py-2  rounded-lg border border-gray-300
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer' defaultValue={""} onChange={(e)=>setTypeProjects(e.target.value)}  >
                <option value="">Mes projets</option>
                <option value="paticipated">Projets dont vous participez </option>
              </select>
            </div>
          </div>
        </div>

          { loading === true? (
            <span className='w-full text-center text-sm md:text-lg font-bold mt-10 text-zinc-400' >Chargement...</span>
            ) : 
            <div className='table-auto overflow-x-scroll md:overflow-x-hidden  rounded-md ' >
              <table className="table overflow-x-scroll">
                
                  <thead className='border-b-[2px] text-zinc-700 bg-[#388ddd3d]' >
                    <tr className={`text-xs sm:text-sm `} >
                      <th>Nom Projet</th>
                      <th>Description</th>
                      {typeProjects==="paticipated"&& <th>Créateur</th>}
                      <th>Membres</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className='text-xs sm:text-sm' >
              
                
                    {
                      projects && projects.map((item,i) =>(
                        <tr key={i} className='h-14 hover:bg-[#c4c4c427] duration-100 border-b border-b-[#7c7b7b31]'>
                          <td className='min-w-[120px] max-w-[200px] overflow-hidden' ><p className='line-clamp-2' >{item?.projectName}</p></td>

                          <td className='min-w-[200px] max-w-[320px]' ><p className='line-clamp-3'>{item?.projectDescription}</p></td>
                          {typeProjects==="paticipated"&& <td className='text-blue-500 font-semibold' >{item.createur?.name}</td>}
                          <td className='flex flex-wrap gap-2 items-center min-w-[150px] max-w-lg' >{item?.membres.map((item,i) =>(
                            <p key={i} >{item.name},</p>
                            ))}
                          </td>
                          <td>
                            <div className='flex gap-3 lg:gap-5 text-sm lg:text-xl items-center' >
                              {typeProjects===""&& <Link to={`updateProject/${item._id}`} ><AiFillEdit className='cursor-pointer text-blue-600' /></Link>}

                              <Link to={`theProject/${item._id}`} ><AiFillEye  className={`cursor-pointer`}/></Link>

                              {typeProjects===""&& <AiFillDelete className='cursor-pointer text-pink-600' onClick={()=>mySwalAlertDelete(item._id)} />}
                            </div>
                          </td>
                        </tr>
                      ))
                    }
                </tbody>
              </table>
            </div>
        }
        {
          showMore && (
            <button className='w-full rounded-md text-xs font-bold py-1 text-black bg-[#46a0cab9] ' onClick={()=>dispatch(handleShowMoreProjects(projects.length))} >
              Voir Plus
            </button>
          )
        }

    </div>
    <ToastContainer/>
</div>

)
}

export default DashProjet