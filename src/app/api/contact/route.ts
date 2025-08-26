import {NextResponse} from 'next/server';
import {z} from 'zod';
import {sendContactMail} from '@/lib/mailer';

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1)
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = schema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({error: 'Data tidak valid'}, {status: 400});
    }
    await sendContactMail(parsed.data);
    return NextResponse.json({ok: true});
  } catch (e: any) {
    return NextResponse.json({error: e.message ?? 'Gagal mengirim email'}, {status: 500});
  }
}


