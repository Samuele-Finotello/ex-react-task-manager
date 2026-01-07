import { useState, useRef, useMemo } from "react"

export default function AddTask() {

  const [taskTitle, setTaskTitle] = useState('')
  const descriptionRef = useRef()
  const statusRef = useRef()

  const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

  const checkTitle = useMemo(() => {
    if (!taskTitle.trim()) {
      return 'Il titolo non può essere vuoto'
    }
    if ([...taskTitle].some(char => symbols.includes(char))) {
      return 'Il titolo non può contenere simboli speciali'
    }
    return '';
  }, [taskTitle])

  const handleSubmit = e => {
    e.preventDefault();

    if (checkTitle !== '') return;

    const newTask = {
      title: taskTitle.trim(),
      description: descriptionRef.current.value,
      status: statusRef.current.value
    }

    setTaskTitle('');
    descriptionRef.current.value = '';
    statusRef.current.value = 'To do';

    console.log(`Task aggiunta: `, newTask)
  }

  return (
    <div className="title-page">
      <h1>Aggiungi Task</h1>
      <form id="add-task" onSubmit={handleSubmit}>
        <label>
          <h3>Nome Task</h3>
          <input className="wd-400" type="text" value={taskTitle} onChange={e => setTaskTitle(e.target.value)} placeholder="Aggiungi Task" />
          {checkTitle.length > 0 ? <p style={{ color: 'red' }}>{checkTitle}</p> : <p style={{ color: 'green' }}>Il titolo è valido</p>}
        </label>
        <label>
          <h3>Descrizione</h3>
          <textarea className="wd-400 h-100" ref={descriptionRef} placeholder="Inserisci descrizione Task" />
        </label>
        <label>
          <h3>Stato</h3>
          <select className="wd-150" ref={statusRef} defaultValue={'To do'}>
            {['To do', 'Doing', 'Done'].map((value, i) => (
              <option key={i} value={value}>{value}</option>
            ))}
          </select>
        </label>
        <button type="submit" className="wd-150" disabled={checkTitle}>Aggiungi Task</button>
      </form>
    </div>
  )
}