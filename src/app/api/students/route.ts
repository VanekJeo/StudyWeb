import { NextResponse } from 'next/server';
import { getStudentsDb, createStudentDb } from '@/db/studentDb';
import type CreateStudentInterface from '@/types/CreateStudentInterface';

export async function GET(): Promise<Response> {
  const students = await getStudentsDb();

  return new Response(JSON.stringify(students), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function POST(request: Request): Promise<Response> {
  try {
    const studentData: CreateStudentInterface = await request.json();
    const newStudent = await createStudentDb(studentData);
    
    return new Response(JSON.stringify(newStudent), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Ошибка при создании студента' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
