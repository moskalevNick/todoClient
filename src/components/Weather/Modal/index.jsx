import React from "react"
import {IonItem, IonLabel, IonInput, IonButton} from "@ionic/react"
import {Modal} from "../../../ui/Modal"

import "./styles.css"

const WeatherModal = ({ isModalChangeCityOpen, setModalChangeCityOpen, setInputValue, inputValue, changeCity, isCityValid }) => {
  return (
    <Modal isOpen={isModalChangeCityOpen} onClose={setModalChangeCityOpen}>
      <div className={"weather-modal"}>
        <IonButton 
          color="danger" 
          className={"close-button"} 
          onClick={setModalChangeCityOpen.bind(null, false)}
        >X</IonButton>
        <div>
          <IonItem>
            <IonLabel position="floating">Write your city here</IonLabel>
            <IonInput 
              className={'input-modal'}
              clear-input='true'
              value={inputValue} 
              onIonChange={(e) => {
                setInputValue(e.target.value)
                }
              }
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  changeCity()
                }
              }}  
            ></IonInput>
          </IonItem>
          {
            !isCityValid && <div className={"invalidCity"}> invalid city, enter city with → </div>
          }
          <div className={"container-link"}>
            <a className={"example-link"} target={"_blank"} rel="noreferrer" 
              href="http://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat=53.9173&lon=27.5290&zoom=10"
            >example</a>
          </div>
        </div>
        <IonButton 
          color="success"
          onClick={changeCity} 
          disabled={!inputValue.trim()}
          className={'change-button'}
        >Change</IonButton>
      </div>
    </Modal>
  )
}

export default WeatherModal
