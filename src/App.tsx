import React, { useCallback, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import styled from "@emotion/styled";
import { AddInput } from "./components/AddInput";
import { TodoItem } from "./components/TodoItem";
import { TodoList } from "./components/TodoList";
import { Header } from "./components/Header";
import { userInfo } from "os";

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
  },
  {
    id: uuid(),
    label: "Reboot computer",
    checked: false,
  },
  {
    id: uuid(),
    label: "Ace CoderPad interview",
    checked: true,
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
  
  const addTodo = useCallback((label: string) => {
    setTodos((prev) => [
      {
        id: uuid(),
        label,
        checked: false,
      },
      ...prev,
    ]);
  }, []);

  const handleDelete = useCallback((index: number) =>{
    
    setTodos((prevTodos)=>{

      //copy arrayto avoid mutating state directly 
      const copyOfPrevTodos = prevTodos.slice();
      copyOfPrevTodos.splice(index, 1);
      return copyOfPrevTodos; 
    });
    
  }, []);


  const handleChange = useCallback((checked: boolean, index: number) => {

    setTodos((prevTodos) =>{

      console.log(`handleChange index is ${index}`);
      //copy array to avoid mutating state directly 
      let copyOfPrevTodos = prevTodos.slice();
      copyOfPrevTodos[index]['checked'] = checked;
      
      //move to end of array if checked
      if (checked){
        let tempTodo:Todo = copyOfPrevTodos[index];
        copyOfPrevTodos.splice(index, 1);
        copyOfPrevTodos.push(tempTodo);
      }
      return copyOfPrevTodos;

    });

  }, []);



  return (
    <Wrapper>
      <Header>Todo List</Header>
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
