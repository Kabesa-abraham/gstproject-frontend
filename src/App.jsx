import DashHome from "./components/DashBoardComponent/dashHome/DashHome"
import DashProjet from "./components/DashBoardComponent/dashProjet/DashProjet"
import DashSetting from "./components/DashBoardComponent/dashSetting/DashSetting"
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

function App(){
  return (
    <div>
      <Routes>
        <Route path="/presentation" element={<Presentation/>} />
        
        <Route path="/" element={<DashBoard/>} >
          <Route index element={<DashHome/>} />
          
          <Route path="projet">
            <Route index  element={<DashProjet/>} />
            <Route path="addProject" element={<AddProject/>} />
            <Route path="updateProject/:projectId" element={<UpdateProject/>} />
            <Route path="theProject/:projectId" element={<ProjectPage/>} />
          </Route>

          <Route path="setting" element={<DashSetting/>} />

          <Route path="tache" element={<DashTache/>} />

          <Route path="profile" element={<DashProfile/>} />
        </Route>

        <Route path="/signIn" element={<SignIn/>} />
        <Route path="/signUp" element={<SignUp/>} />
      </Routes>
    </div>
  )
}

export default App