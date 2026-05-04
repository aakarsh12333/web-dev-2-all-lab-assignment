import React, { useState } from 'react'

const StudentRow = ({ id, name, score, onUpdateScore, onDeleteStudent }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editScore, setEditScore] = useState(score)

  const status = score >= 40 ? 'Pass' : 'Fail'
  const statusClass = score >= 40 ? 'pass' : 'fail'

  const handleUpdate = () => {
    const scoreNum = parseFloat(editScore)
    if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100) {
      alert('Please enter a valid score between 0 and 100')
      return
    }
    onUpdateScore(id, scoreNum)
    setIsEditing(false)
  }

  return (
    <tr>
      <td>{name}</td>
      <td>
        {isEditing ? (
          <input 
            type="number" 
            value={editScore} 
            onChange={(e) => setEditScore(e.target.value)}
            min="0"
            max="100"
          />
        ) : (
          score
        )}
      </td>
      <td className={`status ${statusClass}`}>{status}</td>
      <td>
        {isEditing ? (
          <>
            <button className='btn-save' onClick={handleUpdate}>Save</button>
            <button className='btn-cancel' onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <button className='btn-edit' onClick={() => setIsEditing(true)}>Edit</button>
        )}
      </td>
      <td>
        <button className='btn-delete' onClick={() => onDeleteStudent(id)}>Delete</button>
      </td>
    </tr>
  )
}

export default StudentRow
