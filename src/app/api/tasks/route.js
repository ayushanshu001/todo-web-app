export async function POST(req, res) {
  try {
    // Get session (user authentication details)
    const session = await getSession({ req });
    console.log("Session:", session); // Debugging line

    // If no session or userId is found in the session, return unauthorized response
    if (!session || !session.user || !session.user.id) {
      return res.status(401).json({ error: "Unauthorized: User not authenticated" });
    }

    const userId = session.user.id; // Extract userId from session
    console.log("userId:", userId); // Debugging line

    // Retrieve task data from the request body
    const { title, description, status, dueDate, userId: taskUserId, priority } = await req.json();
    console.log("Task Data:", { title, description, status, dueDate, taskUserId, priority }); // Debugging line

    // Ensure the title is provided
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    // Ensure userId is valid
    if (taskUserId !== userId) {
      return res.status(400).json({ error: "User ID mismatch" });
    }

    // Validate the status
    const validStatuses = ["TODO", "IN_PROGRESS", "DONE"];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ error: `Invalid status value. Valid values are ${validStatuses.join(", ")}` });
    }

    const validPriorities = ["LOW", "MEDIUM", "HIGH"];
    const finalPriority = priority && validPriorities.includes(priority) ? priority : "LOW"; // Default to "LOW"

    // Parse dueDate properly
    const parsedDueDate = new Date(dueDate); // Ensure dueDate is a valid Date
    if (isNaN(parsedDueDate)) {
      return res.status(400).json({ error: "Invalid due date" });
    }

    console.log("Parsed Due Date:", parsedDueDate); // Debugging line

    // Create a task and associate it with the userId
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status: status || "TODO", // Default status to "TODO" if not provided
        dueDate: parsedDueDate, // Ensure proper date format
        priority: finalPriority,
        userId, // Associate task with userId from session
      },
    });

    return res.status(201).json(newTask); // Respond with the created task
  } catch (error) {
    console.error("Error creating task:", error); // Log the error for debugging
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
