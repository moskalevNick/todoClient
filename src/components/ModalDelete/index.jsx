import React from "react"
import "./styles.css"
import { Modal } from "../../ui/Modal"

const ModalDelete = ({ isModalDeleteOpen, removeTodo, acceptTodo, setModalDeleteOpen, removeAllChecked }) => {
  return (
    <Modal isOpen={isModalDeleteOpen}>
      <div className={"delete-modal"}>
        <div className={"title-modal"}>
          Are you sure, you wanna delete {acceptTodo._id ? `"${acceptTodo.title}"` : "all checked todos"} ?
        </div>
        <div className={"buttons-delete"}>
          <button 
            className={"button-sure"}
            onClick={
            acceptTodo._id 
            ? removeTodo.bind(null, acceptTodo._id) 
            : removeAllChecked.bind(null, acceptTodo)}
          >sure</button>
          <button
            className={"button-cancel"}
            onClick={setModalDeleteOpen.bind(null, false)}
          >cancel</button>
        </div>
      </div>
    </Modal>
  )
}

export default ModalDelete
