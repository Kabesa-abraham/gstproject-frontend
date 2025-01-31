import DashHome from "./components/DashBoardComponent/dashHome/DashHome"
import DashProjet from "./components/DashBoardComponent/dashProjet/DashProjet"
import DashSetting from "./components/DashBoardComponent/dashSetting/DashSetting"
import DashBoard from "./pages/DashBoard"
import Presentation from "./pages/Presentation"
import {Routes,Route} from 'react-router-dom'
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"

function App(){
  return (
    <div>
      <Routes>
        <Route path="/presentation" element={<Presentation/>} />
        
        <Route path="/" element={<DashBoard/>} >
          <Route index element={<DashHome/>} />
          <Route path="projet" element={<DashProjet/>} />
          <Route path="setting" element={<DashSetting/>} />
        </Route>

        <Route path="/signIn" element={<SignIn/>} />
        <Route path="/signUp" element={<SignUp/>} />
      </Routes>
    </div>
  )
}

export default App