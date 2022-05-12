import React from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

const TodoItem = (props) => {
  const todo = props.todoProps;
  const markComplete = props.markCompleteFunc;
  const deleteTodo = props.deleteTodoFunc;

  // Style
  const todoItemStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    textDecoration: todo.completed ? 'line-through' : 'none',
  };

  // Return
  return (
    <div style={todoItemStyle}>
      <InputGroup className='mb-1' size='lg'>
        <InputGroup.Checkbox
          className='btn-checked'
          checked={todo.completed}
          aria-label={todo.title}
          aria-describedby='inputGroup-sizing-default'
          onChange={markComplete.bind(this, todo.id)}
        />
        <Form.Control
          type='text'
          className='tasks'
          disabled
          readOnly
          placeholder={todo.title}
        />{' '}
        <Button
          variant='outline-secondary'
          className='btn-delete'
          onClick={deleteTodo.bind(this, todo.id)}
        >
          Xoá
        </Button>
      </InputGroup>
    </div>
  );
};

export default TodoItem;
