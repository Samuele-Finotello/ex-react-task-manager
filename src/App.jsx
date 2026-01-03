import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom"
import AddTask from "./pages/AddTask"
import TaskList from "./pages/TaskList"
import HomePage from "./pages/HomePage"

function App() {


  return (
    <BrowserRouter>
      <header>
        <div></div>
        <nav>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/list'>Lista</NavLink>
          <NavLink to='/add'>Aggiungi</NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<TaskList />} />
        <Route path="/add" element={<AddTask />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
