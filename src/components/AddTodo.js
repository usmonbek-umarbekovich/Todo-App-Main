import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AddTodo = ({ handleAddTodo }) => {
  const [todoTask, setTodoTask] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!todoTask) return;

    const newTodo = {
      id: uuidv4(),
      task: todoTask,
      completed: false,
    };
    handleAddTodo(newTodo);
    setTodoTask('');
  }

  return (
    <form className='todo-form' onSubmit={handleSubmit}>
      <div className='todo-complete'>
        <div className='input-outline'>
          <div className='input-wrapper'></div>
        </div>
      </div>
      <input
        type='text'
        aria-label='todo'
        placeholder='Create a new todo...'
        value={todoTask}
        onChange={e => setTodoTask(e.target.value)}
      />
    </form>
  );
};

export default AddTodo;
