import { useState } from "react";
import type { FormEvent } from 'react'
import { useAppDispatch } from "../../redux/hooks/hooks";
import {createTodo} from "../../redux/slice/todosSlice";


export default function AddTodo() {

  const dispatch = useAppDispatch();
  const [todoInput, setTodoInput] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimTodo = todoInput.trim();

    dispatch(createTodo(trimTodo))

    setTodoInput('');
  }

  return (
      <form className="w-full xl:w-1/3 flex justify-center mb-10 px-8" onSubmit={handleSubmit}>
        <input type="text" value={todoInput} onChange={(e) => setTodoInput(e.target.value)} className="w-2/3 rounded px-4 py-4 bg-transparent text-zinc-200 placeholder:text-zinc-600 border border-zinc-700 focus:border-blue-400 focus:outline-none" placeholder="Enter new to do" />
        <button disabled={todoInput.length === 0} className={`ml-2 bg-blue-400 px-4 py-2 rounded text-zinc-900 font-semibold ${todoInput.length === 0 ? ' opacity-50' : ' opacity-100'}`}>Add Todo</button>
      </form>
  );
}

