import React, { useState } from 'react'

const AddStudentForm = ({ onAddStudent }) => {
  const [name, setName] = useState('')
  const [score, setScore] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (name.trim() === '' || score.trim() === '') {
      alert('Please fill in all fields')
      return
    }

    const scoreNum = parseFloat(score)
    if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100) {
      alert('Please enter a valid score between 0 and 100')
      return
    }

    onAddStudent(name, scoreNum)
    
    // Clear form
    setName('')
    setScore('')
  }

  return (
    <div className='form-container'>
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Student Name:</label>
          <input 
            type="text" 
            placeholder='Enter student name' 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label>Student Score:</label>
          <input 
            type="number" 
            placeholder='Enter student score' 
            value={score}
            onChange={(e) => setScore(e.target.value)}
            min="0"
            max="100"
          />
        </div>
        <button type="submit" className='btn-submit'>Add Student</button>
      </form>
    </div>
  )
}

export default AddStudentForm