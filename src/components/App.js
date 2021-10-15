import React, { useState } from 'react';
import '../css/app.css';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

const icons = {};

function importAll(r) {
  r.keys().forEach(key => (icons[key.replace('./', '')] = r(key).default));
}
importAll(require.context('../images', false, /\.svg$/));

export const TodoContext = React.createContext();

function App() {
  const [todos, setTodos] = useState(SAMPLE_DATA);

  const contextValue = {
    handleUpdateTodo,
    handleDeleteTodo,
    handleClearCompleted,
  };

  function handleAddTodo(todo) {
    setTodos([todo, ...todos]);
  }

  function handleDeleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function handleUpdateTodo(todo) {
    const newTodos = [...todos];
    const index = newTodos.findIndex(t => t.id === todo.id);
    newTodos[index] = todo;
    setTodos(newTodos);
  }

  function handleClearCompleted() {
    setTodos(todos.filter(todo => !todo.completed));
  }

  return (
    <div className='container'>
      <header className='header'>
        <div className='header__title'>
          <h1>Todo</h1>
          <div className='toggle-theme'>
            <img src={icons['icon-sun.svg']} alt='Theme Toggler' />
          </div>
        </div>
        <AddTodo handleAddTodo={handleAddTodo} />
      </header>
      <main className='main'>
        <TodoContext.Provider value={contextValue}>
          <TodoList todos={todos} />
        </TodoContext.Provider>
      </main>
      <footer className='footer'>
        <p>Drag and drop to reorder list</p>
      </footer>
    </div>
  );
}

const SAMPLE_DATA = [
  {
    id: 1,
    completed: false,
    task: 'Walk The Dog Today',
  },
  {
    id: 2,
    completed: true,
    task: 'Jog around the park at 3pm',
  },
  {
    id: 3,
    completed: false,
    task: 'Read books for 1 hour',
  },
  {
    id: 4,
    completed: true,
    task: 'Read article for 1 hour',
  },
  {
    id: 5,
    completed: false,
    task: 'Write code for 2 hours',
  },
  {
    id: 6,
    completed: true,
    task: 'Sleep for 7 hours',
  },
];

export default App;
