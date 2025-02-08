import React, { useEffect, useState } from 'react'
import { AiFillDelete, AiFillEdit, AiFillEye, AiOutlinePlusCircle, AiOutlineSearch } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { fetchTaskes } from '../../../Redux/task/taskSlice.js'
import Select from 'react-select'
import { handleShowMoreTaskes } from '../../../Redux/task/taskSlice.js'
import Swal from "sweetalert2"
import {ToastContainer,toast} from "react-toastify"

const theStyle = { //pour styliser le Select
  control: (provided) => ({
    ...provided,
    backgroundColor: "#dccaec27",
    border: "1px solid #32b5dd9c",
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
      const res = await fetch(`/backend/projet/fetchProject?searchTerm=${query}`)
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
      const res = await fetch(`/backend/task/deleteTask/${taskId}`,{
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
    <div className='max-w-[93em] min-h-screen w-full mx-auto px-10 py-3 overflow-hidden' >
      <div className={`table-auto overflow-x-scroll lg:overflow-x-hidden flex flex-col rounded-md gap-3 w-full`} >

        <div className='flex items-center justify-between'>
          <h2 className='text-3xl font-medium text-[#3f84c4]' >Mes Tâches</h2>
          <Link to={'addTache'} ><button  className={`btn bg-transparent hover:bg-[#3974ac] text-[#3974ac] hover:text-white hover:border-none transition-all
              border-[2px] border-[#3974ac]`} > 
            <AiOutlinePlusCircle className='text-lg' />Créer Une Tâche
          </button></Link>
        </div>

        <div className='w-full flex items-center gap-5' >
          <div className='w-full flex items-center' >
            <select value={taskProjet} onChange={(e)=>setTaskProjet(e.target.value)} 
                    className='p-2 text-sm font-bold bg-transparent outline-none text-blue-500 mr-2 '  
             > {/*pour choisir entre task ou option */}
              <option value="task" className='text-blue-500' >tâche</option>
              <option value="projet" className='text-pink-500' >projet</option>
            </select>
            {
              taskProjet==='task' ?
              <div className='w-full relative'> 
                <input type="text" placeholder='Rechercher une tâche spécifique' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}
                      className='bg-[#dccaec27] w-full outline-none py-3 pl-5 text-sm rounded-md border border-blue-300' />
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

          <div className='w-full flex items-center gap-2 ' >
            <label className='font-bold text-sm text-zinc-500' >Triez par Status: </label>
            <select className='select select-bordered w-full max-w-[160px] bg-zinc-100 text-gray-600 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200 ' 
                    defaultValue={""}  onChange={(e)=> setStatus(e.target.value)} >
              <option value="" >Non catégorisé</option>
              <option value="A faire">A faire</option>
              <option value="En cours">En cours</option>
              <option value="Terminé">Terminé</option>
            </select>
          </div>

        </div>

        { loading === true? (
          <span className='w-full text-center text-lg font-bold mt-10 text-zinc-400' >Chargement...</span>
          ) : 
          <table className="table">
              {/* head */}
              <thead className='border-b-[2px] text-zinc-700 bg-[#388ddd3d]' >
                <tr className={`text-sm `} >
                  <th>Tâche</th>
                  <th>Projet Assigné</th>
                  <th>Status</th>
                  <th>Fin du tâche</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className='text-sm' >
                {/* row  */}

                {
                  tasks && tasks.map((item,i) =>(
                    <tr key={i} className='h-14 hover:bg-[#c4c4c427] duration-100 border-b border-b-[#7c7b7b31]'>
                      <td className='min-w-[120px] max-w-[200px] overflow-hidden' >{item.taskName}</td>
                      <td className='min-w-[250px] max-w-[320px]' ><p className='line-clamp-3'>{item.projectId.projectName}</p></td>
                      <td className='font-semibold text-yellow-700' >{item.status }</td>
                      <td className='flex flex-wrap gap-2 items-center min-w-[150px] max-w-lg' >{new Date(item.deadLine).toLocaleDateString()}</td>
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
