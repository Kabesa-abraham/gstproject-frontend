import DashHome from "./components/DashBoardComponent/dashHome/DashHome"
import DashProjet from "./components/DashBoardComponent/dashProjet/DashProjet"
import DashBoard from "./pages/DashBoard"
import Presentation from "./pages/Presentation"
import {Routes,Route} from 'react-router-dom'
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import DashTache from "./components/DashBoardComponent/dashTache/DashTache"
import DashProfile from "./components/DashBoardComponent/dashProfile/DashProfile"
import AddProject from "./pages/AddProject"
import UpdateProject from "./pages/UpdateProject"
import ProjectPage from "./pages/ProjectPage"
import AddTache from "./pages/AddTache"
import UpdateTache from "./pages/UpdateTache"
import TachePage from "./pages/TachePage"
import DashCalendar from "./components/DashBoardComponent/dashCalendar/DashCalendar"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

function App(){

  const {currentUser} = useSelector(state=> state.user); //pour avoir le user actuellement connecté

  return (
    <div>
      <Routes>
        <Route path="/presentation" element={currentUser ? <Navigate to="/"/> : <Presentation/> } />
        
        <Route path="/" element={currentUser ?<DashBoard/>: <Navigate to="/presentation"/>} >
          <Route index element={<DashHome/>} />
          
          <Route path="projet">
            <Route index  element={<DashProjet/>} />
            <Route path="addProject" element={<AddProject/>} />
            <Route path="updateProject/:projectId" element={<UpdateProject/>} />
            <Route path="theProject/:projectId" element={<ProjectPage/>} />
          </Route>

          <Route path="calendar" >
            <Route index element={<DashCalendar/>} />
          </Route>

          <Route path="tache" >
            <Route index element={<DashTache/>} />
            <Route path="addTache" element={<AddTache/>} />
            <Route path="updateTache/:tacheId" element={<UpdateTache/>} />
            <Route path="theTask/:tacheId" element={<TachePage/>} />
          </Route>

          <Route path="profile" element={<DashProfile/>} />
          
        </Route>

        <Route path="/signIn" element={<SignIn/>} />
        <Route path="/signUp" element={<SignUp/>} />
      </Routes>
    </div>
  )
}

export default App