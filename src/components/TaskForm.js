import { useState } from 'react';

const TaskForm = ({ onAdd }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.title && task.description && task.dueDate) {
      onAdd({
        ...task,
        id: Date.now().toString(),
        status: 'To-Do',
      });
      setTask({ title: '', description: '', priority: 'Medium', dueDate: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={task.title}
        onChange={handleChange}
        className="p-2 w-full border rounded mb-2"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={task.description}
        onChange={handleChange}
        className="p-2 w-full border rounded mb-2"
      />
      <select
        name="priority"
        value={task.priority}
        onChange={handleChange}
        className="p-2 w-full border rounded mb-2"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
        className="p-2 w-full border rounded mb-4"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
