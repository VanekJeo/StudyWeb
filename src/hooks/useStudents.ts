import { useQuery } from '@tanstack/react-query';
import { getStudentsApi } from '@/api/studentsApi';
import type StudentInterface from '@/types/StudentInterface';

interface StudentsHookInterface {
  students: StudentInterface[];
}

const useStudents = (): StudentsHookInterface => {
  const { data } = useQuery({
    queryKey: ['students'],
    queryFn: () => getStudentsApi(),
  });

  return {
    students: data ?? [],
  };
};

export default useStudents;
