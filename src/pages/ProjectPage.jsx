import React, { useEffect, useState } from 'react'
import { FaCalendar, FaChevronRight, FaUsers } from 'react-icons/fa'
import { Link,useParams } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import { fetchTheProject } from '../Redux/project/projectSlice.js'
import {FaUser} from 'react-icons/fa'
import userIcon from '../components/Assets/img13.png'
import emptyboxIcon from '../components/Assets/emptybox.png'
import backendUrl from '../utils/backendUrl.js'

const ProjectPage = () => {
  const {projectId} = useParams();

  const dispatch = useDispatch();
  const {projet,loading} = useSelector(state => state.project)
  const [someTaskes,setSomeTaskes] = useState([])
  const [showMore,setShowMore] = useState(true) //pour le boutton voir plus

  useEffect(()=>{
      if(projectId){
          dispatch(fetchTheProject(projectId))
          fetchAllTaskByProject(projectId)
      }
  },[projectId])

  const fetchAllTaskByProject = async(projectId)=>{ //pour fetch tout les tâches d'un projet 
    try {
        const res = await fetch(`${backendUrl}/task/fetchTaskesForProject?projectId=${projectId}`,{credentials: 'include',});
        const data = await res.json();
        if(!res.ok){console.log(data.message)}
        if(res.ok){
          setSomeTaskes(data.taskesWithOutAssigneA) 
          if(data.taskesWithOutAssigneA.length < 10){ setShowMore(false) }else{ setShowMore(true) }
        }
    } catch (error) {
      console.log(error)}
  }

  const ShowMoreTaskByProject = async(projectId)=>{
    try {
        const res = await fetch(`${backendUrl}/task/fetchTaskesForProject?projectId=${projectId}&startIndex=${someTaskes.length}`,{credentials: 'include',});
        const data = await res.json();
        if(!res.ok){console.log(data.message)}
        if(res.ok){
          setSomeTaskes([...someTaskes, ...data.taskesWithOutAssigneA]) 
          if(data.taskesWithOutAssigneA.length < 10){ setShowMore(false) }else{ setShowMore(true) }
        }
    } catch (error) {
      console.log(error)}
  }

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
    <section className='max-w-5xl w-full mx-auto flex flex-col gap-4 px-2 sm:px-4 md:px-8 py-3 overflow-hidden ' >
        <div className='flex items-center gap-2 sm:text-sm md:text-lg' >
            <Link to={'..'} ><span className='text-zinc-500 cursor-pointer' >Mes Projets</span> </Link>
            <FaChevronRight className='text-zinc-400 text-sm' /> 
            <span className='font-bold text-[#4794d3] cursor-pointer' >Projet</span>
        </div>

        {
          loading===true? <span className='w-full text-center text-lg font-bold mt-10 text-zinc-400' >Chargement...</span> 
          : 
          (
            <div className='w-full min-w-56 bg-zinc-50 p-3 border border-gray-200 rounded-md flex flex-col gap-3 '  >
              <h2 className='text-lg md:text-xl font-bold text-center text-zinc-700 ' >{projet.projectName}</h2>
              <p className='text-gray-600 text-xs md:text-[15px] ' >{projet.projectDescription}</p>

              <div className='mt-2 text-sm text-gray-500 ml-5' >
                <p className='flex items-center gap-2' >
                  <FaUser className='text-[#2f85b6] text-sm md:text-xl ' /> Créé par : 
                  <strong className='text-sm md:text-lg' >{projet.createur?.name || "inconnue"}</strong>
                </p>

                <p className='flex items-center gap-2 my-4' >
                  <FaCalendar className='text-purple-500 text-sm md:text-xl '/> Date de création :  
                  {new Date(projet.createdAt).toLocaleDateString()}
                </p>

                <div className='flex items-center gap-2'>
                  <FaUsers className='text-blue-400 text-sm md:text-xl '/> Membres: 
                  <div className='flex flex-wrap items-center gap-4' >
                    {
                      projet.membres&& projet.membres.map((item,i) =>(
                      <div key={i} className='flex items-center gap-2' >
                        <img src={item.image || userIcon} alt="" className='w-10 h-10 object-cover rounded-full' />
                        <p key={i} className='text-black text-xs md:text-[15px]' >{item.name}, </p>
                      </div>
                      ))
                    }
                  </div>
                </div>
              </div>

              <div className='w-full flex flex-col gap-2 ' >
                <h3 className='text-gray-500 font-semibold underline text-sm md:text-lg mb-3' >Les Différents tâches du Projet</h3>

                {
                  someTaskes.length > 0&& (
                    <div className='px-3 flex gap-3 items-center justify-between text-sm font-semibold underline' >
                      <p>Nom tâche</p>
                      <span className='flex gap-5' >
                        <p>Date limite</p>
                        <p>Status</p>
                      </span>
                    </div>
                  )
                }

                <ul className='flex flex-col gap-3 w-full' >
                  { someTaskes&& someTaskes.map((item,i) =>(
                    <li key={i} className={`py-2 w-full bg-[#8ad6fa25] rounded-lg overflow-hidden border border-[#92b9cc31] relative`} >
                      {
                        <div className='px-2 w-full z-50 text-black text-sm font-semibold flex items-center gap-3 justify-between' >
                          <p className='text-xs md:text-sm' >{item.taskName}</p>
                          <div className='flex gap-5' >
                            <p className='text-xs mr-1 md:mr-6' >{parseInt(getProgessDeadLine(item.createdAt,item.deadLine))}%</p>
                            <p className='text-[10px]' >{item.deadLine? new Date(item.deadLine).toLocaleDateString() : "non défini"}</p>
                            <p className='text-xs' >{item.status}</p>
                          </div>
                       </div>
                      }
                      <div className={`h-full w-full   transition-all p-2 absolute top-0 -z-0 ${getProgessDeadLine(item.createdAt,item.deadLine)<55&& 'bg-[#23c8f167]'}
                                      ${getProgessDeadLine(item.createdAt,item.deadLine)>50 || getProgessDeadLine(item.createdAt,item.deadLine)===99.99 && 'bg-[#f1dc2367]'} 
                                      ${getProgessDeadLine(item.createdAt,item.deadLine)===100&& 'bg-[#f1232363]'} `} 
                           style={{width:`${getProgessDeadLine(item.createdAt,item.deadLine)}%`}} >
                      </div>
                    </li>
                    ))
                  } 
                </ul>
                {someTaskes.length===0&& <img src={emptyboxIcon}  className='w-20 md:w-32 mx-auto' />} {/*ça va s'afficher si il n'ya pas des tâches */}

                { showMore===true&& <button className='text-sm hover:underline font-bold text-teal-400 text-center' 
                                            onClick={()=>ShowMoreTaskByProject(projectId)} >voir plus</button>}
              </div>
            </div>
          )
        }
    </section>
  )
}

export default ProjectPage