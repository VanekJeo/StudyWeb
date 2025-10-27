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
          <label htmlFor="lastName">Фамилия:</label>
          <input
            id="lastName"
            type="text"
            {...register('lastName', { 
              required: 'Фамилия обязательна',
              minLength: {
                value: 2,
                message: 'Фамилия должна содержать минимум 2 символа'
              }
            })}
            style={{ display: 'block', width: '100%', padding: '0.5rem' }}
          />
          {errors.lastName && (
            <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors.lastName.message}</span>
          )}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="firstName">Имя:</label>
          <input
            id="firstName"
            type="text"
            {...register('firstName', { 
              required: 'Имя обязательно',
              minLength: {
                value: 2,
                message: 'Имя должно содержать минимум 2 символа'
              }
            })}
            style={{ display: 'block', width: '100%', padding: '0.5rem' }}
          />
          {errors.firstName && (
            <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors.firstName.message}</span>
          )}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="middleName">Отчество:</label>
          <input
            id="middleName"
            type="text"
            {...register('middleName')}
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

        {}
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="contacts">Контакты (опционально):</label>
          <input
            id="contacts"
            type="text"
            {...register('contacts')}
            style={{ display: 'block', width: '100%', padding: '0.5rem' }}
          />
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