import React from "react"
import TodoItem from "../TodoItem"
import "./styles.css"

const TodoList = ( {todos, changeTodo, triggerModalDelete} ) => {
  if (!todos){
    return null
  }
  return (
    <div className={"list"}>
        {todos.length === 0 && <p className={"noTodos"}>there are no todos yet <br/>(or they waiting from server)</p>}
        {todos.map((element) => (
          <TodoItem 
            triggerModalDelete={triggerModalDelete}
            changeTodo={changeTodo}
            key={element._id} 
            element={element} 
          />
        ))}
    </div>
  )
}

export default TodoList