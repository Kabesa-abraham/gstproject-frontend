import React, { useEffect, useState } from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { HiX } from 'react-icons/hi'
import { Link, useParams } from 'react-router-dom'
import Select from 'react-select'
import {useDispatch,useSelector} from 'react-redux'
import {handleFetchTheTask,updateTaskFailed,updateTaskStart,updateTaskSuccess } from '../Redux/task/taskSlice.js'
import {ToastContainer,toast} from 'react-toastify'
import { MdAddAlert } from 'react-icons/md'

const UpdateTache = () => {
    const {tacheId} = useParams(); //l'id du tâche

    const dispatch = useDispatch();
    const {loading,error,theTask} = useSelector(state => state.task)

    useEffect(() =>{ //pour fetch le task en question grâce à son Id
        if(tacheId){dispatch(handleFetchTheTask(tacheId))}
    },[])

    const [taskData,setTaskData] = useState({});
    const handleChangeData = (e) =>{
        if(e.target){ //pour les input classique
            setTaskData({...taskData , [e.target.id]:e.target.value});
        }else{ //pour Select car il ne gère pas le e.target
            setTaskData({...taskData, projectId:e.value})
        }
    };

    const updateTheTask = async(e) =>{
        e.preventDefault();
        try {
            dispatch(updateTaskStart())
            const res = await fetch(`/backend/task/updateTask/${tacheId}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(taskData)
            })
            const data = await res.json();
            if(!res.ok){
                dispatch(updateTaskFailed(data.message))
            }
            if(res.ok){
                toast.success(data,{
                    draggable:true,
                    autoClose:4000,
                    position:"top-center"
                });
                dispatch(updateTaskSuccess());
            }
        } catch (error) {
            dispatch(updateTaskFailed(error))
        }
    }

   

    console.log("hello",theTask)
    console.log("useState",taskData)
   // console.log(theTask.projectId?.projectName)

    //Pour rechecher le projet
    const [allProject,setAllProject] = useState([]);
    const fetchProject = async(query = "") =>{
        try {
            const res = await fetch(`/backend/projet/fetchProject?searchTerm=${query}&limit=7`)
            const data = await res.json();
            if(res.ok){
                const formattedData = data.project.map((item) =>({
                    value:item._id, //ici label et value sont use dans react-select dans la suggestion label sera visible
                    label:item.projectName
                }))
                setAllProject(formattedData)
            }
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <section className='w-full' >
        <div className='max-w-7xl mx-auto px-3 py-3 md:px-10 w-full flex flex-col gap-4 ' >
            <div className='flex items-center gap-2 text-lg' >
                <Link to={'..'} ><span className='text-zinc-500 cursor-pointer' >Mes Tâches</span> </Link>
                <FaChevronRight className='text-zinc-400 text-sm' /> 
                <span className='font-bold text-[#4794d3] cursor-pointer' >Mise à jour du Tâche</span>
            </div>

            <form className='max-w-2xl bg-zinc-50 p-6 flex flex-col gap-2 text-sm' onSubmit={updateTheTask}>
                <div className='relative' >
                    <p className='font-medium text-gray-500' >Nom du Tâche</p>
                    <input type="text" placeholder='Entrez le nom du projet' 
                        className={`w-full py-2 pl-3 bg-[#d4d4d42c] border border-zinc-200 outline-1 outline-[#4794d386] `}
                        id='taskName' defaultValue={theTask?.taskName} onChange={handleChangeData}
                    />
                    {/* { theTask.taskName&& 
                    <HiX className='absolute top-8 right-2 text-lg text-zinc-500 cursor-pointer' onClick={()=>setTaskData({...taskData, taskName:""})} /> } */}
                </div>

                <div>
                    <p className='font-medium text-gray-500' >Description</p>
                    <textarea className='w-full h-28 p-2 bg-[#d4d4d42c] border border-zinc-200 outline-[#4794d386] ' 
                            placeholder={theTask.taskDescription? 'Rédiger la description du projet' : "Pas de déscription pour ce projet"}
                            id='taskDescription' defaultValue={theTask?.taskDescription} onChange={handleChangeData}
                    ></textarea>
                </div>

                <div className='w-full' >
                    <label className='font-medium text-gray-500' >Inscrivez le projet</label>
                    <Select placeholder="Rechercher un projet" className='w-full'
                            options={allProject}
                            value={{label:theTask.projectId?.projectName}}
                            onChange={handleChangeData}
                            onInputChange={(value) =>{
                                fetchProject(value)
                            }}
                            noOptionsMessage={() =>"Pas de projet"} 
                    />
                </div>

                <div className='w-full flex flex-col md:flex-row items-center gap-2 md:gap-5' >
                    <div className='w-full flex flex-col' >
                        <label className='font-medium text-gray-500' >Status </label>
                        <select className='select select-bordered w-full bg-[#d4d4d42c] text-gray-600 font-medium rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 transition-all duration-150 '
                                id='status' defaultValue={theTask?.status} onChange={handleChangeData}
                        >
                            <option value="A faire" >A faire</option>
                            <option value="En cours">En cours</option>
                            <option value="Terminé">Terminé</option>
                        </select>
                    </div>
                    
                    <div className='w-full flex flex-col' >
                        <div className='flex items-center gap-2 flex-wrap mb-2' >
                            <label className='font-medium text-gray-500' >Date du délai:</label>
                            <p className='text-sm font-semibold text-teal-500 ' >{theTask.deadLine? new Date(theTask.deadLine).toLocaleDateString() : "Non défini"}</p>
                        </div>
                        <input type='date' className='p-2 bg-[#d4d4d42c] border border-zinc-300 outline-1 outline-blue-200' 
                            id='deadLine' defaultValue={taskData} onChange={handleChangeData}
                        />
                    </div>
                    
                </div>

                <button type='submit' className='btn bg-transparent hover:bg-[#589bd6cc] text-[#5aa3e7] hover:text-white hover:border-none duration-150
                    border border-[#5aa3e7] mt-5 ' disabled={loading&& true} >
                    { loading===true? "En attent..." : "Mettre à jour" }
                </button>

                { error&& ( <p className='alert alert-error text-white flex items-center gap-3 p-1 px-3 text-sm rounded-full' >
                            <MdAddAlert className='text-lg' /> {error}</p> )}
            </form>
        </div>
        <ToastContainer/>
    </section>
  )
}

export default UpdateTache
