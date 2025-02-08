import React, { useEffect, useState } from 'react'
import { AiFillDelete, AiFillEdit, AiFillEye, AiOutlinePlusCircle, AiOutlineSearch } from 'react-icons/ai'
import {MdAdd} from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { fetchProjects,handleShowMoreProjects,fetchProjectsParticiped } from '../../../Redux/project/projectSlice.js'
import Swal from 'sweetalert2'
import {ToastContainer, toast} from 'react-toastify'

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
      const res = await fetch(`/backend/projet/deleteProject/${projectId}`,{
        method:"DELETE",
        headers:{
          Accept:"application/json"
        }
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
    <div className='max-w-[93em] w-full mx-auto px-10 py-3 overflow-hidden' >
    <div className={`table-auto overflow-x-scroll lg:overflow-x-hidden flex flex-col rounded-md gap-3 w-full`} >

      <div className='flex items-center justify-between'>
        <h2 className='text-3xl font-medium text-[#3f84c4]' >Mes Projets</h2>
        <div className='flex items-center flex-wrap gap-2' >
          <Link to={"addProject"} ><button  className={`btn bg-transparent hover:bg-[#3974ac] text-[#3974ac] hover:text-white hover:border-none transition-all
              border-[2px] border-[#3974ac]`} > 
            <AiOutlinePlusCircle className='text-lg' />Créer Projet
          </button></Link>

          <Link to={"../tache/AddTache"} ><button  className={`btn bg-transparent hover:bg-[#633cac] text-[#633cac] hover:text-white hover:border-none transition-all
              border-[2px] border-[#633cac]`} > 
            <MdAdd className='text-lg' />Créer une Tâshe
          </button></Link>
        </div>
      </div>

      <div className='w-full flex'>
        <div className='w-full relative' >
          <input type="text" placeholder='Rechercher un Projet' value={theSearchValue} onChange={(e) =>setTheSearchValue(e.target.value)}
                  className='bg-[#c691f727] w-full sm:w-[75%] outline-none py-3 pl-5 text-sm rounded-md' />
            <AiOutlineSearch className='text-xl text-zinc-500 cursor-pointer absolute top-3 left-[70%] lg:left-[72%] ' />
        </div>
        <select className='bg-transparent text-sm text-zinc-700 font-semibold outline-none' defaultValue={""} onChange={(e)=>setTypeProjects(e.target.value)}  >
          <option value="">Mes projets</option>
          <option value="paticipated">Projets dont vous participez </option>
        </select>
      </div>

        { loading === true? (
          <span className='w-full text-center text-lg font-bold mt-10 text-zinc-400' >Chargement...</span>
          ) : 
        <table className="table">
            {/* head */}
            <thead className='border-b-[2px] text-zinc-700 bg-[#388ddd3d]' >
              <tr className={`text-sm `} >
                <th>Nom Projet</th>
                <th>Description</th>
                {typeProjects==="paticipated"&& <th>Créateur</th>}
                <th>Membres</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className='text-sm' >
              {/* row  */}
          
              {
                projects && projects.map((item,i) =>(
                  <tr key={i} className='h-14 hover:bg-[#c4c4c427] duration-100 border-b border-b-[#7c7b7b31]'>
                    <td className='min-w-[120px] max-w-[200px] overflow-hidden' >{item.projectName}</td>
                    <td className='min-w-[250px] max-w-[320px]' ><p className='line-clamp-3'>{item.projectDescription}</p></td>
                    {typeProjects==="paticipated"&& <td className='text-blue-500 font-semibold' >{item.createur.name}</td>}
                    <td className='flex flex-wrap gap-2 items-center min-w-[150px] max-w-lg' >{item.membres.map((item,i) =>(
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