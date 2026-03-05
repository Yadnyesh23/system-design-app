import { Routes, Route } from "react-router-dom"
import ScenarioList from "./pages/ScenarioList"
import Simulator from "./pages/Simulator"

function App() {

  return (

    <Routes>

      <Route path="/" element={<ScenarioList />} />

      <Route path="/simulate/:id" element={<Simulator />} />

    </Routes>

  )
}

export default App