import { useAppDispatch } from "../../redux/hooks/hooks";
import {toggleCompleted, deleteTodo} from "../../redux/slice/todosSlice";

import { Todo } from "../../types";

interface Props {
    todo: Todo;
}


export default function TodoListItem({todo}: Props) {

    const dispatch = useAppDispatch();

    const handleChange = (t: Todo) => {
        dispatch(toggleCompleted(t));
    }

    const handleDelete = (t: Todo) => {
        dispatch(deleteTodo(t));
    }


    return (
        <div className="bg-zinc-800 mb-2 w-6xl rounded-lg">
            <div className="p-4 w-full">  
                <div className="flex items-center justify-between">  
                    <div className="flex items-center">
                        <input id={todo.id.toString()} type="checkbox" name="A3-confirmation" value="yes" className="opacity-0 absolute h-8 w-8" checked={todo.checked} onChange={() => handleChange(todo)} />  
                        <div className="bg-zinc-900 border-2 rounded-md border-zinc-700 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">  
                            <svg className="fillCurrent hidden w-3 h-3 text-blue-600 pointer-events-none" version="1.1" viewBox="0 0 17 12" xmlns="http://www.w3.org/2000/svg">  
                                <g fill="none" fillRule="evenodd">  
                                <g transform="translate(-9 -11)" fill="#1F73F1" fillRule="nonzero">  
                                    <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />  
                                </g>  
                                </g>  
                            </svg>  
                        </div>  
                        
                        <label htmlFor={todo.id.toString()} className={`select-none text-zinc-300 font-medium ${todo.checked ? 'line-through' : ''}`}>{todo.label}</label>
                    </div>
                    <div className="cursor-pointer pl-5" onClick={() => handleDelete(todo)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 512 512"><title>Trash</title><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="#fca5a5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/><path stroke="#fca5a5" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M80 112h352"/><path d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224" fill="none" stroke="#fca5a5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/></svg>
                    </div>  
                </div>  
            </div>
        </div>
    )
}
