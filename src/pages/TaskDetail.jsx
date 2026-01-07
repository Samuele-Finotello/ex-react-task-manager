import { useParams, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"

export default function TaskDetail() {

  const { id } = useParams()
  const { tasks, removeTask } = useContext(GlobalContext)
  const navigate = useNavigate()

  const task = tasks.find(t => t.id === parseInt(id))

  if (!task) {
    return (
      <h1 className="title-page">Task non trovata</h1>
    )
  }

  const handleDelete = async () => {
    try {
      await removeTask(task.id)
      alert('Task eliminata con successo')
      navigate('/list')
    } catch (error) {
      alert(error.message)
    }

    console.log('Task', task.id, 'eliminata')
  }

  return (
    <>
      <h1 className="title-page">Dettaglio Task {task.id}</h1>
      <div className="detail-page">
        <p><strong>Nome: </strong>{task.title}</p>
        <p><strong>Descrizione: </strong>{task.description}</p>
        <p><strong>Stato: </strong>{task.status}</p>
        <p><strong>Data di Creazione: </strong>{new Date(task.createdAt).toLocaleDateString()}</p>
        <button onClick={handleDelete}>Elimina Task</button>
      </div>
    </>
  )
}