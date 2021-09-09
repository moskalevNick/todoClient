import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPlusSquare, faTrashAlt, faCloudSunRain, faShareSquare } from "@fortawesome/free-solid-svg-icons"
import moment from 'moment'
import { NavLink } from "react-router-dom"

import { dateObjectFormatter, dateToStringFormatter } from '../../helpers/dateFormatter';
import { addTodo, changeTodo, removeAllChecked, removeTodo, setTodos } from '../../redux/actions'
import TodoList from "../TodoList"
import Meter from "../Meter"
import NewTodoModal from "../NewTodoModal"
import ModalDelete from "../ModalDelete"
import BurgerMenu from '../BurgerMenu'
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
  const [disabledButton, setDisabledButton] = useState('all')
  const [deadlines, setDeadlines] = useState([])
  const [menuIsOpen, setMenuOpen] = useState(false)

  const dispatch = useDispatch()
  const todos = useSelector(state => state.todos)

  useEffect(() => {
    if (todos.data) {
      const actualDeadlines = ['all']
      todos.data.forEach((el) => {
        if (!actualDeadlines.includes(el.deadline)) {
          actualDeadlines.push(el.deadline)
        }
      })
      setDeadlines(actualDeadlines)
    }
  }, [todos])

  useEffect(() => {
    if (todos.data) {
      const checked = todos.data.filter((todo) => todo.checked === true)
      setCheckedTodo((checked.length / todos.data.length) * 100)
      setAmount(todos.data.length)
    }
  }, [todos])

  useEffect(() => {
    dispatch(setTodos(type))
  }, [dispatch, type])

  const filterTodo = (type, deadline) => {
    setDisabledButton(deadline)
    dispatch(setTodos(type, deadline))
  }

  const triggerModal = () => {
    setModalOpen((prev) => !prev)
  }

  const triggerModalDelete = (data) => {
    setModalDeleteOpen((prev) => !prev)
    setAcceptTodo(data)
  }

  const changeCurrentTodo = (id, typeTheme) => {
    dispatch(changeTodo(id, typeTheme, type))
    setDisabledButton('all')
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

  const toggleMenu = () => {
    setMenuOpen(!menuIsOpen)
  }

  return (
    <div>
      <div className={'menu-container'}>
        {
          menuIsOpen && 
          <BurgerMenu 
            setMenuOpen={setMenuOpen} 
            deadlines={deadlines} 
            disabledButton={disabledButton}
            filterTodo={filterTodo}
            type={type}
          />
        }
      </div>
      <div className={"title"}>
        <div className={'dates'}>
          {deadlines.map((deadline) => (
            <button className={'date-button'} disabled={disabledButton === deadline ? true : false} onClick={filterTodo.bind(null, type, deadline)} key={deadline}>
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
        todos={todos.data}
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
      <div className={'buttonsMobile-container'}>
        <button className={"mobile-button"} onClick={toggleMenu}>
          <FontAwesomeIcon
            className={"icon"}
            icon={faFilter}
            size="3x"
          />
        </button>
        <button className={"mobile-button"} onClick={triggerModal}>
          <FontAwesomeIcon
            className={"icon"}
            icon={faPlusSquare}
            size="3x"
          />
        </button>
        <button className={"mobile-button"} onClick={triggerModalDelete}>
          <FontAwesomeIcon
            className={"icon"}
            icon={faShareSquare}
            size="2x"
          />
          <FontAwesomeIcon
            className={"icon"}
            icon={faTrashAlt}
            size="2x"
          />
        </button>
        <NavLink
          className={"mobile-button"}
          to="/weather"
          onClick={setMenuOpen.bind(null, false)}
        >
          <FontAwesomeIcon
            className={"icon"}
            icon={faCloudSunRain}
            size="3x"
          />
        </NavLink>

      </div>
      
    </div>
  )
}

export default Container