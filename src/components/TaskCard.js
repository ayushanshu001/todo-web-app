const TaskCard = ({ task, onDelete, onUpdate }) => {
  const handleDelete = () => {
    onDelete(task.id, task.status.toLowerCase().replace(' ', '-'));
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>
      <div className="mt-2 text-sm text-gray-500">
        <p><strong>Priority:</strong> {task.priority}</p>
        <p><strong>Due Date:</strong> {task.dueDate}</p>
      </div>
      <button
        onClick={() => onUpdate(task)}
        className="mt-2 text-blue-600 hover:text-blue-800"
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        className="mt-2 text-red-600 hover:text-red-800"
      >
        Delete
      </button>
    </div>
  );
};

export default TaskCard;
