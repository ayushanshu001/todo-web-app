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

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/todo-web-app.git
cd todo-web-app
