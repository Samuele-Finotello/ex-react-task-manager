import { useState, useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"
import TaskRow from "../components/TaskRow"

export default function TaskList() {

  const { tasks } = useContext(GlobalContext)
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState(1)

  const handleSort = field => {
    if (sortBy === field) {
      setSortOrder(prev => prev * -1)
    }
    else {
      setSortBy(field)
      setSortOrder(1)
    }
  }

  const sortIcon = sortOrder === 1 ? '⮟' : '⮝'

  return (
    <>
      <div className="title-page">
        <h1>Lista Tasks</h1>
      </div>
      <div className="table-task">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('title')} >Nome {sortBy === 'title' && sortIcon}</th>
              <th onClick={() => handleSort('status')} >Stato {sortBy === 'status' && sortIcon}</th>
              <th onClick={() => handleSort('createdAt')} >Data di Creazione {sortBy === 'createdAt' && sortIcon}</th>
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