import { useContext } from 'react';
import { TodoContext } from './App';
import check from '../images/icon-check.svg';
import cross from '../images/icon-cross.svg';

const TodoItem = ({ todo }) => {
  const { handleUpdateTodo, handleDeleteTodo } = useContext(TodoContext);

  function handleUpdate() {
    const newTodo = { ...todo, completed: !todo.completed };
    handleUpdateTodo(newTodo);
  }

  return (
    <div className='todo-item'>
      <div className='todo-complete'>
        <input
          type='checkbox'
          checked={todo.completed}
          onChange={handleUpdate}
        />
        <div className='input-wrapper'>
          {todo.completed && <img src={check} alt='Completed' />}
        </div>
      </div>
      <div className='todo-content-wrapper'>
        <p className='todo-content'>{todo.task}</p>
        <div className='remove-todo' onClick={() => handleDeleteTodo(todo.id)}>
          <img src={cross} alt='remove' />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
