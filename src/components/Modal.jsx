import ReactDOM from 'react-dom'

export default function Modal({ title, content, show, onClose, onConfirm, confirmText = 'Conferma' }) {

  if (!show) return null;

  return ReactDOM.createPortal(
    <div className='modal-overlay'>
      <div className='modal'>
        <h2>{title}</h2>
        <p>{content}</p>
        <div className='selection'>
          <button onClick={onClose}>Annulla</button>
          <button onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>,
    document.body
  )
}