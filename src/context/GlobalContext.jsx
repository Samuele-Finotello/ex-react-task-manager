import { createContext, useState } from "react";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {

  const [tasks, setTasks] = useState([])

  return (
    // così abbiamo accessibile la value a qualsiasi componente che si trova all'interno del provider
    <GlobalContext.Provider value={{ tasks, setTasks }}>
      {children}
    </GlobalContext.Provider>
  )
}