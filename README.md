# Todo Web App with Kanban Board

This is a Todo Web App built using Next.js, Prisma, and PostgreSQL, with a Kanban board interface to manage tasks. The app supports CRUD operations, drag-and-drop functionality for task status changes, and user authentication using NextAuth.

## Features

- **Kanban Board**: Tasks can be managed in three columns — To-Do, In Progress, and Done.
- **CRUD Operations**: Create, Read, Update, and Delete tasks.
- **Drag-and-Drop**: Move tasks between different status columns (To-Do, In Progress, Done).
- **Task Details**: Each task has a title, description, priority, status, and due date.
- **User Authentication**: Secure login system using NextAuth for authentication.
- **Dark Mode**: Full support for dark mode using Tailwind CSS.
- **Database Integration**: Uses PostgreSQL database for task storage and Prisma ORM for database management.

## Requirements

Before running the project, make sure you have the following installed:

- **Node.js** (v14 or later)
- **PostgreSQL**: Make sure you have PostgreSQL installed locally or use a cloud PostgreSQL database.
- **Prisma CLI**: Used for database setup, schema migrations, and Prisma client generation.

## Getting Started

### 1. Clone the Repository.

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/todo-web-app.git
cd todo-web-app

## Install Dependencies

npm install
# or
yarn install

3. Set Up PostgreSQL Database
Ensure you have a PostgreSQL database running. You can set up a local PostgreSQL server or use a cloud PostgreSQL provider like Heroku or ElephantSQL.

Create a .env file at the root of your project and configure the following environment variables:

DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/todo-web-app?schema=public"
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

Replace USER and PASSWORD with your PostgreSQL credentials. Make sure the database todo-web-app exists, or you can create it manually in your PostgreSQL instance.

4. Set Up Prisma
Prisma is used to interact with your database. After configuring the database, you need to run Prisma migrations to set up the database schema.

Run the following command to generate the Prisma client:

npx prisma migrate dev


5. Start the Development Server
Now that everything is set up, you can start the development server:

npm run dev
# or
yarn dev


