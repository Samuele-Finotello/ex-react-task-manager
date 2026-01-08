import { useState, useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"
import TaskRow from "../components/TaskRow"

export default function TaskList() {

  const { tasks } = useContext(GlobalContext)
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState(1)

  return (
    <>
      <div className="title-page">
        <h1>Lista Tasks</h1>
      </div>
      <div className="table-task">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Stato</th>
              <th>Data di Creazione</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => {
              return (
                <TaskRow key={task.id} task={task} />
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}