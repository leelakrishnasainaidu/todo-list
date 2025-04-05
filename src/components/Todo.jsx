import React, { useEffect, useRef, useState } from 'react';
import todo_icon from '../assets/todo_icon.png';
import TodoItems from './TodoItems';

const Todo = () => {
    const [todoList, setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);

    const inputRef = useRef();

    const add = () => {
        const inputText = inputRef.current.value.trim();
        if (inputText === "") return;

        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
        };

        setTodoList((prev) => [...prev, newTodo]);
        inputRef.current.value = "";
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            add();
        }
    };

    const deleteTodo = (id) => {
        setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    const toggle = (id) => {
        setTodoList((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
            )
        );
    };

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todoList))
    }, [todoList]);

    return (
        <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-4 sm:p-7 min-h-[550px] rounded-xl'>
            {/* title */}
            <div className='flex items-center mt-4 sm:mt-7 gap-2'>
                <img className='w-6 sm:w-8' src={todo_icon} alt="Todo Icon" />
                <h1 className='text-2xl sm:text-3xl font-semibold'>To Do List</h1>
            </div>

            {/* Input Box */}
            <div className='flex flex-col sm:flex-row items-center my-4 sm:my-7 bg-gray-200 rounded-2xl sm:rounded-full'>
                <input
                    ref={inputRef}
                    className='bg-transparent border-0 outline-none w-full sm:flex-1 h-12 sm:h-14 px-4 sm:pl-6 sm:pr-2 placeholder:text-slate-600 rounded-t-2xl sm:rounded-full'
                    type="text"
                    placeholder='Add your task'
                    onKeyPress={handleKeyPress}
                />
                <button
                    onClick={add}
                    className='border-none rounded-b-2xl sm:rounded-full bg-orange-600 w-full sm:w-32 h-12 sm:h-14 text-white text-lg font-medium cursor-pointer hover:bg-orange-700 transition-colors'
                >
                    ADD +
                </button>
            </div>

            {/* Todo List */}
            <div className='flex-1 overflow-y-auto'>
                {todoList.map((item) => (
                    <TodoItems
                        key={item.id}
                        id={item.id}
                        text={item.text}
                        isComplete={item.isComplete}
                        deleteTodo={deleteTodo}
                        toggle={toggle}
                    />
                ))}
            </div>
        </div>
    );
};

export default Todo;