import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import { dateObjectFormatter, dateToStringFormatter } from '../../helpers/dateFormatter';
import { deadLineDate } from '../../hooks/useDeadLineDate'
import { addTodo, changeTodo, removeAllChecked, removeTodo, setTodos } from '../../redux/actions'
import TodoList from "../TodoList"
import Meter from "../Meter"
import NewTodoModal from "../NewTodoModal"
import ModalDelete from "../ModalDelete"
import "./styles.css"

const Container = ({ type = "main" }) => {
  const d = new Date()
  let nowDate = d.getDate();
  let nowMonth = d.getMonth() + 1;
  const nowYear = d.getFullYear()

  if (nowDate < 10) {
    nowDate = '0' + nowDate
  }

  if (nowMonth < 10) {
    nowMonth = '0' + nowMonth
  }

  let currentDate = nowYear + "-" + nowMonth + "-" + nowDate

  const [amount, setAmount] = useState(0)
  const [isModalOpen, setModalOpen] = useState(false)
  const [checkedTodo, setCheckedTodo] = useState(0)
  const [isModalDeleteOpen, setModalDeleteOpen] = useState(false)
  const [acceptTodo, setAcceptTodo] = useState({})
  const [inputValue, setInputValue] = useState("")
  const [date, setDate] = useState(dateObjectFormatter(moment(Date.now()).format('YYYY-MM-DD')));

  const dispatch = useDispatch()
  const todos = useSelector(state => state.todos)

  const deadlines = []
  if (todos.data) {
    todos.data.forEach((el) => {
      Object.assign(el, { deadline: deadLineDate(el.date) })
      if(!deadlines.includes(el.deadline)){
        deadlines.push(el.deadline)
      }
    })
  }

  useEffect(() => {
    if (todos.data) {
      const checked = todos.data.filter((todo) => todo.checked === true)
      setCheckedTodo((checked.length / todos.data.length) * 100)
      setAmount(todos.data.length)
    }
  }, [todos])

  useEffect(() => {
    dispatch(setTodos())
  }, [dispatch])

  const currentTodos = useMemo(() => {
    if (!todos.data) {
      return null
    }
    if (type === "important") {
      return todos.data.filter((todo) => todo.important === true)
    } else if (type === "checked") {
      return todos.data.filter((todo) => todo.checked === true)
    } else {
      return todos.data
    }
  }, [todos, type])

  const triggerModal = () => {
    setModalOpen((prev) => !prev)
  }

  const triggerModalDelete = (data) => {
    setModalDeleteOpen((prev) => !prev)
    setAcceptTodo(data)
  }

  const changeCurrentTodo = (id, type) => {
    dispatch(changeTodo(id, type))
  }

  const addNewTodo = () => {
    dispatch(addTodo(inputValue, dateToStringFormatter(date)))
    setModalOpen(false)
    setInputValue("")
  }

  const removeTodoById = (id) => {
    dispatch(removeTodo(id))
    setModalDeleteOpen(false)
  }

  const removeCheckedTodos = () => {
    dispatch(removeAllChecked())
    setModalDeleteOpen(false)
  }
  
  const filterTodo = (deadline) => {
    return currentTodos.filter((el) => el.deadline === deadline)
  }

  return (
    <div>
      <div className={"title"}>
        <div className={'dates'}>
          {deadlines.map((deadline) => ( 
            <button className={'date-button'} onClick={filterTodo.bind(null, deadline)} key={deadline}>
              <p>{deadline}</p>
            </button>
            ))}
        </div>
        <div className={'info'}>
          <p className={'text'}>you have {amount} goals</p>
          <button className={'button'} onClick={triggerModal}>
            Add new todo
          </button>
        </div>
      </div>
      <TodoList
        todos={currentTodos}
        changeTodo={changeCurrentTodo}
        triggerModalDelete={triggerModalDelete}
      />
      <Meter checkedTodo={checkedTodo} />
      <ModalDelete
        setModalDeleteOpen={setModalDeleteOpen}
        isModalDeleteOpen={isModalDeleteOpen}
        triggerModalDelete={triggerModalDelete}
        acceptTodo={acceptTodo}
        removeTodo={removeTodoById}
        removeAllChecked={removeCheckedTodos}
      />
      <NewTodoModal
        setInputValue={setInputValue}
        setModalOpen={setModalOpen}
        isModalOpen={isModalOpen}
        inputValue={inputValue}
        addTodo={addNewTodo}
        date={date}
        setDate={setDate}
        currentDate={currentDate}
      />
      <div className={"stat"}>
        <button
          className={"button"}
          onClick={triggerModalDelete}
          disabled={!checkedTodo}
        >Delete all checked</button>
      </div>
    </div>
  )
}

export default Container