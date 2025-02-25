import React, { useEffect, useState } from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { Link,useParams } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { fetchTheProject } from '../Redux/project/projectSlice.js'
import { updateProjectFailed,updateProjectStart,updateProjectSuccess } from '../Redux/project/projectSlice.js'
import { MdAddAlert, MdClose } from 'react-icons/md'
import {ToastContainer,toast} from 'react-toastify'
import Select from 'react-select'

const UpdateProject = () => {
    const {projectId} = useParams();

    const dispatch = useDispatch();
    const {projet,error,loading} = useSelector(state => state.project)
    useEffect(()=>{ //pour fetch le project en fonction de son id
        if(projectId){
            dispatch(fetchTheProject(projectId))
        }
    },[projectId])

    //mettre à jour le project
    const [dataProject,setDataProject] = useState({});
    const handleChangedataProject = (e) =>{
        setDataProject({...dataProject , [e.target.id] : e.target.value})
    }
    const handleUpdateProject = async() =>{//pour mettre à jour le projet
        try {
            dispatch(updateProjectStart())
            const res = await fetch(`/backend/projet/updateProject/${projectId}`,{
                method:'PUT',
                headers:{
                    Accept:"application/json",
                    "Content-Type":'application/json'
                },
                body:JSON.stringify(dataProject)
            })
            const data = await res.json();
            if(!res.ok){
                dispatch(updateProjectFailed(data.message));
            }
            if(res.ok){
                toast.success(data,{
                    position:'top-center',
                    autoClose:5000,
                    draggable:true
                })
                dispatch(updateProjectSuccess());
                fetchTheProject(projectId);
            }
        } catch (error) {
            dispatch(updateProjectFailed(error));
        }
    }

    const [allUser,setAllUser] = useState([]);
    const [selectedUser,setSelectedUser] = useState(null);
    const fetchUsers = async(query = "") =>{ //pour fetch tout les users de la bdd
        try {
            const res = await fetch(`/backend/auth/allUser?searchTerm=${query}&limit=7`)
            const data = await res.json();
            if(res.ok){
                const formattedData = data.map((item) =>({
                    value:item._id, //ici label et value sont use dans react-select dans la suggestion label sera visible
                    label:item.email
                }))
                console.log(data)
                setAllUser(formattedData)
            }
        } catch (error) {
            console.log(error)
        }
    }
   
    useEffect(() =>{
        fetchUsers();
    },[])

    const handleAddMember = async() =>{ //pour l'ajout du membre
        if(!selectedUser){
            toast.error("Vous devez selectionner un utilisateur",{
                position:'top-center',
                autoClose:3000,
                draggable:true
            })
            return;
        }

        try {
            const res = await fetch(`/backend/projet/addMember/${projectId}`,{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({"email":selectedUser.label})
            })
            const data = await res.json();
            if(!res.ok){
                toast.error(data.message,{
                    position:'top-center',
                    autoClose:5000,
                    draggable:true
                })
            }
            if(res.ok){
                toast.success(data,{
                    position:'top-center',
                    autoClose:5000,
                    draggable:true
                })
                dispatch(fetchTheProject(projectId))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTheMember = async(projectId,memberId) =>{
        try {
            const res = await fetch(`/backend/projet/deleteMember/${projectId}/${memberId}`,{
                method:"POST",
                headers:{Accept:"application/json"}
            })
            const data = await res.json()
            if(!res.ok){console.log(data.message)}
            if(res.ok){
                toast.success(data,{autoClose:3000,draggable:true,position:'top-center'}) 
                dispatch(fetchTheProject(projectId))
            }
        } catch (error) {console.log(error)}
    }
 
  return (
    <section className='max-w-[93em] w-full mx-auto flex flex-col gap-4 px-2 sm:px-5 md:px-10 py-3 overflow-hidden ' >
        <div className='flex items-center gap-2 text-sm md:text-lg' >
            <Link to={'..'} ><span className='text-zinc-500 cursor-pointer' >Mes Projets</span> </Link>
            <FaChevronRight className='text-zinc-400 text-sm' /> 
            <span className='font-bold text-[#4794d3] cursor-pointer' >Mettre à jour Projet</span>
        </div>

        <div className='flex flex-col lg:flex-row gap-5' >
            <div className='flex-1 max-w-2xl bg-zinc-50 p-4 md:p-7 flex flex-col gap-5' >
                <div className='relative' >
                    <p className='text-sm font-semibold text-gray-500' >Nom projet</p>
                    <input type="text" placeholder='Entrez le nom du projet' id='projectName' defaultValue={projet.projectName}
                            onChange={handleChangedataProject}
                            className={`w-full py-2 pl-3 bg-[#d4d4d42c] text-xs sm:text-sm border border-zinc-200 outline-1 outline-[#4794d386] `}
                    />
                </div>

                <div>
                    <p className='text-sm font-semibold text-gray-500' >Description</p>
                    <textarea className='w-full h-40 p-3 bg-[#d4d4d42c] border border-zinc-200 outline-[#4794d386] text-xs sm:text-sm' 
                              placeholder='Rédiger la description du projet' id='projectDescription' defaultValue={projet.projectDescription}
                              onChange={handleChangedataProject}
                    ></textarea>
                </div>

                <button type='button' className='btn btn-sm md:btn-md bg-transparent hover:bg-[#3974ac] text-[#3974ac] hover:text-white hover:border-none transition-all
                    border-[2px] border-[#3974ac] ' onClick={handleUpdateProject} disabled={loading&& true} >
                    {
                        loading? "En attente..."  : "Mettre à jour"
                    }
                </button>

                { error&& ( <p className='alert alert-error text-white flex items-center gap-3 p-1 px-3 text-sm rounded-full' >
                    <MdAddAlert className='text-lg' /> {error}</p>
                )}

                <div className='w-full mt-4 flex flex-col gap-2' >
                    <h2 className='text-sm md:text-lg font-semibold text-zinc-500 underline' >Les membres du projets</h2>
                    <ul className='flex flex-col' >
                        {projet.membres&& projet.membres.slice(1).map((membre,i) =>( //je prends tout les membres en commençant par l'indice 1 car le 0 c'est le créateur du projet
                            <li key={i} className='flex items-center justify-between h-14 hover:bg-zinc-200 duration-150 px-5 rounded-lg' >
                                <div className='flex items-center gap-5' >
                                    <img src={membre?.image} alt="" className='w-10 h-10 rounded-full object-cover' />
                                    <p className='text-sm' >{membre.name}</p>
                                </div>
                                <MdClose className='text-lg cursor-pointer hover:text-red-600 duration-150' onClick={() =>deleteTheMember(projectId, membre._id)} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>


            <div className='flex-1 max-w-2xl max-h-56 bg-zinc-50 p-10 flex flex-col gap-5' >
                <div className='relative' >
                    <p className='text-sm font-semibold text-gray-500' >Email du nouveau membre que vous voulez ajouter</p>
                    <Select 
                        options={allUser}
                        value={selectedUser}
                        onChange={setSelectedUser}
                        placeholder="Sélectionner un utilisateur"
                        onInputChange={(value) =>{
                            fetchUsers(value)
                        }}
                        noOptionsMessage={() =>"Aucun utilisateur trouvé"}
                    />
                </div>
                <button type='button' className='btn btn-sm md:btn-md bg-transparent hover:bg-[#9c45be] text-[#9c45be] hover:text-white hover:border-none transition-all
                        border-[2px] border-[#9c45be]' onClick={handleAddMember} >
                        Ajouter membre
                    </button>
                </div>
        </div>
        <ToastContainer/>
    </section>
  )
}

export default UpdateProject
