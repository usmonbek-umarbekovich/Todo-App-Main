import { useState, useContext } from 'react';
import { TodoContext } from './App';
import TodoItem from './TodoItem';

const TodoList = ({ todos }) => {
  const [currentFilter, setCurrentFilter] = useState('all');
  const { handleClearCompleted } = useContext(TodoContext);

  const filteredTodos = {
    all: todos,
    active: todos.filter(todo => !todo.completed),
    completed: todos.filter(todo => todo.completed),
  };

  const countActive = filteredTodos.active.length;

  function filterClass(key) {
    if (key !== currentFilter) return '';
    return 'active-filter';
  }

  function handleClear() {
    handleClearCompleted();
    setCurrentFilter('all');
  }

  return (
    <>
      <div className='todo-list-container'>
        {filteredTodos[currentFilter].length > 0 ? (
          filteredTodos[currentFilter]?.map((todo, index) => (
            <TodoItem key={todo.id} index={index} todo={todo} />
          ))
        ) : (
          <p className='empty-todos'>There are no todos!</p>
        )}
      </div>
      <div className='todo-options'>
        <p className='todo-info'>
          {countActive} item{countActive > 1 ? 's' : ''} left
        </p>
        <div className='filter-todos'>
          <button
            className={filterClass('all') + ' bg-clear'}
            onClick={() => setCurrentFilter('all')}>
            All
          </button>
          <button
            className={filterClass('active') + ' bg-clear'}
            onClick={() => setCurrentFilter('active')}>
            Active
          </button>
          <button
            className={filterClass('completed') + ' bg-clear'}
            onClick={() => setCurrentFilter('completed')}>
            Completed
          </button>
        </div>
        <button className='clear-complete bg-clear' onClick={handleClear}>
          Clear Completed
        </button>
      </div>
    </>
  );
};

export default TodoList;
