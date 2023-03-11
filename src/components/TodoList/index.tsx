import { useEffect } from "react";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../redux/hooks/hooks";

import {fetchTodos} from "../../redux/slice/todosSlice";
import { RootState } from "../../redux/store/store";
import ErrorComponent from "../ErrorComponent";


import TodoListItem from "../TodoListItem";

const TodoList = () => {

  const dispatch = useAppDispatch();

  const todos = useSelector(
    (state: RootState) => state.todos.todos
  );

  const status = useSelector(
    (state: RootState) => state.todos.status
  );

  useEffect(() => {
    dispatch(fetchTodos())
  }, [])


  return (
      <div className="flex flex-col mx-auto w-6xl mb-10 px-8">
        {todos.length > 0 ? todos.map(todo => (
          <TodoListItem key={todo.id} todo={todo} />
        )) : status === "failed" ? <ErrorComponent /> : <p className="my-10 text-zinc-600">Looks like you're absolutely free today!</p>}
        
      </div>
  );
};

export default TodoList;