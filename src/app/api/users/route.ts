import { json } from "stream/consumers";
import { getUsersDb } from "../../../db/userDb";
import { createUserDb } from "../../../db/userDb";

export async function GET(): Promise<Response> {
  const users = await getUsersDb();

  return Response.json(users);
};

export async function POST(req: NextApiRequest): Promise<Response> {
  try {
    const user = await req.json();

    await createUserDb(user);

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'User created successfully' 
    }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
  }
}
