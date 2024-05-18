import React, { useState } from "react";
import axios from "axios";

function Form({ inputText, setInputText, todos, setTodos, setStatus }) {
    const [alertWarning, setAlertWarning] = useState(false);
    const [alertSuccess, setAlertSuccess] = useState(false);

    const inputTextHandler = (e) => {
        setInputText(e.target.value);
    };

    const submitTodoHandler = async (e) => {
        e.preventDefault();
        const isEmpty = str => !str.trim().length;
        if (isEmpty(inputText)) {
            setAlertWarning(true);
            setTimeout(() => {
                setAlertWarning(false);
            }, 1000);
        } else {
            try {
                const response = await axios.post('http://localhost:3000/todos', { title: inputText });
                const newTodo = response.data;

                setAlertSuccess(true);
                setTimeout(() => {
                    setAlertSuccess(false);
                }, 1000);

                setTodos([
                    ...todos,
                    { text: newTodo.title, completed: newTodo.completed, id: newTodo._id }
                ]);

                setInputText("");
            } catch (error) {
                console.error('Error:', error);
                setAlertWarning(true);
                setTimeout(() => {
                    setAlertWarning(false);
                }, 1000);
            }
        }
    };

    const statusHandler = (e) => {
        setStatus(e.target.value);
    };

    return (
        <form>
            <div className="search">
                <input value={inputText} type="text" className="todo-input" placeholder="Add..." onChange={inputTextHandler} />
                <button className="todo-button" type="submit" onClick={submitTodoHandler}>
                    <i className="fas fa-plus-circle"></i>
                </button>
            </div>
            <div className="select">
                <select name="todos" className="filter-todo" onChange={statusHandler}>
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>
            </div>
            <div className="alert-wrapper">
                {alertWarning ? <div className="alert-warning">
                    <div>Nuk pranohet!</div>
                </div> : ""}
                {alertSuccess ? <div className="alert-success">
                    <div>Eshte kryer me sukses.</div>
                </div> : ""}
            </div>
        </form>
    );
}

export default Form;
