import React, { useState } from 'react'
import "./CSS/addProjet.css"
import { FaChevronRight } from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { HiX } from 'react-icons/hi'
import { MdAddAlert } from 'react-icons/md'
 import {ToastContainer,toast} from  'react-toastify'
 import 'react-toastify/dist/ReactToastify.css';
 import backendUrl from '../utils/backendUrl.js'

const AddProject = () => {

  const [projectData,setProjectData] = useState({
    projectName:"",
    projectDescription:""
  })
  const handleChange = (e) =>{
    setProjectData({...projectData, [e.target.name]: e.target.value})
  }

  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);

  const HandleCreateProjet = async(e) =>{
    e.preventDefault();

    if(projectData.projectName==="" || !projectData.projectName){
      setLoading(false);
      setError("Le champ nom projet est obligatoire!")
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${backendUrl}/projet/addProject`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(projectData),
        credentials: 'include',
      })
      const data = await res.json();
      if(!res.ok){
        setLoading(false);
        setError(data.message)
      }
      if(res.ok){
        setLoading(false);
        toast.success(data,{
          position:'top-center',
          autoClose:5000,
          draggable:true
        })
        console.log(data)
        setProjectData({ projectName:"", projectDescription:"" })
      }
    } catch (error) {
      setLoading(false);
      setError(error)
    }
  }

  return (
    <section className='w-full ' >
      <div className='max-w-6xl w-full px-2 sm:px-4 md:px-10 py-3 mx-auto flex flex-col gap-4 overflow-hidden' >
        <div className='flex items-center gap-2 text-sm md:text-lg' >
          <Link to={'..'} ><span className='text-zinc-500 cursor-pointer' >Mes Projets</span> </Link>
          <FaChevronRight className='text-zinc-400 text-sm' /> 
          <span className='font-bold text-[#4794d3] cursor-pointer' >Création projet</span>
        </div>

        <form className='w-full bg-zinc-50 p-3 sm:p-5 md:p-10 flex flex-col gap-5 addProjetContainer' onSubmit={HandleCreateProjet} >
          <div className='relative flex flex-wrap md:flex-nowrap' >
            <p>Nom projet</p>
            <input type="text" placeholder='Entrez le nom du projet' 
                  className={`w-full py-2 pl-3 bg-[#d4d4d42c] border border-zinc-200 outline-1 outline-[#4794d386] text-sm md:text-lg `}
                  name="projectName" value={projectData.projectName} onChange={handleChange}
            />
            { projectData.projectName&& <HiX className='absolute right-2 top-10 md:top-3 text-lg text-zinc-500 cursor-pointer'
              onClick={() => setProjectData({...projectData,projectName:""})} /> }
          </div>

          <div className='flex flex-wrap md:flex-nowrap' >
            <p>Description</p>
            <textarea className='w-full h-40 p-3 bg-[#d4d4d42c] border border-zinc-200 outline-[#4794d386] text-sm md:text-lg' 
                      placeholder='Rédiger la description du projet' 
                      name="projectDescription" value={projectData.projectDescription} onChange={handleChange}
            ></textarea>
          </div>

          <button type='submit' className='btn bg-transparent hover:bg-[#3974ac] text-[#3974ac] hover:text-white hover:border-none transition-all
              border-[2px] border-[#3974ac] ' disabled={loading===true&&true} >
            {
              loading===true? "En attent..." : "Créer le projet"
            }
          </button>

          { error&& ( <p className='alert alert-error text-white flex items-center gap-3 p-1 px-3 text-sm rounded-full' >
                      <MdAddAlert className='text-lg' /> {error}</p>
          )}
        </form>
      </div>
      <ToastContainer/>
    </section>
  )
}

export default AddProject
