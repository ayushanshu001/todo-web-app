import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import TaskEditModal from './TaskEditModal'; 

const KanbanBoard = () => {
  const [tasks, setTasks] = useState({ 'to-do': [], 'in-progress': [], 'done': [] });
  const [selectedTask, setSelectedTask] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({ priority: '', status: '', dueDate: '' });
  const [sortBy, setSortBy] = useState('dueDate');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || { 'to-do': [], 'in-progress': [], 'done': [] };
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    const updatedTasks = { ...tasks };
    updatedTasks['to-do'].push(task);
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId, column) => {
    const updatedTasks = { ...tasks };
    updatedTasks[column] = updatedTasks[column].filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const updateTask = (taskId, updatedTask) => {
    const updatedTasks = { ...tasks };

    // Remove the task from the current column
    for (const column in updatedTasks) {
      updatedTasks[column] = updatedTasks[column].filter((task) => task.id !== taskId);
    }

    const updatedColumn = updatedTask.status.toLowerCase().replace(' ', '-');
    updatedTasks[updatedColumn].push(updatedTask);

    setTasks(updatedTasks);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return; // If dropped outside

    const sourceColumn = source.droppableId;
    const destinationColumn = destination.droppableId;

    if (sourceColumn === destinationColumn && source.index === destination.index) {
      return;
    }

    const sourceTasks = Array.from(tasks[sourceColumn]);
    const destinationTasks = Array.from(tasks[destinationColumn]);

    const [movedTask] = sourceTasks.splice(source.index, 1);

    destinationTasks.splice(destination.index, 0, movedTask);

    setTasks((prev) => ({
      ...prev,
      [sourceColumn]: sourceTasks,
      [destinationColumn]: destinationTasks,
    }));
  };

  const openEditModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const filteredTasks = () => {
    let filtered = { ...tasks };

    // Filter tasks by priority, status, and due date
    for (const column in filtered) {
      filtered[column] = filtered[column].filter((task) => {
        const priorityMatch = filters.priority ? task.priority === filters.priority : true;
        const statusMatch = filters.status ? task.status.toLowerCase() === filters.status : true;
        const dueDateMatch = filters.dueDate ? task.dueDate === filters.dueDate : true;
        return priorityMatch && statusMatch && dueDateMatch;
      });
    }

    // Sort tasks in each column by the selected criterion
    for (const column in filtered) {
      filtered[column] = filtered[column].sort((a, b) => {
        if (sortBy === 'dueDate') {
          return new Date(a.dueDate) - new Date(b.dueDate);
        }
        if (sortBy === 'priority') {
          const priorities = { Low: 1, Medium: 2, High: 3 };
          return priorities[a.priority] - priorities[b.priority];
        }
        return 0;
      });
    }

    return filtered;
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800">Kanban Board</h1>

      {/* Filters and Sorting */}
      <div className="flex justify-between mt-6">
        <div>
          <label className="mr-4">Priority:</label>
          <select name="priority" onChange={handleFilterChange} value={filters.priority} className="p-2 border rounded">
            <option value="">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label className="mr-4">Status:</label>
          <select name="status" onChange={handleFilterChange} value={filters.status} className="p-2 border rounded">
            <option value="">All</option>
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div>
          <label className="mr-4">Due Date:</label>
          <input
            type="date"
            name="dueDate"
            onChange={handleFilterChange}
            value={filters.dueDate}
            className="p-2 border rounded"
          />
        </div>
        <div>
          <label className="mr-4">Sort By:</label>
          <select onChange={handleSortChange} value={sortBy} className="p-2 border rounded">
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-6 mt-6">
          {['to-do', 'in-progress', 'done'].map((column) => (
            <Droppable key={column} droppableId={column}>
              {(provided) => (
                <div
                  className="w-1/3 bg-gray-200 p-4 rounded-md"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2 className="text-xl font-semibold">{column.replace('-', ' ').toUpperCase()}</h2>
                  {filteredTasks()[column].map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          className="mb-4"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard task={task} onDelete={deleteTask} onUpdate={openEditModal} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      <TaskForm onAdd={addTask} />
      {isModalOpen && (
        <TaskEditModal
          task={selectedTask}
          onClose={closeEditModal}
          onUpdate={updateTask}
        />
      )}
    </div>
  );
};

export default KanbanBoard;
