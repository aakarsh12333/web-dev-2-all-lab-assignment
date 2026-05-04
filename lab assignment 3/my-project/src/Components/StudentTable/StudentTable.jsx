import React from 'react'
import StudentRow from '../StudentRow/StudentRow'

const StudentTable = ({ students, onUpdateScore, onDeleteStudent }) => {
  return (
    <div className='table-container'>
      <h2>Student Report</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
            <th>Status</th>
            <th>Update</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students && students.length > 0 ? (
            students.map((student, index) => (
              <StudentRow 
                key={index} 
                id={index}
                name={student.name} 
                score={student.score}
                onUpdateScore={onUpdateScore}
                onDeleteStudent={onDeleteStudent}
              />
            ))
          ) : (
            <tr>
              <td colSpan="5" className='empty-message'>No students added yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default StudentTable
