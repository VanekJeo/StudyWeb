import UserInterface from "../types/UserInterface";

const getUsersApi = async (): Promise<UserInterface[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}users`);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    const users = await response.json() as UserInterface[];
    return users;
  }
  catch (err) {
    console.log('>>> getGroupsApi', err);
    return [] as UserInterface[];
  }
};

export default getUsersApi;

export const deleteUserApiFromDb = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}users/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
  } catch (err) {
    console.log('>>> deleteUserApi', err);
    throw err;
  }
};

export const createUserApiDb = async (student: CreateStudentInterface): Promise<void> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student), // Добавляем данные студента
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}. ${errorText}`);
    }

    // Если API возвращает данные
    const result = await response.json();
    console.log('>>> createUserApi success:', result);
    
  } catch (err) {
    console.log('>>> createUserApi error:', err);
    throw err;
  }
};
