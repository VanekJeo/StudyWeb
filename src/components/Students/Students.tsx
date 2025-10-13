'use client';

import { useState } from 'react';
import useStudents from '@/hooks/useStudents';
import AddStudent from './AddStudent/AddStudent';
import Student from './Student/Student';
import type StudentInterface from '@/types/StudentInterface';
import type CreateStudentInterface from '@/types/CreateStudentInterface';

const Students = (): React.ReactElement => {
  const { students, createStudent, deleteStudent, isCreating, isDeleting } = useStudents();
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleCreateStudent = async (studentData: CreateStudentInterface) => {
    try {
      setError(null);
      await createStudent(studentData);
    } catch (err) {
      setError('Ошибка при создании студента');
      console.error('Error creating student:', err);
    }
  };

  const handleDeleteStudent = async (id: number) => {
    try {
      setError(null);
      setDeletingId(id);
      await deleteStudent(id);
    } catch (err) {
      setError('Ошибка при удалении студента');
      console.error('Error deleting student:', err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <AddStudent
        onCreateStudent={handleCreateStudent}
        isCreating={isCreating}
      />
      
      {error && (
        <div style={{ color: 'red', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#ffe6e6' }}>
          {error}
        </div>
      )}

      <div>
        <h2>Список студентов</h2>
        {students.length === 0 ? (
          <p>Студенты не найдены</p>
        ) : (
          students.map((student: StudentInterface) => (
            <Student
              key={student.id}
              student={student}
              onDelete={handleDeleteStudent}
              isDeleting={deletingId === student.id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Students;
