import { Route, Routes } from "react-router-dom"
import Login from "../components/login"
import Panel from "../components/panel"
import Register from "../components/register"
const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>

      <Route path="/panel" element={<Panel/>}/>
    </Routes>
  )
}

export default Routing