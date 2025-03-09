import React, { useEffect, useState } from 'react'
import DashBoardCard from '../dashBoardCard/DashBoardCard'
import { MdOutlinePendingActions } from 'react-icons/md';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsCheckCircle } from 'react-icons/bs';
import { FaEye, FaProjectDiagram } from 'react-icons/fa';
import { GoProjectSymlink } from "react-icons/go";
import { TbLayoutDashboard } from "react-icons/tb";
import DashBoardChartTasks from '../dashboardChartTasks/DashBoardChartTasks';
import {Link} from 'react-router-dom'
import backendUrl from '../../../utils/backendUrl.js';

const DashHome = () => {

  const [totalProjectsCreated,setTotalProjectsCreated] = useState(0);
  const [totalProjectMembered,setTotalProjectMembered] = useState(0);
  const [totalTasksAfaire,setTotalTasksAfaire] = useState(0);
  const [totalTasksEncours,setTotalTasksEncours] = useState(0);
  const [totalTasksTermine,setTotalTasksTermine] = useState(0);
  const [dataTasks,setDataTasks] = useState({tasksByMonth:[],completedTasksByProject:[]}) //pour mes graphiques
  const [recentTasks,setRecentTasks] = useState([]) //pour contenir les tâches récentes

  useEffect(() =>{
    const fetchProjects = async() =>{
      try {
        const res = await fetch(`${backendUrl}/projet/fetchProject`,{credentials: 'include',});
        const data = await res.json();
        if(res.ok){
          setTotalProjectsCreated(data.totalProjectsCreated)
          setTotalProjectMembered(data.totalProjectMembered)
        }
      } catch (error) {
        console.log(error)
      }
    }

    const fetchTasks = async() =>{
      try {
        const res = await fetch(`${backendUrl}/task/fetchTaskforProjectsMember`,{credentials: 'include',});
        const data = await res.json();
        if(res.ok){
          setTotalTasksAfaire(data.taskStats.aFaire);
          setTotalTasksEncours(data.taskStats.EnCours);
          setTotalTasksTermine(data.taskStats.Termine);
        }
      } catch (error) {
        console.log(error)
      }
    }

    const handleFetchSomeTasks = async() =>{ //pour mes graphiques
      try {
        const res = await fetch(`${backendUrl}/task/tasksStats`,{credentials: 'include',});
        const data = await res.json();
        if(!res.ok){console.log(data.message)}
        if(res.ok){ 
          setDataTasks({tasksByMonth:data.tasksByMonth || [] ,completedTasksByProject:data.completedTasksByProject || []})
        }
      }catch (error) {
        console.log(error)
      }
    }

    const fetchRecentTasks = async() =>{
      try {
        const res = await fetch(`${backendUrl}/task/fetchTaskAndGet?limit=6`,{credentials: 'include',});
        const data = await res.json();
        if(!res.ok){console.log(data.message)}
        if(res.ok){
         setRecentTasks(data.task);
        }
      } catch (error) {
        console.log(error)
      }
    }

    handleFetchSomeTasks()
    fetchTasks()
    fetchProjects()
    fetchRecentTasks()
  },[])
  const MonthOfYears = ["Janvier","Février","Mars","Avril","Mais","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre",]

  return (
    <div className='min-h-screen bg-[#e2cffa25] w-full mx-auto px-2 py-2 md:py-3 flex flex-col gap-5' >
      <div className='flex gap-3 items-center px-2 md:px-3 text- sm:text-2xl md:text-3xl' >
        <TbLayoutDashboard className='text-blue-500' />
        <h1 className=' font-bold text-blue-400' >Tableau de bord</h1>
      </div>

      <div className='w-full flex justify-center flex-wrap gap-3 overflow-hidden text-[#fff] relative' >
        <DashBoardCard bgColorCard='#3194d6' numberTotal={totalTasksAfaire} nameCard={'Tâches à faire'} iconCard={<MdOutlinePendingActions/>} mydelay={.1} />
        <DashBoardCard bgColorCard='#e7bb4c' numberTotal={totalTasksEncours} nameCard={'Tâches en cours'} iconCard={<AiOutlineLoading3Quarters/>} mydelay={.2} />
        <DashBoardCard bgColorCard='#f35678' numberTotal={totalTasksTermine} nameCard={'Tâches Terminé'} iconCard={<BsCheckCircle/>} mydelay={.3} />
        <DashBoardCard bgColorCard='#63309e' numberTotal={totalProjectsCreated} nameCard={'Total Projets Crée'} iconCard={<FaProjectDiagram/>} mydelay={.4} />
        <DashBoardCard bgColorCard='#1d0d27' numberTotal={totalProjectMembered} nameCard={'Total Projets Participé'} iconCard={<GoProjectSymlink/>} mydelay={.6} />
      </div>

      <div className='w-full md:px-4' >
        <div className={`bg-white w-full overflow-x-auto flex flex-col md:m-auto shadow-md rounded-md`}>
          <div className='flex justify-between p-3 text-xs sm:text-sm md:text-lg font-semibold' >
            <h1 className='text-center p-2' >Tâches Récents de mes Projets</h1>
            <Link to={'tache'} ><button className={`btn bg-transparent hover:bg-gradient-to-r from-indigo-600 to-pink-600 hover:text-white hover:border-none transition-all px-2 md:px-5 lg:px-10
                border-[2px] border-pink-600 text-xs`}>
                  Voir Tout
            </button></Link>
          </div>

          <table className="table">
           
            <thead className='bg-[#7d7d7f1d]' >
              <tr className={`text-xs sm:text-sm`} >
                <th>Nom tâches</th>
                <th>Status</th>
                <th>Project Assigné</th>
                <th>Detail</th>
              </tr>
            </thead>

            <tbody> 
              {
                recentTasks && recentTasks.map((item,i) =>(
                <tr key={i}  className={`hover:bg-[#cdcbcb63] transition-all text-xs sm:text-sm md:text-lg `} >
                  
                    <td>{item.taskName}</td>
                    <td className={`${item.status==="A faire"?"text-green-500" : item.status==="En cours"? "text-yellow-600" :"text-red-500"} font-semibold`} >{item.status}</td>
                    <td>{item.projectId?.projectName}</td>
                    <td className='pl-3 md:pl-7' > <Link to={`tache/theTask/${item?._id}`} ><FaEye/></Link></td>
                  </tr>
                ))
              }      
            </tbody>
          </table>
        </div>
      </div>

      <div className='w-full overflow-hidden' >
         <DashBoardChartTasks
          IDmois={dataTasks.tasksByMonth?.map(item=>MonthOfYears[item._id - 1]) }
          taskesByMonth={dataTasks.tasksByMonth?.map((taskes) =>taskes?.count)}

          projectName={dataTasks.completedTasksByProject?.map(i=>i.projectName)}
          taskesEndByProject={dataTasks.completedTasksByProject?.map(i=>i.count)}
        />
      </div>

    </div>
  )
}

export default DashHome
