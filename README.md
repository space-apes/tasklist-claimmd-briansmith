## to run this locally(copied these files directly from coderpad)
- npm install 
- npm start 
- navigate to localhost:3000

## notes
- i did not complete the final stretch goal of adding date fields because it is getting near the end of the day but if I did, I would have maintained two separate todo state arrays and then mapped through them sequentially when rendering App.I felt like that would be easier than trying to keep track of which index of todos was the cutoff. 

## React Todo List

The goal of this exercise is to create a working todo list with persistent data storage.

To start with, we have a styled todo list that supports adding todos. We also have premade styles for completed todo items. Although there's no working mechanism for "completing" a todo.

## Requirements

1. Clicking on a todo item should toggle the "checked" state.
2. The todo list state should be saved and loaded from local storage.
3. Checked items should sink to the bottom of the list automatically

## Stretch Goals

1. Allow todos to be deleted. When you hover your mouse over a todo, an X should appear on the far right side, clicking the X should remove it from the list.
2. Add hidden timestamps to todos (created_at, completed_at), these will be used for sorting
  - The active todos should be sorted by created_at descending
  - The completed todos should be sorted by completed_at ascending
