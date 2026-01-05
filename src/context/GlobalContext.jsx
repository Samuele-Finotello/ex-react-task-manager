import { createContext } from "react";
import useTasks from "../hooks/useTasks";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {

  const taskData = useTasks()

  return (
    // così abbiamo accessibile la value a qualsiasi componente che si trova all'interno del provider
    <GlobalContext.Provider value={{ ...taskData }}>
      {children}
    </GlobalContext.Provider>
  )
}