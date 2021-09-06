import React from "react"

import {faTrash} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import classNames from 'classnames';

import "./styles.css"


const TodoItem = ({element, changeTodo, triggerModalDelete}) => {

  let todoNames = classNames({
    'label': true,
    'checkedTodo': element.checked,
    'importantTodo': element.important
  });

  if (!element) {
    return null
  }

  return (
    <div className={"todo"}>
      <div className={'checkbox-container'}>
        <input type="checkbox" slot="start" color="danger"
               checked={element.checked}
               onChange={changeTodo.bind(null, element._id, "checked")}
        />
      </div>

      <div className={"info-container"}>
        <div
          className={todoNames}
          onClick={changeTodo.bind(null, element._id, "important")}
        >
          {element.title}
        </div>
        <p className={'text'}>{element.deadline}</p>
      </div>
      <div className={'button-container'}>
        <button
          className={"button"}
          onClick={triggerModalDelete.bind(null, element)}>
          <FontAwesomeIcon icon={faTrash}/>
        </button>
      </div>
    </div>
  )
}

export default TodoItem 