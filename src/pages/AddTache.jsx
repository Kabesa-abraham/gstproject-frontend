import React, { useEffect, useState } from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { HiX } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import {useDispatch,useSelector} from 'react-redux'
import { addTaskStart,addTaskFailed,addTaskSuccess } from '../Redux/task/taskSlice.js'
import {ToastContainer,toast} from 'react-toastify'
import { MdAddAlert } from 'react-icons/md'

const AddTache = () => {

    const distatch = useDispatch();
    const {loading,error} = useSelector(state => state.task)
    const [taskData,setTaskData] = useState({
        taskName:"",
        taskDescription:"",
        status:"A faire",
        projectId:null,
        deadLine:""
    });
    const handleChangeData = (e) =>{
        if(e.target){ //pour les input classique
            setTaskData({...taskData , [e.target.name]:e.target.value});
        }else{ //pour Select car il ne gère pas le e.target
            setTaskData({...taskData, projectId:e.value})
        }
    };

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

    const handleCreateTask = async(e) =>{
        e.preventDefault();

        try {
            distatch(addTaskStart())
            
            const res = await fetch('/backend/task/createTask',{
                method:'POST',
                headers:{
                    Accept:"application/json",
                    "Content-Type":'application/json'
                },
                body:JSON.stringify(taskData)
            })
            const data = await res.json();
            if(!res.ok){
                distatch(addTaskFailed(data.message))
            }
            if(res.ok){
                distatch(addTaskSuccess())
                toast.success(data,{
                    position:"top-center",
                    autoClose:4000,
                    draggable:true
                })
            }
        } catch (error) {
            distatch(addTaskFailed(error))
        }
    }

  return (
    <section className='w-full' >
        <div className='max-w-6xl mx-auto px-3 py-3 md:px-10 w-full flex flex-col gap-4 ' >
            <div className='flex items-center gap-2 text-sm md:text-lg' >
                <Link to={'..'} ><span className='text-zinc-500 cursor-pointer' >Mes Tâches</span> </Link>
                <FaChevronRight className='text-zinc-400 text-sm' /> 
                <span className='font-bold text-[#4794d3] cursor-pointer' >Création Tâche</span>
            </div>

            <form className='w-full bg-zinc-50 p-6 flex flex-col gap-2 text-sm' onSubmit={handleCreateTask}>
                <div className='relative' >
                    <p className='font-medium text-gray-500' >Nom du Tâche</p>
                    <input type="text" placeholder='Entrez le nom du projet' 
                        className={`w-full py-2 pl-3 bg-[#d4d4d42c] border border-zinc-200 outline-1 outline-[#4794d386] `}
                        name='taskName' value={taskData.taskName} onChange={handleChangeData}
                    />
                { taskData.taskName&& 
                <HiX className='absolute top-8 right-2 text-lg text-zinc-500 cursor-pointer' onClick={()=>setTaskData({...taskData, taskName:""})} /> }
                </div>

                <div>
                    <p className='font-medium text-gray-500' >Description</p>
                    <textarea className='w-full h-28 p-2 bg-[#d4d4d42c] border border-zinc-200 outline-[#4794d386] ' 
                            placeholder='Rédiger la description du projet'
                            name='taskDescription' value={taskData.taskDescription} onChange={handleChangeData} 
                    ></textarea>
                </div>

                <div className='w-full' >
                    <label className='font-medium text-gray-500' >Inscrivez le projet</label>
                    <Select placeholder="Rechercher un projet" className='w-full'
                            options={allProject}
                            value={allProject.find((p)=> p.value === taskData.projectId || null )}
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
                                name='status' value={taskData.status} onChange={handleChangeData}
                        >
                            <option value="A faire" >A faire</option>
                            <option value="En cours">En cours</option>
                            <option value="Terminé">Terminé</option>
                        </select>
                    </div>
                    
                    <div className='w-full flex flex-col' >
                        <label className='font-medium text-gray-500' >Date de délai du tâche</label>
                        <input type='date' className='p-2 bg-[#d4d4d42c] border border-zinc-300 outline-1 outline-blue-200 ' 
                            name='deadLine' value={taskData.deadLine} onChange={handleChangeData}
                        />
                    </div>
                    
                </div>

                <button type='submit' className='btn bg-transparent hover:bg-[#589bd6cc] text-[#5aa3e7] hover:text-white hover:border-none duration-150
                    border border-[#5aa3e7] mt-5 ' disabled={loading&& true} >
                    { loading===true? "En attent..." : "Créer Tâche" }
                </button>

                { error&& ( <p className='alert alert-error text-white flex items-center gap-3 p-1 px-3 text-sm rounded-full' >
                            <MdAddAlert className='text-lg' /> {error}</p> )}
            </form>
        </div>
        <ToastContainer/>
    </section>
  )
}

export default AddTache
