import sqlite3 from 'sqlite3';
import type StudentInterface from '@/types/StudentInterface';

sqlite3.verbose();

export const getStudentsDb = async (): Promise<StudentInterface[]> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  const students = await new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM student';
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

  return students as StudentInterface[];
};

export const createStudentDb = async (student: CreateStudentInterface): Promise<StudentInterface> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  const newStudent = await new Promise<StudentInterface>((resolve, reject) => {
    const sql = `
      INSERT INTO student (first_name, last_name, middle_name, groupId) 
      VALUES (?, ?, ?, ?)
    `;
    
    db.run(sql, [student.first_name, student.last_name, student.middle_name, student.groupId], function(err) {
      if (err) {
        reject(err);
        db.close();
        return;
      }
      
      db.get('SELECT * FROM student WHERE id = ?', [this.lastID], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row as StudentInterface);
        }
        db.close();
      });
    });
  });

  return newStudent;
};

export const deleteStudentDb = async (id: number): Promise<void> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  await new Promise<void>((resolve, reject) => {
    const sql = 'DELETE FROM student WHERE id = ?';
    
    db.run(sql, [id], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
      db.close();
    });
  });
};
