import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"

export default function TaskList() {

  const { tasks } = useContext(GlobalContext)

  console.log(tasks)

  return (
    <div className="title-page">
      <h1>Lista Tasks</h1>
    </div>
  )
}