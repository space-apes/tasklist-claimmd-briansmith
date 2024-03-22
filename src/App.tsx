import React, { useCallback, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import styled from "@emotion/styled";
import { AddInput } from "./components/AddInput";
import { TodoItem } from "./components/TodoItem";
import { TodoList } from "./components/TodoList";
import { Header } from "./components/Header";
import { ResetButton } from "./components/ResetButton";

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 300,
});

/**
* This is the initial todo state.
* Instead of loading this data on every reload,
* we should save the todo state to local storage,
* and restore on page load. This will give us
* persistent storage.
*/
const initialData: Todo[] = [
  {
    id: uuid(),
    label: "Buy groceries",
    checked: false,
    created_at: new Date().toISOString(),
    completed_at: ''
  },
  {
    id: uuid(),
    label: "Reboot computer",
    checked: false,
    created_at: new Date().toISOString(),
    completed_at: ''
  },
  {
    id: uuid(),
    label: "Ace CoderPad interview",
    checked: true,
    created_at: new Date().toISOString(),
    completed_at: new Date().toISOString()
  },
];

const setLocalStorageWithTodoArray = (todos: Todo[]): void => {
  try {
  localStorage.setItem("todoArray", JSON.stringify(todos));
  }catch(error){
    //in lieu of actual error handling just console.log
    console.log(error);
    throw(error);
  }
}

const getTodoArrayFromLocalStorage = (): Todo[] => {
  try {
    if (!localStorage.getItem('todoArray')){
      return [];
    }
    return JSON.parse(localStorage.getItem("todoArray") || '') as Todo[];
  }catch(error){
    //in lieu of actual error handling just console.log
    console.log(error);
    throw(error);
  }
}



/*
  attempt to create callback for sort function for all cases 

  active todos should be sorted before completed todos

  within active todos, higher created_at values should be at top

  within completed todos, lower completed_at values should be at top
*/

const todoSortCallback = (a: Todo, b: Todo): number =>{


  //active todos should always be before completed todos
  if (!a.completed_at && b.completed_at){
    return -1;
  }
  else if (a.completed_at && !b.completed_at){
    return 1
  }
  //active todos should have created_at with higher values move to the beginning
  else if (!a.completed_at && !b.completed_at){
    if (a.created_at >= b.created_at){
      return -1
    }
    else{
      return 1;
    }
  }
  //completed todos should have completed_at with lower values move to the beginning
  else {
    if (a.completed_at <= b.completed_at){
      return -1
    }
    else{
      return 1;
    }
  }
}


function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  //populate local storage if it is empty 
  //and only set todo state from local storage on first render
  useEffect(()=>{
    //if local storage is empty, populate with initialData
    if (getTodoArrayFromLocalStorage().length == 0){
      setLocalStorageWithTodoArray(initialData);
    }
    setTodos(getTodoArrayFromLocalStorage());
  }, []);

  //update local storage any time todos is changed
  useEffect(()=>{
    setLocalStorageWithTodoArray(todos);
  }, [todos]);
 
  /*
    when adding a new active Todo, ensure it is appended to bottom
    of active Todos (sorted by created_at ascending)

  */
  const addTodo = useCallback((label: string) => {
    const newActiveTodo = {
        id: uuid(),
        label,
        checked: false,
        created_at: new Date().toISOString(),
        completed_at: ''

    } as Todo;
    
    setTodos((prevTodos) => {
      //copy prev to avoid mutating state directly
      let prevTodosCopy: Todo[] = prevTodos.slice();

      prevTodosCopy.push(newActiveTodo);

      prevTodosCopy.sort(todoSortCallback);

      //sortTodoIntoActiveTodosById(newActiveTodo.id);

      return prevTodosCopy;
    });
  }, []);

  const handleDelete = useCallback((index: number) =>{
    
    setTodos((prevTodos)=>{

      //copy arrayto avoid mutating state directly 
      const copyOfPrevTodos = prevTodos.slice();
      copyOfPrevTodos.splice(index, 1);
      return copyOfPrevTodos; 
    });
    
  }, []);


  const handleChange = useCallback((checked: boolean, id: string) => {

    setTodos((prevTodos) =>{

      //copy array to avoid mutating state directly 
      let copyOfPrevTodos = prevTodos.slice();
     
      //find index of todo to alter then set it's 'checked'
      const indexOfChangedTodo = copyOfPrevTodos.findIndex((todo)=>todo.id == id)
      copyOfPrevTodos[indexOfChangedTodo]['checked'] = checked;

      //if setting it as completed, add completed_at value, otherwise set completed_at to empty string
      if (checked){
        copyOfPrevTodos[indexOfChangedTodo].completed_at = new Date().toISOString();
      }
      else{
        copyOfPrevTodos[indexOfChangedTodo].completed_at = '';
      }

      copyOfPrevTodos.sort(todoSortCallback);

      return copyOfPrevTodos;

    });

  }, []);



  return (
    <Wrapper>
      <Header>Todo List</Header>
      <ResetButton></ResetButton>
      <AddInput onAdd={addTodo} />
      <TodoList>
        {todos.map((todo, i) => (
          
          <TodoItem {...todo} key={todo.id} index = {i} onChange={handleChange} onDelete={handleDelete}/>
        ))}
      </TodoList>
    </Wrapper>
  );
}

export default App;
