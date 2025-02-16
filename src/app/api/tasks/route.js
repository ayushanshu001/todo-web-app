export async function POST(req, res) {
  try {
    const session = await getSession({ req });

    if (!session || !session.user || !session.user.id) {
      return res.status(401).json({ error: "Unauthorized: User not authenticated" });
    }

    const userId = session.user.id;
    console.log("userId:", userId);

    const { title, description, status, dueDate, userId: taskUserId, priority } = await req.json();
    console.log("Task Data:", { title, description, status, dueDate, taskUserId, priority });

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    if (taskUserId !== userId) {
      return res.status(400).json({ error: "User ID mismatch" });
    }
    const validStatuses = ["TODO", "IN_PROGRESS", "DONE"];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ error: `Invalid status value. Valid values are ${validStatuses.join(", ")}` });
    }

    const validPriorities = ["LOW", "MEDIUM", "HIGH"];
    const finalPriority = priority && validPriorities.includes(priority) ? priority : "LOW";

    // Parse dueDate properly
    const parsedDueDate = new Date(dueDate);
    if (isNaN(parsedDueDate)) {
      return res.status(400).json({ error: "Invalid due date" });
    }

    console.log("Parsed Due Date:", parsedDueDate);

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status: status || "TODO",
        dueDate: parsedDueDate,
        priority: finalPriority,
        userId,
      },
    });

    return res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
