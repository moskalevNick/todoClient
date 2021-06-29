import React, {useState, useEffect, useMemo} from "react"
import {useDispatch, useSelector} from 'react-redux'
import {IonButton} from "@ionic/react"

import {setTodos, removeTodo, addTodo, changeTodo, removeAllChecked} from '../../redux/actions'
import TodoList from "../TodoList"
import Meter from "../Meter"
import Modal from "../Modal"
import ModalDelete from "../ModalDelete"
import "./styles.css"

const Container = ({type="main"}) => {
	const [amount, setAmount] = useState(0)
	const [isModalOpen, setModalOpen] = useState(false)
	const [checkedTodo, setCheckedTodo] = useState(0)
	const [isModalDeleteOpen, setModalDeleteOpen] = useState(false)
 	const [acceptTodo, setAcceptTodo] = useState({})
	const [inputValue, setInputValue] = useState("")
  
  const dispatch = useDispatch()
  const { todos } = useSelector(state => state)

  useEffect(() => {
    if(todos){
      const checked = todos.data.filter((todo) => todo.checked === true)
      setCheckedTodo((checked.length / todos.data.length) * 100)
      setAmount(todos.data.length)
    }  
  }, [todos])

  useEffect(() => {
    dispatch(setTodos())    
  }, [dispatch])

  const currentTodos = useMemo(() => {
    if (!todos){
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
    dispatch(addTodo(inputValue))
    setModalOpen(false)
    setInputValue("")
  }

	const removeTodoById = (id) => {
    dispatch(removeTodo(id))
    setModalDeleteOpen(false)
  }

	const removeCheckedTodos = async () => {
    dispatch(removeAllChecked())
    setModalDeleteOpen(false)
  } 

	return (
    <div className="box">
			<div className={"amount"}>
        <div className="content">
   			  <h1 className={"title"}>you have {amount} goals</h1>
          <IonButton color="success" onClick={triggerModal} className={"plus"}>+</IonButton>
        </div>
      </div>     
			<TodoList 
        todos={currentTodos}
        changeTodo={changeCurrentTodo}
        triggerModalDelete={triggerModalDelete}
      />
      <Meter checkedTodo={checkedTodo}/>
			<ModalDelete
        setModalDeleteOpen={setModalDeleteOpen}
        isModalDeleteOpen={isModalDeleteOpen}
        triggerModalDelete={triggerModalDelete}
        acceptTodo={acceptTodo}
        removeTodo={removeTodoById}
        removeAllChecked={removeCheckedTodos}
      />
      <Modal
        setInputValue={setInputValue}
        setModalOpen={setModalOpen}
        isModalOpen={isModalOpen}
        inputValue={inputValue}
        addTodo={addNewTodo}
      />
      <div className={"stat"}>
        <IonButton 
          color="danger" 
          onClick={triggerModalDelete} 
          disabled={!checkedTodo}
        >Delete all checked</IonButton>
      </div>    
		</div>
  )
}

export default Container