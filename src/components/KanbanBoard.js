import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import TaskEditModal from './TaskEditModal';  // New Modal for editing tasks

const KanbanBoard = () => {
  const [tasks, setTasks] = useState({ 'to-do': [], 'in-progress': [], 'done': [] });
  const [selectedTask, setSelectedTask] = useState(null);  // To store selected task for editing
  const [isModalOpen, setIsModalOpen] = useState(false);  // Control modal visibility

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

    // Add the task to the correct column based on the updated status
    const updatedColumn = updatedTask.status.toLowerCase().replace(' ', '-');
    updatedTasks[updatedColumn].push(updatedTask);

    setTasks(updatedTasks);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return; // If dropped outside

    const sourceColumn = source.droppableId;
    const destinationColumn = destination.droppableId;

    // No change if the task is dropped in the same column and same position
    if (sourceColumn === destinationColumn && source.index === destination.index) {
      return;
    }

    const sourceTasks = Array.from(tasks[sourceColumn]);
    const destinationTasks = Array.from(tasks[destinationColumn]);

    // Remove the task from the source column
    const [movedTask] = sourceTasks.splice(source.index, 1);

    // Add the task to the destination column
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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800">Kanban Board</h1>
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
                  {tasks[column].map((task, index) => (
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
