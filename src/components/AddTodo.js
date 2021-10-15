const AddTodo = () => {
  return (
    <form className='todo-form'>
      <div className='todo-complete'>
        <div className='input-wrapper'></div>
        <input type='checkbox' />
      </div>
      <input type='text' placeholder='Create a new todo...' />
    </form>
  );
};

export default AddTodo;
