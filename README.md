 # BookShelf

BookShelf is a full-stack web application that enables users to search for books using the Google Books API, manage a personal bookshelf, and track their reading progress. Users can add books to their shelf, mark them as "Read," "Currently Reading," or "Want to Read," filter their collection by status, and remove books as needed. Built with modern web technologies, BookShelf provides a responsive, intuitive, and polished user experience with robust error handling and feedback.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Setup Instructions](#setup-instructions)
5. [Environment Variables](#environment-variables)
6. [Running the Application](#running-the-application)
7. [Deployment](#deployment)
8. [Usage](#usage)
9. [Authentication](#authentication)
10. [Contributing](#contributing)
11. [License](#license)
12. [Built by](#built-by)
13. [Live Demo](#live-demo)
14. [Repository](#repository)

## Features

Book Search: Search for books by title, author, or keyword using the Google Books API.


Personal Bookshelf: Add books to a personal shelf with a single click.


Reading Status Tracking: Mark books as "Read," "Currently Reading," or "Want to Read."


Shelf Filtering: Filter books by status (All, Read, Currently Reading, Want to Read).




Responsive UI: design using TailwindCSS.



User Feedback: Toast notifications for actions like adding, updating, or removing books.


Robust UX: Loading spinners, empty states, and error messages for a seamless experience.

Optional Authentication: Supports Google OAuth via NextAuth.js (defaults to a mock user ID for simplicity).


## Tech Stack

## Frontend: Next.js 14+ (App Router), TypeScript, TailwindCSS, React Hot Toast

## Backend: Next.js API Routes, Prisma ORM with SQLite

## API Integration: Google Books API for book search

## Data Fetching: SWR for efficient caching and revalidation

## Authentication: NextAuth.js with Google provider (optional)

## Development Tools: ESLint, Prettier, TypeScript


## Project Structure

```
bookshelf/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts       # NextAuth configuration (optional)
│   │   ├── shelf/
│   │   │ 
│   │   └── route.ts                      # Get/add book to the shelf
│   │   └── search/route.ts                   # Google Books API proxy
│   ├── sign-in/page.tsx                  # Custom sign-in page (optional)
│   ├── search/page.tsx                       # Book search page 
│   ├── shelf/page.tsx                        # Bookshelf management page
│   ├── layout.tsx                            # Root layout with navigation
│   └── globals.css                           # TailwindCSS global styles

```
Setup Instructions





## Environment Variables

NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY=your-google-books-api-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_BOOKS_API_KEY=your-google-books-api-key
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret



## Running the Application

```
npm install

npx prisma migrate dev --name init

npx prisma generate

npm run dev

```


## Deployment

```
npm run build

npm run start

```


## Usage

Access the live app at the URL provided by Vercel.

Note: SQLite is used for simplicity in development. For production, consider switching to PostgreSQL (e.g., Vercel Postgres) for better scalability, as SQLite may have limitations in serverless environments.

## Usage

Search for Books:

1. Navigate to /search.

2. Enter a query (e.g., "The Great Gatsby") in the search bar.

3. Browse the results and click "Add to Shelf" to save a book.

*Manage Your Bookshelf:*

4. Go to /shelf to view your saved books.

5. Use the filter dropdown to view books by status (All, Read, Currently Reading, Want to Read).

Update a book’s status using the dropdown in each book card.

Remove books by clicking the "Remove" button.

User Feedback:


Toast notifications confirm actions (e.g., "Book added to shelf!").

Loading spinners and error messages handle API and database interactions gracefully.

## Authentication

The app uses a mock user ID (mock-user-id) by default for simplicity, as authentication was optional in the requirements. To enable Google authentication:


Install additional dependencies:

npm install next-auth @auth/prisma-adapter

Configure NextAuth in app/api/auth/[...nextauth]/route.ts (see project code).


Set up GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_URL, and NEXTAUTH_SECRET in .env.


The Prisma adapter automatically creates a User record on first sign-in, mapping Google’s email and name to the User model.

To sign in:

Visit /api/auth/signin and click "Sign in with Google."


Books added to the shelf will be associated with the authenticated user’s ID.

## Contributing

Contributions are welcome to enhance BookShelf! To contribute:

1. Fork the repository.

2. Create a feature branch:

3. ```git checkout -b feat/your-feature-name```


4. Commit changes with descriptive messages (e.g., feat: add dark mode support).

5. ```git commit -m "feat: add dark mode support"```



6. Push to your fork:

```git push origin feat/your-feature-name```


7. Open a pull request with a clear description of your changes.


License

This project is licensed under the MIT License. See LICENSE for details.

Built by [LordCodex164]
Live Demo: [https://mastering-backend-assessment-6tso.vercel.app/] 
Repository: [https://github.com/LordCodex164/Mastering-Backend-Assessment] 