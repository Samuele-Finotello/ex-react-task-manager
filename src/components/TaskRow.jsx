import { memo } from "react"
import { Link } from "react-router-dom"

const TaskRow = memo(({ task, checked, onToggle }) => {

  const statusClassName = task.status.replace(' ', '').toLowerCase()

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onToggle(task.id)}
        />
      </td>
      <td><Link className="link" to={`/task/${task.id}`}>{task.title}</Link></td>
      <td className={statusClassName}>{task.status}</td>
      <td>{new Date(task.createdAt).toLocaleDateString()}</td>
    </tr>
  )
})

export default TaskRow;