import './App.css';
import AddTask from './components/AddTask';
import DisplayTask from './components/DisplayTask';
import EditTask from './components/EditTask';
import React, { useState } from 'react';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [searchText, setSearchText] = useState('');

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Task 1',
      description: 'Description for Task 1',
      status: 'completed',
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Description for Task 2',
      status: 'inprogress',
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'Description for Task 3',
      status: 'pending',
    },
    {
      id: 4,
      title: 'Task 4',
      description: 'Description for Task 4',
      status: 'inprogress',
    }
  ]);

  const handleAddTask = (task) => {
    const title = String(task?.title ?? '').trim();
    const description = String(task?.description ?? '').trim();

    if (!title && !description) return;

    setTasks((prev) => [
      ...prev,
      {
        ...task,
        id: prev.length ? Math.max(...prev.map((t) => t.id ?? 0)) + 1 : 1,
        title,
        description,
      },
    ]);

    setShowAddTask(false);
  };

  const handleCancel = () => {
    setShowAddTask(false);
  };

  const handleDeleteTask = (task) => {
    if (!task?.id) return;
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  const handleEditTask = (task) => {
    if (!task?.id) return;
    setEditingTaskId(task.id);
  };

  const editingTask = editingTaskId ? tasks.find((t) => t.id === editingTaskId) : null;

  const handleSaveEditedTask = (updatedTask) => {
    if (!updatedTask?.id) return;

    setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    setEditingTaskId(null);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
  };

  return (
    <div className="App">
      {editingTaskId ? (
        <EditTask task={editingTask} onSave={handleSaveEditedTask} onCancel={handleCancelEdit} />
      ) : (
        <>
          <div className="app-toolbar">
            <button
              type="button"
              className="add-task-fab"
              aria-label={showAddTask ? 'Close add task' : 'Add task'}
              onClick={() => setShowAddTask((v) => !v)}
            >
              +
            </button>
          </div>
          <input
            type="text"
            placeholder="Search tasks..."
            className="task-search-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <br />
          {showAddTask && <AddTask onAdd={handleAddTask} onCancel={handleCancel} />}
          <DisplayTask tasks={tasks} searchText={searchText} onEdit={handleEditTask} onDelete={handleDeleteTask} />
        </>
      )}
    </div>
  );
}

export default App;
