import React from "react"
import "./styles.css"
import {IonModal, IonButton} from "@ionic/react"

const ModalDelete = ({ isModalDeleteOpen, removeTodo, acceptTodo, setModalDeleteOpen, removeAllChecked }) => {
  return (
    <IonModal isOpen={isModalDeleteOpen} >
      <div className={"openedModal"}>
        <div className={"titleModal"}>
          Are you sure, you wanna delete {acceptTodo._id ? `"${acceptTodo.title}"` : "all checked todos"} ?
        </div>
        <div className={"buttonsDelete"}>
          <IonButton 
            color="success" 
            onClick={
            acceptTodo._id 
            ? removeTodo.bind(null, acceptTodo._id) 
            : removeAllChecked.bind(null, acceptTodo)}
          >sure</IonButton>
          <IonButton
            color="danger" 
            onClick={setModalDeleteOpen.bind(null, false)}
          >cancel</IonButton>
        </div>
      </div>
    </IonModal>
  )
}

export default ModalDelete
