import React from "react"
import {IonModal, IonItem, IonLabel, IonInput, IonButton, IonDatetime} from "@ionic/react"

import "./styles.css"

const Modal = ({ addTodo, setSelectedDate, currentDate, selectedDate, inputValue, setInputValue, isModalOpen, setModalOpen }) => {

  return (
    <IonModal isOpen={isModalOpen} cssClass={"modal"}>
      <div className="openedModal">
        <IonButton color="danger" className={"close-button"} onClick={setModalOpen.bind(null, false)}>X</IonButton>
        <IonItem>
          <IonLabel position="floating">Write your new todo here</IonLabel>
          <IonInput 
            value={inputValue} 
            onIonChange={(e) => {
              setInputValue(e.target.value)
              }
            }
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                addTodo()
              }
            }}  
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Choose deadline</IonLabel>
          <IonDatetime 
            displayFormat="DD MMM YYYY"
            max="2022-12-31"
            min={currentDate}
            value={selectedDate}
            onIonChange={e => setSelectedDate(e.detail.value)}>
          </IonDatetime>
        </IonItem>
        <IonButton 
          color="success"
          className={inputValue.trim() 
            ? "buttonAddEmptyModal" 
            : "buttonAddFullModal"} 
          onClick={ function(){ addTodo(); setSelectedDate(currentDate) }} 
          disabled={!inputValue.trim()}
        >Add todo</IonButton>
      </div>
    </IonModal>
  )
}

export default Modal
