import { useState, useContext } from 'react';
import { TodoContext } from './App';
import TodoItem from './TodoItem';

const TodoList = ({ todos }) => {
  const [currentFilter, setCurrentFilter] = useState('all');
  const { handleClearCompleted } = useContext(TodoContext);

  const filteredTodos = {
    all: todos,
    active: todos?.filter(todo => !todo.completed) ?? todos,
    completed: todos?.filter(todo => todo.completed) ?? todos,
  };

  const countActive = filteredTodos.active?.length;

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
        {filteredTodos[currentFilter].map((todo, index) => (
          <TodoItem key={todo.id} index={index} todo={todo} />
        ))}
      </div>
      <div className='todo-options'>
        <p className='todo-info'>
          {countActive} item{countActive > 1 ? 's' : ''} left
        </p>
        <div className='filter-todos'>
          <p
            className={filterClass('all')}
            onClick={() => setCurrentFilter('all')}>
            All
          </p>
          <p
            className={filterClass('active')}
            onClick={() => setCurrentFilter('active')}>
            Active
          </p>
          <p
            className={filterClass('completed')}
            onClick={() => setCurrentFilter('completed')}>
            Completed
          </p>
        </div>
        <p className='clear-complete' onClick={handleClear}>
          Clear Completed
        </p>
      </div>
    </>
  );
};

export default TodoList;
