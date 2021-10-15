import { useContext } from 'react';
import { TodoContext } from './App';
import check from '../images/icon-check.svg';
import cross from '../images/icon-cross.svg';

const TodoItem = ({ todo }) => {
  const { theme, handleUpdateTodo, handleDeleteTodo } = useContext(TodoContext);

  const taskStyle = {
    textDecoration: todo.completed ? 'line-through' : '',
  };

  if (theme === 'dark') {
    taskStyle.color = todo.completed
      ? 'hsl(233, 14%, 35%)'
      : 'hsl(234, 39%, 85%)';
  } else {
    taskStyle.color = todo.completed
      ? 'hsl(233, 11%, 84%)'
      : 'hsl(235, 19%, 35%)';
  }

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
        <p className='todo-content' style={taskStyle}>
          {todo.task}
        </p>
        <div className='remove-todo' onClick={() => handleDeleteTodo(todo.id)}>
          <img src={cross} alt='remove' />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
