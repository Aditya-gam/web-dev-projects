import React, { Fragment, useState, useEffect } from "react";

import EditTodo from "./EditTodo";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);

  //delete Function

  const deleteTodo = async id => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE"
      })

      setTodos(todos.filter(todo => todo.todo_id !== id))
      console.log(deleteTodo)
    } catch (err) {
      console.error(err.message);
    }
  }

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);
  console.log(todos);
  return (
    <Fragment>
      <h1 className="mt-5">List Todo</h1>{" "}
      <table className="table table-hover mt-5">
        <thead className="text-center">
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/*<tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> */}
      {todos.map(todo => (
        <tr key={todo.todo_id}>
        <td>{todo.description}</td>
        <td className="text-center"><EditTodo/></td>
        <td className="text-center"><button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
      </tr>
      ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodo;
