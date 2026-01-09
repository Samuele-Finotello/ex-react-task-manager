import { useState, useContext, useMemo } from "react"
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

  const sortedTask = useMemo(() => {
    return [...tasks].sort((a, b) => {
      let comparison;

      if (sortBy === 'title') {
        comparison = a.title.localeCompare(b.title)
      }
      else if (sortBy === 'status') {
        const statusOptions = ['To do', 'Doing', 'Done'];
        const statusA = statusOptions.indexOf(a.status);
        const statusB = statusOptions.indexOf(b.status);
        comparison = statusA - statusB;
      }
      else if (sortBy === 'createdAt') {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        comparison = dateA - dateB;
      }

      return comparison * sortOrder;
    })
  }, [tasks, sortBy, sortOrder])

  const sortIcon = sortOrder === 1 ? '⮟' : '⮝';

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
            {sortedTask.map(task => {
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