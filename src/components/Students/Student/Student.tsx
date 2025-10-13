'use client';

import type StudentInterface from '@/types/StudentInterface';
import styles from './Student.module.scss';

interface StudentProps {
  student: StudentInterface;
  onDelete: (id: number) => void;
  isDeleting?: boolean;
}

const Student = ({ student, onDelete, isDeleting = false }: StudentProps): React.ReactElement => {
  const handleDelete = () => {
    if (window.confirm(`Вы уверены, что хотите удалить студента ${student.last_name} ${student.first_name}?`)) {
      onDelete(student.id);
    }
  };

  return (
    <div className={styles.student}>
      <div className={styles.studentInfo}>
        <h3 className={styles.studentName}>
          {student.last_name} {student.first_name} {student.middle_name}
        </h3>
        <div className={styles.studentDetails}>
          <p><strong>Фамилия:</strong> {student.last_name}</p>
          <p><strong>Имя:</strong> {student.first_name}</p>
          <p><strong>Отчество:</strong> {student.middle_name || '—'}</p>
          <p><strong>ID группы:</strong> {student.groupId}</p>
          <p><strong>ID:</strong> {student.id}</p>
        </div>
      </div>
      <button
        className={styles.deleteButton}
        onClick={handleDelete}
        disabled={isDeleting}
        type="button"
      >
        {isDeleting ? 'Удаление...' : 'Удалить'}
      </button>
    </div>
  );
};

export default Student;
