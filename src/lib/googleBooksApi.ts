import axios from 'axios';

const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;
const BASE_URL = process.env.GOOGLE_BOOK_API_URL;

export interface BookSearchResult {
  id: string;
  title: string;
  authors?: string[];
  imageUrl?: string;
}

export async function searchBooks(query: string): Promise<BookSearchResult[]> {
  try {
    const response = await axios.get(BASE_URL!, {
      params: { q: query, key: API_KEY, maxResults: 20 },
    });
    
    const items = response.data.items || [];
    return items.map((item: any) => ({
      id: item.id,
      title: item.volumeInfo.title || 'Unknown Title',
      authors: item.volumeInfo.authors || ['Unknown Author'],
      imageUrl: item.volumeInfo.imageLinks?.thumbnail,
      googleId: item.id,
      author: item.volumeInfo.authors?.[0] || 'Unknown Author',
    }));
  } catch (error) {
    throw new Error('Failed to fetch books');
  }
}