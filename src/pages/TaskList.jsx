import { useState, useContext, useMemo, useCallback } from "react"
import { GlobalContext } from "../context/GlobalContext"
import TaskRow from "../components/TaskRow"

function debounce(callback, delay) {
  let timer;

  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value)
    }, delay)
  }
}

export default function TaskList() {

  const { tasks, removeMultipleTasks } = useContext(GlobalContext)
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTaskIds, setSelectedTaskIds] = useState([])

  const debouncedSetSearchQuery = useCallback(debounce(setSearchQuery, 500), [])

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
    return tasks
      .filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
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
  }, [tasks, sortBy, sortOrder, searchQuery])

  const sortIcon = sortOrder === 1 ? '⮟' : '⮝';

  const toggleSelection = taskId => {
    if (selectedTaskIds.includes(taskId)) {
      setSelectedTaskIds(prev => prev.filter(id => id !== taskId))
    }
    else {
      setSelectedTaskIds(prev => [...prev, taskId])
    }
  }

  const handleDeleteSelected = async () => {
    try {
      await removeMultipleTasks(selectedTaskIds)
      alert('Task eliminate con successo')
      setSelectedTaskIds([])
    } catch (error) {
      console.error(error)
      alert(error.message)
    }
  }

  return (
    <>
      <div className="title-page">
        <h1>Lista Tasks</h1>
        <input
          type="text"
          placeholder="Cerca..."
          onChange={e => debouncedSetSearchQuery(e.target.value)}
        />
      </div>
      {sortedTask.length === 0 ? <h2 className="title-page">Nessuna Task trovata</h2> :
        <div className="table-task">
          <div>{selectedTaskIds.length > 0 && (
            <button onClick={handleDeleteSelected}>Elimina Task selezionate</button>
          )}</div>
          <table>
            <thead>
              <tr>
                <th></th>
                <th onClick={() => handleSort('title')} >Nome {sortBy === 'title' && sortIcon}</th>
                <th onClick={() => handleSort('status')} >Stato {sortBy === 'status' && sortIcon}</th>
                <th onClick={() => handleSort('createdAt')} >Data di Creazione {sortBy === 'createdAt' && sortIcon}</th>
              </tr>
            </thead>
            <tbody>
              {sortedTask.map(task => {
                return (
                  <TaskRow
                    key={task.id}
                    task={task}
                    checked={selectedTaskIds.includes(task.id)}
                    onToggle={toggleSelection}
                  />
                )
              })}
            </tbody>
          </table>
        </div>
      }
    </>
  )
}