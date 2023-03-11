import { Toaster } from "react-hot-toast";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import TodoResults from "./components/TodoResults";

const App = () => {
  return (
    <div className="bg-zinc-900 relative w-full flex flex-col justify-center items-center">
      <Toaster/>
      <h1 className="text-4xl font-bold my-10 text-zinc-400">Things to do</h1>
      <AddTodo />
      <TodoResults />
      <TodoList />
    </div>
  );
};

export default App;
