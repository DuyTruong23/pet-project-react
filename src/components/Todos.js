import React, { useState, useEffect, Fragment } from 'react';
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
          'https://jsonplaceholder.typicode.com/todos?_limit=3'
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
    <Fragment>
      <AddTodo addTodoFunc={addTodo} />
      <Container className='container'>
        <h1 className='title-list'>Danh sách tasks</h1>
        {todosState.map((todo) => {
          return (
            <Card.Body key={todo.id} className='center'>
              <TodoItem
                todoProps={todo}
                markCompleteFunc={markComplete}
                deleteTodoFunc={deleteTodo}
              />
            </Card.Body>
          );
        })}
      </Container>
    </Fragment>
  );
};

export default Todos;
