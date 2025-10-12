import type StudentInterface from '@/types/StudentInterface';
import type CreateStudentInterface from '@/types/CreateStudentInterface';

export const getStudentsApi = async (): Promise<StudentInterface[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students`);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    const students = await response.json() as StudentInterface[];
    return students;
  } catch (err) {
    console.log('>>> getStudentsApi', err);
    return [] as StudentInterface[];
  }
};

export const createStudentApi = async (student: CreateStudentInterface): Promise<StudentInterface> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    const newStudent = await response.json() as StudentInterface;
    return newStudent;
  } catch (err) {
    console.log('>>> createStudentApi', err);
    throw err;
  }
};
