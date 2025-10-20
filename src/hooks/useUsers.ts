import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UserInterface from "../types/UserInterface";
import getUsersApi from "../api/usersApi";
import { deleteUserApiFromDb } from "../api/usersApi";
import { createUserApiDb } from "../api/usersApi";
import { CreateUserInterface } from "../types/CreateUserInterface";

interface UsersHookInterface {
  users: UserInterface[];
  deleteUser: (id: number) => Promise<void>;
  createUser: (user : CreateUserInterface) => Promise<void>;
  isDeleting: boolean;
}


const useUsers = (): UsersHookInterface => {
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ['users'],
        queryFn: () => getUsersApi(),
        enabled: true, 
    });

      const deleteUserMutation = useMutation({
        mutationFn: deleteUserApiFromDb,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });

    const createUserMutation = useMutation({
        mutationFn: createUserApiDb,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
    
    const myHook : UsersHookInterface =
    {
        users: data || [],
        deleteUser: (id: number) => deleteUserMutation.mutate(id),
        createUser: (user : CreateUserInterface) => createUserMutation.mutate(user),
    }

    return myHook;
};

export default useUsers;