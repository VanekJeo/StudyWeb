'use client';

import useUsers from "../../hooks/useUsers";
import { CreateUserInterface } from "../../types/CreateUserInterface";
import UserInterface from "../../types/UserInterface";
import { useForm } from "react-hook-form";

const Users = (): React.ReactElement => {
   const { users, deleteUser, createUser } = useUsers();
   const { register, handleSubmit, reset } = useForm<CreateUserInterface>();

   const onCreateUser = async (data: CreateUserInterface) => {
     try {
       await createUser(data); // Добавляем await
       reset();
     } catch (error) {
       console.error('Ошибка при создании пользователя:', error);
     }
   };

   return (
     <div>
       <form onSubmit={handleSubmit(onCreateUser)}>
         <h3>Добавить пользователя:</h3>
         
         <input 
           {...register("login", { required: true })}
           placeholder="Логин"
         />
         
         <input 
           {...register("password", { required: true })}
           type="password" 
           placeholder="Пароль"
         />
         
         <button type="submit">
           Добавить
         </button>
       </form>

       <h2>Список пользователей:</h2>
       {users.map((user) => (
         <div key={user.id}>
           <span>{user.login} - {user.password}</span>
           <button onClick={() => deleteUser(user.id)}>
             Удалить
           </button>
         </div>
       ))}
     </div>
   );
};

export default Users;