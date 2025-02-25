import React from 'react'
import {Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement,CategoryScale, LinearScale} from "chart.js"
import { Bar, Pie } from 'react-chartjs-2';
import './dashboardChartTask.css'

const DashBoardChartTasks = ({IDmois,taskesByMonth,projectName,taskesEndByProject}) => {

  ChartJS.register(ArcElement,Tooltip,Legend, BarElement,CategoryScale,LinearScale);

  const tasksByMonthDatas = {
    labels: IDmois,
    datasets: [{
      label: "Tâches créées par mois",
      data: taskesByMonth,
      backgroundColor: "#3194d6"
    }]
  }

  const taskFinishByProject = {
    labels:projectName,
    datasets:[{
      label:"Taches terminées par projet",
      data: taskesEndByProject,
      backgroundColor: "#63309e"
    }]
  }

  const options = {responsive:true,maintainAspectRation:false}

  return (
    <div className='flex flex-wrap gap-5 justify-center items-center chart_container' >
      <div><Bar data={taskFinishByProject} options={options} /></div>
      <div><Bar data={tasksByMonthDatas} options={options}  /></div>
    </div>
  )
}

export default DashBoardChartTasks
