import React, { useState } from 'react'
import Header from './Components/header/header'
import AddStudentForm from './Components/AddStudentForm/student_form'
import StudentTable from './Components/StudentTable/StudentTable'
import './App.css'

const App = () => {
  const [students, setStudents] = useState([])

  const handleAddStudent = (name, score) => {
    setStudents([...students, { name, score }])
  }

  const handleUpdateScore = (index, newScore) => {
    const updatedStudents = [...students]
    updatedStudents[index].score = newScore
    setStudents(updatedStudents)
  }

  const handleDeleteStudent = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index)
    setStudents(updatedStudents)
  }

  return (
    <div className='app-container'>
      <Header/>
      <main className='main-content'>
        <AddStudentForm onAddStudent={handleAddStudent}/>
        <StudentTable 
          students={students}
          onUpdateScore={handleUpdateScore}
          onDeleteStudent={handleDeleteStudent}
        />
      </main>
    </div>
  )
}

export default App