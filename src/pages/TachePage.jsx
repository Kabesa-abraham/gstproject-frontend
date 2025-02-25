import React, { useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {handleFetchTheTask} from '../Redux/task/taskSlice.js'
import { Link, useParams } from 'react-router-dom'
import { FaCalendar, FaChevronRight, FaProjectDiagram, FaUserAlt } from 'react-icons/fa'
import { MdOutlineVerified } from 'react-icons/md'
import userIcon from '../components/Assets/img13.png'

const TachePage = () => {

    const {tacheId} = useParams();
    const dispatch = useDispatch();
    const {loading,error,theTask} = useSelector(state => state.task);

    useEffect(() =>{
        dispatch(handleFetchTheTask(tacheId))
    },[tacheId])

    const getProgessDeadLine = (createdAt,deadLine) =>{
        if(!deadLine) return 0
    
        const start = new Date(createdAt).getTime(); //la date de création en timestamp
        const end = new Date(deadLine).getTime(); //la date limite en timestamp
        const now = new Date().getTime(); //date actuelle en timestamp
    
        if(now >= end) return 100
        if(now <= start) return 0
        const progress = ((now - start) / (end - start)) * 100
        return Math.min(progress, 100);
      }

  return (
    <section className='max-w-5xl w-full mx-auto flex flex-col gap-4  px-2 sm:px-4 md:px-8 py-3 overflow-hidden ' >
        <div className='flex items-center gap-2 text-sm sm:text-lg md:text-xl' >
            <Link to={'..'} ><span className='text-zinc-500 cursor-pointer' >Mes Taches</span> </Link>
            <FaChevronRight className='text-zinc-400 text-sm' /> 
            <span className='font-bold text-[#4794d3] cursor-pointer' >Tâche</span>
        </div>
    
        <div className='w-full bg-zinc-100 p-3 border border-blue-300 rounded-lg flex flex-col gap-3 '  >
            <h2 className='text-[17px] font-bold text-center text-zinc-700 ' >{theTask?.taskName}</h2>
            {
              theTask.taskDescription? <p className='text-gray-600 text-[15px] ' >{theTask.taskDescription}</p> 
              : <p className='text-sm text-gray-400' >pas de description pour cette tâche</p>
            }
    
            <div className='mt-1 text-sm text-gray-500 mx-7' >
                <div className='flex items-center gap-2 md:gap-5 justify-between flex-wrap md:flex-nowrap' >
                    <p className='flex items-center gap-2 md:my-4' >
                        <FaCalendar className='text-purple-500 text-xl '/> Date de création :  {new Date(theTask?.createdAt).toLocaleDateString()}
                    </p>
                    <p className='flex items-center gap-2 my-2 md:my-4' >
                        <FaCalendar className='text-red-500 text-xl '/> Date Limite :  {new Date(theTask?.deadLine).toLocaleDateString()}
                    </p>
                </div>

                <div className={`py-4 w-full bg-[#1ab6ff25] rounded-md overflow-hidden border border-[#00a2f331] relative`} >
                    <div className={`h-full w-full   transition-all p-2 absolute top-0 ${getProgessDeadLine(theTask?.createdAt,theTask?.deadLine)<55&& 'bg-[#23c8f167]'}
                                    ${getProgessDeadLine(theTask?.createdAt,theTask?.deadLine)>50 || getProgessDeadLine(theTask?.createdAt,theTask?.deadLine)===99.99 && 'bg-[#f1dc2367]'} 
                                    ${getProgessDeadLine(theTask?.createdAt,theTask?.deadLine)===100&& 'bg-[#f1232363]'} `} 
                               style={{width:`${getProgessDeadLine(theTask?.createdAt,theTask?.deadLine)}%`}} >
                    </div>
                </div>
            </div>

            <div className='mt-1 text-sm text-gray-500 mx-7 flex flex-col gap-2 ' >
                <div className='flex items-center gap-3' >
                    <span className='flex gap-1' >
                        <MdOutlineVerified className='text-xl text-blue-500 mr-1 ' />
                        <p>Status :</p>
                    </span>
                   <h4 className={`text-lg font-bold ${theTask?.status==="A faire"&& 'text-blue-400'}  ${theTask?.status==="En cours"&& 'text-blue-700'} 
                                  ${theTask?.status==="Terminé"&& 'text-pink-500'} `} >{theTask?.status}</h4>
                </div>

                <div className='flex items-center gap-3' >
                    <span className='flex gap-1' >
                        <FaUserAlt className='text-xl text-blue-500 mr-1 ' />
                        <p>Créateur de la Tâche :</p>
                    </span>
                    <div className='flex gap-2 items-center' >
                        <img src={theTask.assigneA?.image || userIcon} className='w-10 h-10 object-cover rounded-full' />
                        <p>{theTask.assigneA?.name}</p>
                    </div>
                </div>

                <div className='flex items-center gap-3' >
                    <span className='flex gap-1' >
                        <FaProjectDiagram className='text-xl text-[#28A745] mr-1 ' />
                        <p>Nom du projet :</p>
                    </span>
                    <div className='flex gap-2 items-center' >
                        <p className='text-xs sm:text-sm md:text-lg text-zinc-700 font-bold uppercase' >{theTask.projectId?.projectName}</p>
                        <Link to={`../../projet/theProject/${theTask.projectId?._id}`} ><details></details></Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default TachePage
