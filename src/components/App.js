import React, { useState, useEffect } from 'react';
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
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState('dark');

  const themeIcon = theme === 'dark' ? 'sun' : 'moon';

  const contextValue = {
    theme,
    saveOrder,
    handleUpdateTodo,
    handleDeleteTodo,
    handleClearCompleted,
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) setTodos(JSON.parse(storedTodos));
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

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

  function changeTheme() {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    document.body.classList.remove(theme);
    document.body.classList.add(newTheme);
    setTheme(newTheme);
  }

  function saveOrder(todo, index) {
    const newTodos = todos.filter(t => t.id !== todo.id);
    newTodos.splice(index, 0, todo);
    setTodos(newTodos);
  }

  return (
    <div className='container'>
      <header className='header'>
        <div className='header__title'>
          <h1>Todo</h1>
          <button className='toggle-theme bg-clear' onClick={changeTheme}>
            <img src={icons[`icon-${themeIcon}.svg`]} alt='Theme Toggler' />
          </button>
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

export default App;
