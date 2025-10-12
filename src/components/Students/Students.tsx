'use client';

import { useState } from 'react';
import useStudents from '@/hooks/useStudents';
import AddStudent from './AddStudent/AddStudent';
import type StudentInterface from '@/types/StudentInterface';
import type CreateStudentInterface from '@/types/CreateStudentInterface';

const Students = (): React.ReactElement => {
  const { students, createStudent, isCreating } = useStudents();
  const [error, setError] = useState<string | null>(null);

  const handleCreateStudent = async (studentData: CreateStudentInterface) => {
    try {
      setError(null);
      await createStudent(studentData);
    } catch (err) {
      setError('Ошибка при создании студента');
      console.error('Error creating student:', err);
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
        {students.map((student: StudentInterface) => (
          <div key={student.id} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #eee', borderRadius: '4px' }}>
            <h3>
              {student.last_name} {student.first_name} {student.middle_name}
            </h3>
            <p>Фамилия: {student.last_name}</p>
            <p>Имя: {student.first_name}</p>
            <p>Отчество: {student.middle_name}</p>
            <p>ID группы: {student.groupId}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Students;
