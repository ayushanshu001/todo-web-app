// app/api/tasks/[id]/route.js

import prisma from "@/lib/prisma";  // Import Prisma client

// Fetch task by ID
export async function GET(req, { params }) {
  const { id } = params;

  try {
    const task = await prisma.task.findUnique({
      where: { id },
      include: { user: true }, // Include user details if needed
    });

    if (!task) {
      return new Response(
        JSON.stringify({ error: "Task not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(task), { status: 200 });
  } catch (error) {
    console.error("Error in GET by ID:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch task" }),
      { status: 500 }
    );
  }
}

// Update task by ID
export async function PATCH(req, { params }) {
  const { id } = params;
  const { title, description, status, priority, dueDate } = await req.json();

  try {
    const task = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        status,
        priority,
        dueDate: new Date(dueDate),
      },
    });

    return new Response(JSON.stringify(task), { status: 200 });
  } catch (error) {
    console.error("Error in PATCH:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update task" }),
      { status: 500 }
    );
  }
}

// Delete task by ID
export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const task = await prisma.task.delete({
      where: { id },
    });

    return new Response(JSON.stringify({ message: "Task deleted successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error in DELETE:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete task" }),
      { status: 500 }
    );
  }
}
