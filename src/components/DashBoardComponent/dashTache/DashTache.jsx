import React, { useEffect, useState } from 'react'
import { AiFillDelete, AiFillEdit, AiFillEye, AiOutlinePlusCircle, AiOutlineSearch } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { fetchTaskes } from '../../../Redux/task/taskSlice.js'
import Select from 'react-select'
import { handleShowMoreTaskes } from '../../../Redux/task/taskSlice.js'
import Swal from "sweetalert2"
import {ToastContainer,toast} from "react-toastify"
import backendUrl from '../../../utils/backendUrl.js'

const theStyle = { //pour styliser le Select
  control: (provided) => ({
    ...provided,
    backgroundColor: "transparent",
    border: "1px solid #50a0fc",
    borderRadius:"6px",
    padding: '4px 0 4px 11px',
    fontSize:"14px"
  })
}

const DashTache = () => {

  const dispatch = useDispatch();
  const {tasks,loading,showMore} = useSelector(state =>state.task)

  const [taskProjet,setTaskProjet] = useState('task');

  const [searchValue,setSearchValue] = useState("") //les valeurs de recherches pour rechercher les tâches et project assigné à des tâches
  const [status,setStatus] = useState("") //va me permettre de triez les tâches par status

  const [allProject,setAllProject] = useState([]);
  const [projectId,setProjectId] = useState("")//c'est ici qu'on aura l'id du projet
  const handleSelectedProjectChange = (selectedOption) =>{
    setProjectId(selectedOption? selectedOption.value : "")
  }

  useEffect(()=>{
    dispatch(fetchTaskes({searchValue,status,projectId}))
  },[searchValue,status,projectId])

  //pour rechercher un projet grâce à Select de react-select
  const fetchProjects = async(query = "") =>{
    try {
      const res = await fetch(`${backendUrl}/projet/fetchProject?searchTerm=${query}`,{credentials: 'include',})
      const data = await res.json();
      if(res.ok){
        const formattedData = data.project.map((item) =>({
          value:item._id, //ici label et value sont use dans react-select dans la suggestion label sera visible
          label:item.projectName
        }))
        setAllProject(formattedData);
      }
    } catch (error) {
      console.log(error)
    }
  }

  //pour supprimer une tâche
  const deleteTache = async(taskId)=>{
    try {
      const res = await fetch(`${backendUrl}/task/deleteTask/${taskId}`,{
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
        toast.success(data,{
          draggable:true, position:"top-center",autoClose:4000
        })
        dispatch(fetchTaskes({searchValue,status,projectId})) //j'actualise le tableau des tâches
      }
    } catch (error) {
      console.log(error)
    }
  }
  const mySwalAlertDelete2 = (taskId) =>{
      Swal.fire({
        icon:'warning',
        position:'center',
        text:'Voulez-vous vraiment supprimé cette Tâche?',
        showCancelButton:true,
        cancelButtonText:'Non, annuler',
        cancelButtonColor:'red',
        confirmButtonText:'Oui, je suis sûr',
      }).then((res)=>{
        if(res.isConfirmed){
          deleteTache(taskId);
        }
      }) }

  return ( 
    <div className='w-full mx-auto overflow-hidden' >
      <div className={`max-w-7xl mx-auto px-2 lg:px-5 py-2 md:py-4 flex flex-col gap-3`} >

        <div className='flex items-center justify-between'>
          <h2 className=' text-sm sm:text-xl md:text-3xl font-medium text-[#3f84c4]' >Mes Tâches</h2>
          <Link to={'addTache'} ><button  className={`min-w-[125px] px-2 py-2 md:py-3 flex items-center gap-1 hover:bg-[#633cac] text-[#633cac] hover:text-white transition-all
                border-[2px] border-[#633cac] text-xs md:text-sm font-medium rounded-lg`} > 
            <AiOutlinePlusCircle className='text-sm sm:text-lg' />Créer Une Tâche
          </button></Link>
        </div>

        <div className="bg-[#7db9f12d] shadow-sm rounded-lg p-2 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            
            {/* Sélection de tâche */}
            <div className="relative">
                <select value={taskProjet} onChange={(e)=>setTaskProjet(e.target.value)} 
                        className='p-2 text-sm font-bold bg-transparent outline-none text-blue-500 mr-2 '  
                > 
                  <option value="task" className='text-blue-500' >tâche</option>
                  <option value="projet" className='text-pink-500' >projet</option>
                </select>
            </div>

            {/* Champ de recherche avec icône */}
            <div className="relative">
              {
                taskProjet==='task' ?
                  <div className='w-full relative'> 
                    <input type="text" placeholder='Rechercher une tâche spécifique' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}
                          className='bg-transparent w-full outline-none py-3 pl-5 text-sm rounded-md border border-[#50a0fc]' />
                      <AiOutlineSearch className='text-xl text-blue-400 cursor-pointer absolute right-4 top-3 ' />
                  </div> 
                  :
                  <Select placeholder="Rechercher un projet" className='w-full' styles={theStyle}
                          options={allProject}
                          value={allProject.find(p => p.value === projectId)}
                          onChange={handleSelectedProjectChange}
                          onInputChange={(value) =>{
                              fetchProjects(value)
                          }}
                          isClearable
                          noOptionsMessage={() =>"Pas de projet"} 
                  />
              }
            </div>

            {/* Filtre par statut */}
            <div className='w-full flex items-center gap-2 ' >
              <label className='font-medium text-xs md:text-sm text-zinc-500' >Triez par Status: </label>
              <select className='select select-bordered w-full max-w-[160px] bg-transparent text-gray-600 font-medium text-xs md:text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200 ' 
                      defaultValue={""}  onChange={(e)=> setStatus(e.target.value)} >
                <option value="" >Non catégorisé</option>
                <option value="A faire">A faire</option>
                <option value="En cours">En cours</option>
                <option value="Terminé">Terminé</option>
              </select>
            </div>

          </div>
        </div>

        { loading === true? (
          <span className='w-full text-center text-sm sm:text-lg font-bold mt-10 text-zinc-400' >Chargement...</span>
          ) : 
          <div className='table-auto overflow-x-scroll md:overflow-x-hidden rounded-md' >
            <table className="table">
                {/* head */}
                <thead className='border-b-[2px] text-zinc-700 bg-[#388ddd3d]' >
                  <tr className={`text-xs sm:text-sm `} >
                    <th>Tâche</th>
                    <th>Projet Assigné</th>
                    <th>Status</th>
                    <th>Fin du tâche</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className='text-xs sm:text-sm' >
                  {/* row  */}

                  {
                    tasks && tasks.map((item,i) =>(
                      <tr key={i} className='h-14 hover:bg-[#c4c4c427] duration-100 border-b border-b-[#7c7b7b31]'>
                        <td className='min-w-[120px] max-w-[200px] overflow-hidden' >{item?.taskName}</td>
                        <td className='min-w-[200px] max-w-[320px]' ><p className='line-clamp-3'>{item?.projectId.projectName}</p></td>
                        <td className='font-semibold text-yellow-700' >{item?.status }</td>
                        <td className='flex flex-wrap gap-2 items-center min-w-[150px] max-w-lg' >{new Date(item?.deadLine).toLocaleDateString()}</td>
                        <td>
                          <div className='flex gap-3 lg:gap-5 text-sm lg:text-xl items-center' >
                            <Link to={`updateTache/${item._id}`} ><AiFillEdit className='cursor-pointer text-blue-600' /></Link>
                            <Link to={`theTask/${item._id}`} ><AiFillEye  className='cursor-pointer'/></Link>
                            <AiFillDelete className='cursor-pointer text-pink-600' onClick={() =>mySwalAlertDelete2(item._id)} />
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
          <button className='w-full rounded-md text-xs font-bold py-1 text-black bg-[#46a0cab9] ' onClick={()=>dispatch(handleShowMoreTaskes(tasks.length))} >
            Voir Plus
          </button>
        )
      }
      </div>
      <ToastContainer/>
    </div>
  )
}

export default DashTache