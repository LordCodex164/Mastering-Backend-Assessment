import { NextResponse } from 'next/server';
import { searchBooks, BookSearchResult } from '@/lib/googleBooksApi';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  try {
    const books = await searchBooks(query);
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to search books' }, { status: 500 });
  }
}