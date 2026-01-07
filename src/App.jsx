import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom"
import AddTask from "./pages/AddTask"
import TaskList from "./pages/TaskList"
import HomePage from "./pages/HomePage"
import TaskDetail from "./pages/TaskDetail"
import { GlobalProvider } from "./context/GlobalContext"

function App() {


  return (
    <GlobalProvider>
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
          <Route path="/task/:id" element={<TaskDetail />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
