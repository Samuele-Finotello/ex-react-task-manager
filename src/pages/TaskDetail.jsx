import { useParams, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { GlobalContext } from "../context/GlobalContext"
import Modal from "../components/Modal"
import EditTaskModal from "../components/EditTaskModal"

export default function TaskDetail() {

  const { id } = useParams()
  const { tasks, removeTask, updateTask } = useContext(GlobalContext)
  const navigate = useNavigate()
  const [showDelete, setShowDelete] = useState(false)
  const [showEdit, setShowEdit] = useState(false)

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
      console.error(error)
      alert(error.message)
    }
  }

  const handleUpdate = async updatedTask => {
    try {
      await updateTask(updatedTask)
      alert('Task modificata con successo')
      setShowEdit(false)
    } catch (error) {
      console.error(error)
      alert(error.message)
    }
  }

  return (
    <>
      <h1 className="title-page">Dettaglio Task {task.id}</h1>
      <div className="detail-page">
        <p><strong>Nome: </strong>{task.title}</p>
        <p><strong>Descrizione: </strong>{task.description}</p>
        <p><strong>Stato: </strong>{task.status}</p>
        <p><strong>Data di Creazione: </strong>{new Date(task.createdAt).toLocaleDateString()}</p>
        <button className="me-10" onClick={() => setShowDelete(true)}>Elimina Task</button>
        <button className="ms-10" onClick={() => setShowEdit(true)}>Modifica Task</button>
        <Modal
          title='Elimina Task'
          content='Sicuro di voler eliminare questa task?'
          show={showDelete}
          onClose={() => setShowDelete(false)}
          onConfirm={handleDelete}
          confirmText="Elimina"
        />

        <EditTaskModal
          show={showEdit}
          onClose={() => setShowEdit(false)}
          task={task}
          onSave={handleUpdate}
        />
      </div>
    </>
  )
}