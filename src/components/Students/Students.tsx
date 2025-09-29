'use client';

import useStudents from '@/hooks/useStudents';
import type StudentInterface from '@/types/StudentInterface';

const Students = (): React.ReactElement => {
  const { students } = useStudents();

  return (
    <div>
      {students.map((student: StudentInterface) => (
        <div key={student.id}>
          <h2>
            {student.last_name} {student.first_name} {student.middle_name}
          </h2>
          <p>Фамилия: {student.last_name}</p>
          <p>Имя: {student.first_name}</p>
          <p>Отчество: {student.middle_name}</p>
          <p>ID группы: {student.groupId}</p>
        </div>
      ))}
    </div>
  );
};

export default Students;
