import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Content from '@/models/Content';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const type     = searchParams.get('type');          // movie | series | live
    const genre    = searchParams.get('genre');
    const search   = searchParams.get('q');
    const limit    = parseInt(searchParams.get('limit') ?? '20', 10);
    const page     = parseInt(searchParams.get('page')  ?? '1',  10);
    const skip     = (page - 1) * limit;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = {};
    if (type)   query.type  = type;
    if (genre)  query.genre = { $regex: genre,  $options: 'i' };
    if (search) query.title = { $regex: search, $options: 'i' };

    const [items, total] = await Promise.all([
      Content.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Content.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data:    items,
      meta:    { total, page, limit, pages: Math.ceil(total / limit) },
    });

  } catch (err) {
    console.error('[GET /api/content]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const item = await Content.create(body);
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/content]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
