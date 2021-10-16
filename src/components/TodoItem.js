import { useState, useContext, useRef } from 'react';
import { TodoContext } from './App';
import check from '../images/icon-check.svg';
import cross from '../images/icon-cross.svg';

const TodoItem = ({ todo }) => {
  const [dragging, setDragging] = useState(false);
  const { theme, swapItems, handleUpdateTodo, handleDeleteTodo } =
    useContext(TodoContext);
  const todoEl = useRef();
  const placeholderEl = useRef();

  let yOffset, topValue, todoHeight;
  let todoElements, currIndex;

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

  function handleDragStart(e) {
    const wrapper = e.target.closest('.todo-content-wrapper');
    if (!wrapper) return;

    todoElements = [...document.querySelectorAll('.todo-item')];
    currIndex = todoElements.findIndex(t => t === todoEl.current);

    yOffset = e.clientY;
    topValue = todoEl.current.getBoundingClientRect().top + window.scrollY;
    todoHeight = todoEl.current.getBoundingClientRect().height;

    setDragging(true);
    todoEl.current.classList.add('dragging');
    todoEl.current.style.top = `${topValue}px`;
    document.addEventListener('mousemove', handleDragOver);
    document.addEventListener('mouseup', handleDragEnd);
  }

  function handleDragOver(e) {
    e.preventDefault();
    const newTopValue = topValue + e.clientY - yOffset;
    todoEl.current.style.top = `${newTopValue}px`;

    const nextSibling = todoElements?.[currIndex + 1];
    const prevSibling = todoElements?.[currIndex - 1];
    const sibling = newTopValue - topValue > 0 ? nextSibling : prevSibling;
    const siblingPosition = sibling === nextSibling ? 1 : -1;
    if (!sibling || !isCrossed(sibling, todoEl)) return;

    // If Items are crossed, then swap them;
    swapItems(currIndex, currIndex + siblingPosition);
    todoElements[currIndex] = sibling;
    todoElements[currIndex + siblingPosition] = todoEl.current;
    currIndex += siblingPosition;
  }

  function handleDragEnd(e) {
    setDragging(false);
    todoEl.current.classList.remove('dragging');
    document.removeEventListener('mousemove', handleDragOver);
    document.removeEventListener('mouseup', handleDragEnd);
  }

  function isCrossed(el, ref) {
    const y1 = el.getBoundingClientRect().y;
    const y2 = ref.current.getBoundingClientRect().y;
    return Math.abs(Math.trunc(y1 - y2)) === Math.trunc(todoHeight / 2);
  }

  return (
    <>
      {dragging && (
        <div
          ref={placeholderEl}
          className='todo-placeholder'
          style={{ height: todoEl.current?.getBoundingClientRect().height }}
        />
      )}
      <div className='todo-item' ref={todoEl} onMouseDown={handleDragStart}>
        <div className='todo-complete-wrapper'>
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
        </div>
        <div className='todo-content-wrapper'>
          <p className='todo-content' style={taskStyle}>
            {todo.task}
          </p>
          <div
            className='remove-todo'
            onClick={() => handleDeleteTodo(todo.id)}>
            <img src={cross} alt='remove' />
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoItem;
