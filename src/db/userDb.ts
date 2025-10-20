import { CreateUserInterface } from "../types/CreateUserInterface";
import UserInterface from "../types/UserInterface";
import sqlite3 from "sqlite3";

sqlite3.verbose();

export const getUsersDb = async (): Promise<UserInterface[]> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  const users : UserInterface[] = await new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM User';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        db.close();
        return;
      }
      resolve(rows);
      db.close();
    });
  });

  return users as UserInterface[];
};

export const deleteUserFromDb = async (id: number): Promise<void> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  await new Promise<void>((resolve, reject) => {
    const sql = 'DELETE FROM User WHERE id = ?';
    
    db.run(sql, [id], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
      db.close();
    });
  });
}

export const createUserDb = async (user: CreateUserInterface): Promise<void> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  await new Promise<void>((resolve, reject) => {
    const sql = 'INSERT INTO User (login, password) VALUES (?, ?)';
    
    db.run(sql, [user.login, user.password], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
      db.close();
    });
  });
}
