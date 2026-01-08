import { useState, useRef } from "react";
import Modal from "./Modal";

export default function EditTaskModal({ show, onClose, task, onSave }) {
  const [editedTask, setEditedTask] = useState(task)
  const editFormRef = useRef()

  const changeEditedTask = (key, event) => {
    setEditedTask(prev => ({ ...prev, [key]: event.target.value }))
  }

  const handleSubmit = e => {
    e.preventDefault()

    onSave(editedTask)
  }

  const { title, description, status } = editedTask;

  return (
    <Modal
      title='Modifica Task'
      content={
        <form className="add-task" ref={editFormRef} onSubmit={handleSubmit} >
          <label>
            <h3>Nome Task</h3>
            <input className="wd-400"
              type="text"
              value={title}
              onChange={e => changeEditedTask('title', e)}
            />
          </label>
          <label>
            <h3>Descrizione</h3>
            <textarea className="wd-400 h-100"
              value={description}
              onChange={e => changeEditedTask('description', e)}
            />
          </label>
          <label>
            <h3>Stato</h3>
            <select className="wd-150"
              value={status}
              onChange={e => changeEditedTask('status', e)}
            >
              {['To do', 'Doing', 'Done'].map((value, i) => (
                <option key={i} value={value}>{value}</option>
              ))}
            </select>
          </label>
        </form>
      }
      confirmText='Salva'
      show={show}
      onClose={onClose}
      onConfirm={() => editFormRef.current.requestSubmit()}
    />
  )
}