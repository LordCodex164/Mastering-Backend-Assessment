##BookShelf

BookShelf is a full-stack web application that enables users to search for books using the Google Books API, manage a personal bookshelf, and track their reading progress. Users can add books to their shelf, mark them as "Read," "Currently Reading," or "Want to Read," filter their collection by status, and remove books as needed. Built with modern web technologies, BookShelf provides a responsive, intuitive, and polished user experience with robust error handling and feedback.

##Table of Contents


##Features
Book Search: Search for books by title, author, or keyword using the Google Books API.



Personal Bookshelf: Add books to a personal shelf with a single click.



Reading Status Tracking: Mark books as "Read," "Currently Reading," or "Want to Read."



Shelf Filtering: Filter books by status (All, Read, Currently Reading, Want to Read).



Book Removal: Remove books from the shelf with ease.



Responsive UI: design using TailwindCSS.



User Feedback: Toast notifications for actions like adding, updating, or removing books.



Robust UX: Loading spinners, empty states, and error messages for a seamless experience.



Optional Authentication: Supports Google OAuth via NextAuth.js (defaults to a mock user ID for simplicity).


##Tech Stack



Project Structure



Setup Instructions



Environment Variables



Running the Application



Deployment



Usage



Authentication



Contributing



License

Features





Book Search: Search for books by title, author, or keyword using the Google Books API.



Personal Bookshelf: Add books to a personal shelf with a single click.



Reading Status Tracking: Mark books as "Read," "Currently Reading," or "Want to Read."



Shelf Filtering: Filter books by status (All, Read, Currently Reading, Want to Read).



Book Removal: Remove books from the shelf with ease.



Responsive UI: Mobile-first design using TailwindCSS, ensuring usability across devices.



User Feedback: Toast notifications for actions like adding, updating, or removing books.



Robust UX: Loading spinners, empty states, and error messages for a seamless experience.



Optional Authentication: Supports Google OAuth via NextAuth.js (defaults to a mock user ID for simplicity).

Tech Stack





Frontend: Next.js 14+ (App Router), TypeScript, TailwindCSS, React Hot Toast



Backend: Next.js API Routes, Prisma ORM with SQLite



API Integration: Google Books API for book search



Data Fetching: SWR for efficient caching and revalidation



Authentication: NextAuth.js with Google provider (optional)



Development Tools: ESLint, Prettier, TypeScript

Project Structure

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

├── components/
│   ├── Button.tsx                          # Book card with actions
│   ├── Card.tsx                         # Search input with debouncing
│   ├── Header.tsx                    # Status filter dropdown
│   
├── lib/
│   ├── prisma.ts                             # Prisma client initialization
│   └── googleBooksApi.ts                     # Google Books API utility
│   └── db.ts                                 # Prisma client initialization
│   └── auth.config.ts                        # NextAuth configuration (optional)
│   └── utils.ts                              # Utility functions
│   

├── Schema.prisma
│  
├
│   
├── types/
│   └── index.ts                              # TypeScript interfaces
├── .env                                      # Environment variables
├── README.md                                 # This file
├── package.json                              # Dependencies and scripts
├── tsconfig.json                             # TypeScript configuration
├── next.config.js                            # Next.js configuration
└── tailwind.config.js                        # TailwindCSS configuration

Setup Instructions





Clone the Repository:

git clone https://github.com/LordCodex164/Mastering-Backend-Assessment
cd Mastering-Backend-Assessment

Install Dependencies:
npm install







npm install



Set Up Prisma: Initialize the SQLite database and apply migrations:

npx prisma migrate dev --name init



Configure Environment Variables: Create a .env file in the root directory (see Environment Variables for details).

Environment Variables

Create a .env file in the project root with the following variables:

DATABASE_URL="file:./prisma/database.db"
GOOGLE_BOOKS_API_KEY="your-google-books-api-key"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-random-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"





GOOGLE_BOOKS_API_KEY: Obtain from the Google Cloud Console.



NEXTAUTH_URL: Set to your app’s URL (e.g., http://localhost:3000 for development).



NEXTAUTH_SECRET: Generate a random secret using openssl rand -base64 32.



GOOGLE_CLIENT_ID/SECRET: Obtain from Google Cloud Console for OAuth authentication (required only if using NextAuth).

Running the Application





Start the development server:

npm run dev



Open http://localhost:3000 in your browser.



Navigate to:





/search: Search for books using the Google Books API.



/shelf: View and manage your bookshelf.



/api/auth/signin: Sign in with Google (if authentication is enabled).

Deployment

To deploy the app to Vercel:



Install the Vercel CLI:

npm install -g vercel



Deploy the application:

vercel --prod



Configure environment variables in the Vercel dashboard (same as .env).



Apply database migrations for the deployed environment:

npx prisma migrate deploy



Access the live app at the URL provided by Vercel.

Note: SQLite is used for simplicity in development. For production, consider switching to PostgreSQL (e.g., Vercel Postgres) for better scalability, as SQLite may have limitations in serverless environments.

Usage





Search for Books:





Navigate to /search.



Enter a query (e.g., "The Great Gatsby") in the search bar.



Browse the results and click "Add to Shelf" to save a book.



Manage Your Bookshelf:


Go to /shelf to view your saved books.



Use the filter dropdown to view books by status (All, Read, Currently Reading, Want to Read).



Update a book’s status using the dropdown in each book card.



Remove books by clicking the "Remove" button.

User Feedback:


Toast notifications confirm actions (e.g., "Book added to shelf!").

Loading spinners and error messages handle API and database interactions gracefully.

Authentication

The app uses a mock user ID (mock-user-id) by default for simplicity, as authentication was optional in the requirements. To enable Google authentication:


Install additional dependencies:

npm install next-auth @auth/prisma-adapter

Configure NextAuth in app/api/auth/[...nextauth]/route.ts (see project code).


Set up GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_URL, and NEXTAUTH_SECRET in .env.


The Prisma adapter automatically creates a User record on first sign-in, mapping Google’s email and name to the User model.

To sign in:

Visit /api/auth/signin and click "Sign in with Google."


Books added to the shelf will be associated with the authenticated user’s ID.

Contributing

Contributions are welcome to enhance BookShelf! To contribute:

Fork the repository.

Create a feature branch:

git checkout -b feat/your-feature-name


Commit changes with descriptive messages (e.g., feat: add dark mode support).

git commit -m "feat: add dark mode support"



Push to your fork:

git push origin feat/your-feature-name



Open a pull request with a clear description of your changes.

Please adhere to the project’s code style (enforced by ESLint and Prettier) and include tests for new features if applicable.

License

This project is licensed under the MIT License. See LICENSE for details.

Built by [LordCodex164]
Live Demo: [https://mastering-backend-assessment-6tso.vercel.app/] 
Repository: [https://github.com/LordCodex164/Mastering-Backend-Assessment] 