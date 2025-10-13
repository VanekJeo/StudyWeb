import { NextResponse } from 'next/server';
import { deleteStudentDb } from '@/db/studentDb';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: 'Неверный ID студента' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    await deleteStudentDb(id);
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Ошибка при удалении студента' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}