import { createContext, useState, useEffect } from "react";
const { API_URL } = import.meta.env

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetch(`${API_URL}/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(error => console.error(error))
  }, [])

  return (
    // così abbiamo accessibile la value a qualsiasi componente che si trova all'interno del provider
    <GlobalContext.Provider value={{ tasks, setTasks }}>
      {children}
    </GlobalContext.Provider>
  )
}