import check from '../images/icon-check.svg';
import cross from '../images/icon-cross.svg';

const TodoItem = ({ todo }) => {
  return (
    <div className='todo-item'>
      <div className='todo-complete'>
        <input type='checkbox' />
        <div className='input-wrapper'>
          {todo.completed && <img src={check} alt='Completed' />}
        </div>
      </div>
      <div className='todo-content-wrapper'>
        <p className='todo-content'>{todo.task}</p>
        <div className='remove-todo'>
          <img src={cross} alt='remove' />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
