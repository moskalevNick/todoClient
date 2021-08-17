import React from "react"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from 'classnames';

import "./styles.css"


const TodoItem = ( {element, changeTodo, triggerModalDelete} ) => {

  let todoNames = classNames({
    'label': true,
    'checkedTodo': element.checked,
    'importantTodo': element.important
  });
  
  let fullDateNow = new Date()
  let yearNow = fullDateNow.getFullYear()
  let monthNow = fullDateNow.getMonth() 
  monthNow += 1
  let dateNow = fullDateNow.getDate()
  let deadline = 'now'
  
  if (+element.date.slice(8,10) < dateNow && +element.date.slice(5,7) <= monthNow) {
    deadline = "late"
  }

  if (element.date.slice(8,10) -7 <= dateNow && +element.date.slice(8,10) > dateNow) {
    deadline = "this week"
  }

  if (+element.date.slice(8,10) === dateNow) {
    deadline = "now"
  }   

  if (element.date.slice(8,10) - 1 === dateNow) {
    deadline = "tomorrow"
  }

  if (element.date.slice(8,10) - 2 === dateNow) {
    deadline = "aftertomorrow"
  }

  if (element.date.slice(8,10) - 7 > dateNow) {
    deadline = "next week"
    if(+element.date.slice(5,7) === monthNow && element.date.slice(8,10) - 14 > dateNow){
      deadline = "this month"
    }
  } 

  if(element.date.slice(5,7) - 1 === monthNow){
    deadline = "next month"
  }
  
  if(element.date.slice(5,7) - 1 > monthNow){
    deadline = "this year"
  }

  if (element.date.slice(0,4) === (yearNow + 1).toString()) {
    deadline = "next year"
  }
  
  if (!element){
    return null
  }
  
  return (
    <div className={"todo"}>
      <input type="checkbox" slot="start" color="danger"
        checked={element.checked}
        onChange={changeTodo.bind(null, element._id, "checked")}
      />
      <div 
				className={ todoNames }  
				onClick={ changeTodo.bind(null, element._id, "important") }
			>
        { element.title }
      </div>
      <div>{deadline}</div>
      <button
        className={"deleteButton"} 
        onClick={triggerModalDelete.bind(null, element)}>
        <FontAwesomeIcon 
				  className={"icon"} 
				  icon={faTrash} 
			  />
      </button>
    </div>
  )
}

export default TodoItem 