import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-hot-toast";

import { apiUrl } from "../../utils/apiUrls";
import {Todo} from "../../types";

interface TodosState {
    todos: Todo[];
    status: "pending" | "succeeded" | "failed";
}


const initialState: TodosState = {
    todos: [],
    status: "pending",
}

export const fetchTodos = createAsyncThunk('todos/fetch', async (payload, {rejectWithValue}) => {
    
    try {
        const res = await axios.get<Todo[]>(apiUrl);
        return res.data;

        
    } catch (err: any) {
        toast.error(err.message);
        return rejectWithValue(err.response.status)
    }
});


export const toggleCompleted = createAsyncThunk('todos/completed', async (todo: Todo) => {
    
    try {
        const res = await axios.patch<Todo>(`${apiUrl}/${todo.id}`, {
            checked: !todo.checked
        }, {headers: {'Content-Type': 'application/json'}});

        return res.data.id
        
    } catch (err: any) {
        toast.error(err.message);
    }
});


export const createTodo = createAsyncThunk('todos/create', async (todoText: string) => {

    const todo = {
        label: todoText,
        checked: false,
    }
    
    try {
        const res = await axios.post<Todo>(apiUrl, todo, {headers: {'Content-Type': 'application/json'}});
        return res.data;
        
    } catch (err: any) {
        toast.error(err.message);
    }
});

export const deleteTodo = createAsyncThunk('todos/delete', async (todo: Todo) => {
    
    try {
        const resp = await axios.delete<Todo>(`${apiUrl}/${todo.id}`);
        
        
        if (resp.status === 200) {
            return todo.id
        }

    } catch (err: any) {
        toast.error(err.message);
    }
});

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.pending, (state) => {state.status = "pending"});
        builder.addCase(fetchTodos.fulfilled, (state, action) => {state.status = "succeeded"; state.todos = action.payload});
        builder.addCase(fetchTodos.rejected, (state) => {state.status = "failed"; state.todos = []});


        builder.addCase(toggleCompleted.pending, (state) => {state.status = "pending"});
        builder.addCase(toggleCompleted.fulfilled, (state, action) => {state.status = "succeeded"; state.todos = state.todos.map(todo => {
            if (todo.id === action.payload) {
                return {...todo, checked: !todo.checked}
            } 

            return todo

        })});
        builder.addCase(toggleCompleted.rejected, (state) => {state.status = "failed"});


        builder.addCase(createTodo.pending, (state) => {state.status = "pending"});
        builder.addCase(createTodo.fulfilled, (state, action) => {state.status = "succeeded"; state.todos = [action.payload!, ...state.todos]});
        builder.addCase(createTodo.rejected, (state) => {state.status = "failed"; state.todos = []});


        builder.addCase(deleteTodo.pending, (state) => {state.status = "pending"});
        builder.addCase(deleteTodo.fulfilled, (state, action) => {state.status = "succeeded"; state.todos = state.todos.filter(todo => todo.id !== action.payload)});
        builder.addCase(deleteTodo.rejected, (state, action) => {state.status = "failed"});
    } 
});


const todosReducer = todosSlice.reducer;

export {todosReducer};