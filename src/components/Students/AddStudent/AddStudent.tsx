'use client';

import { useForm } from 'react-hook-form';
import type CreateStudentInterface from '@/types/CreateStudentInterface';

interface AddStudentProps {
  onCreateStudent: (student: CreateStudentInterface) => Promise<void>;
  isCreating: boolean;
}

const AddStudent = ({ onCreateStudent, isCreating }: AddStudentProps): React.ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateStudentInterface>();

  const onSubmit = async (data: CreateStudentInterface) => {
    try {
      await onCreateStudent(data);
      reset();
    } catch (error) {
      console.error('Ошибка при создании студента:', error);
    }
  };

  return (
    <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Добавить нового студента</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="last_name">Фамилия:</label>
          <input
            id="last_name"
            type="text"
            {...register('last_name', { 
              required: 'Фамилия обязательна',
              minLength: {
                value: 2,
                message: 'Фамилия должна содержать минимум 2 символа'
              }
            })}
            style={{ display: 'block', width: '100%', padding: '0.5rem' }}
          />
          {errors.last_name && (
            <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors.last_name.message}</span>
          )}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="first_name">Имя:</label>
          <input
            id="first_name"
            type="text"
            {...register('first_name', { 
              required: 'Имя обязательно',
              minLength: {
                value: 2,
                message: 'Имя должно содержать минимум 2 символа'
              }
            })}
            style={{ display: 'block', width: '100%', padding: '0.5rem' }}
          />
          {errors.first_name && (
            <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors.first_name.message}</span>
          )}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="middle_name">Отчество:</label>
          <input
            id="middle_name"
            type="text"
            {...register('middle_name')}
            style={{ display: 'block', width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="groupId">ID группы:</label>
          <input
            id="groupId"
            type="number"
            {...register('groupId', { 
              required: 'ID группы обязателен',
              min: {
                value: 1,
                message: 'ID группы должен быть положительным числом'
              },
              valueAsNumber: true
            })}
            style={{ display: 'block', width: '100%', padding: '0.5rem' }}
          />
          {errors.groupId && (
            <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors.groupId.message}</span>
          )}
        </div>

        <button 
          type="submit" 
          disabled={isCreating}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: isCreating ? '#ccc' : '#007acc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isCreating ? 'not-allowed' : 'pointer'
          }}
        >
          {isCreating ? 'Добавление...' : 'Добавить студента'}
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
