import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import frLocale from "@fullcalendar/core/locales/fr"
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import Select from 'react-select';

const theStyle = { //pour styliser le Select
  control: (provided) => ({
    ...provided,
    backgroundColor: "#dccaec27",
    border: "1px solid #32b5dd9c",
    borderRadius:"6px",
    padding: '2px 0 2px 3px',
    fontSize:"13px",
    width:'100%',
    minWidth:'200px',
  })
}

const DashCalendar = () => {

  const [allProject,setAllProject] = useState([]); //pour contenir les project
  const [projectSelected,setProjectSelected] = useState(null); //pour contenir le projet selectionner

  const [taskes,setTaskes] = useState([]); //va contenir les taches à afficher

  const fetchTaskes = async()=>{  //va fetch les tâches des projets dont je suis membre
    try {
      const res = await fetch("/backend/task/fetchTaskforProjectsMember");
      const data = await res.json();
      if(res.ok){
        setTaskes(data.taskesAssigned);
      }
    } catch (error) {
      console.log(error)}
  }
  useEffect(() =>{ fetchTaskes() },[]) //j'éxecute la fonction "fetchTaskes"
  
  const fetchSomeProjects = async(searchValue) =>{ //pour fetch les projects dont je suis membre
    try {
      const res = await fetch(`/backend/projet/fetchProject?searchTerm=${searchValue}`);
      const data = await res.json();
      if(!res.ok){console.log(data.message)}
      if(res.ok){
        const formattedData = data.projectParticipated.map((item) =>({
          value:item._id,
          label:item.projectName
        }))
        setAllProject(formattedData);
      }
    } catch (error) { console.log(error)}
  }

  const takeTaskesOfProjectFinded = async() =>{ //pour prendre les tâches d'un projet spécifique dont je suis membre
    if(!projectSelected){ fetchTaskes() } //si pas de projectSelected alors on remet tout les tâches des projets dont je suis membre
    try {
      const res = await fetch(`/backend/task/fetchTaskesForProjectWithoutLimit/${projectSelected?.value}`);
      const data = await res.json();
      if(!res.ok){ console.log(data.message)};
      if(res.ok){ setTaskes(data) }
    } catch (error) { console.log(error)}
  }
  useEffect(() =>{ takeTaskesOfProjectFinded(); },[projectSelected]) //s'éxecutera si il ya modification de projectSelected 

  //Transformer les tâches en formant "fullcalendar" pour l'afficher
  const formattedTaskes = taskes&& taskes.map((task) =>({
    id:task._id,
    title:task.taskName,
    start:task.createdAt,
    end:task.deadLine || task.createdAt,
    backgroundColor:  task.status==="A faire" ? "#205d8f" : task.status==="En cours"? "#79a01e" : "#d44c44",
    borderColor: "transparent"
  }))

  //changement des vues du calendrier
  const [view,setView] = useState('dayGridMonth');
  const calendarRef = useRef(null);
  const handleChangeView = (event) =>{
    const newView = event.target.value;
    setView(newView);
    if(calendarRef.current){
      calendarRef.current.getApi().changeView(newView)
  }}

  return (
    <div className='w-full h-screen overflow-hidden mx-auto px-3 md:px-5 my-3 flex flex-col gap-5' >
      <div className='flex items-center justify-between gap-5 w-full z-50 flex-wrap' >
        <p className='text-xs sm:text-sm md:text-lg text-blue-500 font-semibold' >Mon Calendrier</p>

        <div className='flex items-center flex-wrap gap-2' >
          <Select styles={theStyle} placeholder="Rechercher vos projets"
                  options={allProject}
                  value={projectSelected}
                  onChange={setProjectSelected}
                  onInputChange={(value) =>{
                    fetchSomeProjects(value)
                  }}  
                  noOptionsMessage={() =>"Pas de projet"} 
                  isClearable
          />

          <select value={view} onChange={handleChangeView} className='text-sm bg-transparent font-medium outline-none border-none' >
              <option value="dayGridMonth">Mois</option>
              <option value="timeGridWeek">Semaine</option>
              <option value="timeGridDay">Jour</option>
              <option value="listWeek">Liste par Semaine</option>
              <option value="listMonth">Liste par Mois </option>
              <option value="listDay">Liste par Jour </option>
          </select>
        </div>
      </div>
      
      <FullCalendar
        ref={calendarRef} //va permettre de changer des vues
        locale={frLocale}
        plugins={[dayGridPlugin,listPlugin,timeGridPlugin]}
        initialView={view}
        events={formattedTaskes}
      />
      <p className='text-[#d44c44] ' ></p>
    </div>
    
  )
}

export default DashCalendar