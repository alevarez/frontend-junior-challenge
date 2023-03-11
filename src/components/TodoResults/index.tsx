import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";


export default function TodoResults() {


  const todosCompleted = useSelector(
    (state: RootState) => state.todos.todos.filter(todo => todo.checked)
  );
  
  return (
    <div className="text-2xl font-bold mb-6 text-zinc-400">Done: {todosCompleted.length}</div>
  )
}