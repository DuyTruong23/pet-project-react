import React, { useState, useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import axios from 'axios';

const Todos = () => {
  const [todosState, setTodosState] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await axios.get(
          'https://jsonplaceholder.typicode.com/todos?_limit=5'
        );
        // console.log(res.data)
        setTodosState(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getTodos();
  }, []);

  const markComplete = (id) => {
    const newTodos = todosState.map((todo) => {
      if (todo.id === id) todo.completed = !todo.completed;
      return todo;
    });

    setTodosState(newTodos);
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      const newTodos = todosState.filter((todo) => todo.id !== id);
      setTodosState(newTodos);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addTodo = async (title) => {
    try {
      const res = await axios.post(
        'https://jsonplaceholder.typicode.com/todos',
        {
          title,
          completed: false,
        }
      );
      console.log(res.data);
      const newTodos = [...todosState, res.data];
      setTodosState(newTodos);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <AddTodo addTodoFunc={addTodo} className='b-100' />
      <Container className='container'>
        <h1 className='title-list'>Danh sách tasks</h1>
        {todosState.map((todo) => {
          return (
            <div className=''>
              <Card.Body className='center'>
                <TodoItem
                  key={todo.id}
                  todoProps={todo}
                  markCompleteFunc={markComplete}
                  deleteTodoFunc={deleteTodo}
                />
              </Card.Body>
            </div>
          );
        })}
      </Container>
    </div>
  );
};

export default Todos;
