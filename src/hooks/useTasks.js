import { useState, useEffect } from "react";
const { VITE_API_URL } = import.meta.env

export default function useTasks() {

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetch(`${VITE_API_URL}/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(error => console.error(error))
  }, [])

  const addTask = async newTask => {
    const response = await fetch(`${VITE_API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    })
    const { success, message, task } = await response.json()

    if (!success) throw new Error(message)

    setTasks(prev => [...prev, task])
  }

  const removeTask = async id => {
    const response = await fetch(`${VITE_API_URL}/tasks/${id}`, {
      method: 'DELETE'
    })
    const { success, message } = await response.json()

    if (!success) throw new Error(message)

    setTasks(prev => prev.filter(task => task.id !== id))
  }

  const removeMultipleTasks = async taskIds => {
    const deleteRequests = taskIds.map(taskId => {
      fetch(`${VITE_API_URL}/tasks/${taskId}`, {
        method: 'DELETE'
      })
        .then(res => res.json())
    })

    const results = await Promise.allSettled(deleteRequests)

    const fullFilledDeletions = [];
    const rejectedDeletions = [];

    results.forEach((result, index) => {
      const taskId = taskIds[index]

      if (result.status === 'fullfilled' && result.value.success) {
        fullFilledDeletions.push(taskId)
      }
      else {
        rejectedDeletions.push(taskId)
      }
    })

    if (fullFilledDeletions.length > 0) {
      setTasks(prev => prev.filter(t => {
        !fullFilledDeletions.includes(t.id)
      }))
    }

    if (rejectedDeletions.length > 0) {
      throw new Error(`Errore nell'eliminazione delle task con id: ${rejectedDeletions.join(', ')}`)
    }
  }

  const updateTask = async updatedTask => {
    const response = await fetch(`${VITE_API_URL}/tasks/${updatedTask.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask)
    })
    const { success, message, task } = await response.json()

    if (!success) throw new Error(message)

    setTasks(prev => prev.map(oldTask => oldTask.id === task.id ? task : oldTask))
  }

  return { tasks, addTask, removeTask, removeMultipleTasks, updateTask }
}