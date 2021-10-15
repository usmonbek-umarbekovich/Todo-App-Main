import TodoItem from './TodoItem';

const TodoList = ({ todos }) => {
  return (
    <>
      <div className='todo-list-container'>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
      <div className='todo-options'>
        <p className='todo-info'>5 items left</p>
        <div className='filter-todos'>
          <p>All</p>
          <p>Active</p>
          <p>Completed</p>
        </div>
        <p className='clear-complete'>Clear Completed</p>
      </div>
    </>
  );
};

export default TodoList;
