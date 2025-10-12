import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getStudentsApi, createStudentApi } from '@/api/studentsApi';
import type StudentInterface from '@/types/StudentInterface';
import type CreateStudentInterface from '@/types/CreateStudentInterface';

interface StudentsHookInterface {
  students: StudentInterface[];
  createStudent: (student: CreateStudentInterface) => Promise<StudentInterface>;
  isCreating: boolean;
}

const useStudents = (): StudentsHookInterface => {
  const queryClient = useQueryClient();
  
  const { data } = useQuery({
    queryKey: ['students'],
    queryFn: () => getStudentsApi(),
  });

  const { mutateAsync: createStudent, isPending: isCreating } = useMutation({
    mutationFn: createStudentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });

  return {
    students: data ?? [],
    createStudent,
    isCreating,
  };
};

export default useStudents;
