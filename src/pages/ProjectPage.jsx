import React, { useEffect } from 'react'
import { FaCalendar, FaChevronRight, FaUsers } from 'react-icons/fa'
import { Link,useParams } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import { fetchTheProject } from '../Redux/project/projectSlice.js'
import {FaUser} from 'react-icons/fa'
import userIcon from '../components/Assets/img13.png'

const ProjectPage = () => {
  const {projectId} = useParams();

  const dispatch = useDispatch();
  const {projet,loading} = useSelector(state => state.project)
  useEffect(()=>{
      if(projectId){
          dispatch(fetchTheProject(projectId))
      }
  },[projectId])

  return (
    <section className='max-w-[93em] w-full mx-auto flex flex-col gap-4 px-5 md:px-10 py-4 overflow-hidden ' >
        <div className='flex items-center gap-2 text-xl' >
            <Link to={'..'} ><span className='text-zinc-500 cursor-pointer' >Mes Projets</span> </Link>
            <FaChevronRight className='text-zinc-400 text-sm' /> 
            <span className='font-bold text-[#4794d3] cursor-pointer' >Projet</span>
        </div>

        {
          loading===true? <span className='w-full text-center text-lg font-bold mt-10 text-zinc-400' >Chargement...</span> : (
            <div className='max-w-3xl bg-zinc-50 p-3 border border-gray-300 flex flex-col gap-3 '  >
              <h2 className='text-xl font-bold text-center text-zinc-700 ' >{projet.projectName}</h2>
              <p className='text-gray-600 text-[15px] ' >{projet.projectDescription}</p>

              <div className='mt-2 text-sm text-gray-500 ml-5' >
                <p className='flex items-center gap-2' >
                  <FaUser className='text-[#2f85b6] text-xl ' /> Créé par : 
                  <strong className='text-lg' >{projet.createur?.name || "inconnue"}</strong>
                </p>

                <p className='flex items-center gap-2 my-4' >
                  <FaCalendar className='text-purple-500 text-xl '/> Date de création :  
                  {new Date(projet.createdAt).toLocaleDateString()}
                </p>

                <div className='flex items-center gap-2'>
                  <FaUsers className='text-blue-400 text-xl '/> Membres : 
                  <div className='flex flex-wrap items-center gap-2' >
                    {
                      projet.membres&& projet.membres.map((item,i) =>(
                      <div className='flex items-center gap-2' >
                        <img src={item.image || userIcon} alt="" className='w-11 h-11 object-cover rounded-full' />
                        <p key={i} className='text-black text-[15px]' >{item.name}, </p>
                      </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          )
        }
    </section>
  )
}

export default ProjectPage
