import React, {useState} from "react"
import {useDispatch, useSelector} from 'react-redux'
import {IonButton, IonLabel, IonItem, IonInput, IonRouterLink, useIonToast, IonToast } from "@ionic/react"
import "./styles.css"
import {registration} from '../../redux/actions'

const Registration = () => {
	const [inputEmailValue, setInputEmailValue] = useState("")
	const [inputPasswordValue, setInputPasswordValue] = useState("")
	const [inputReplacePasswordValue, setInputReplacePasswordValue] = useState("")
	const [inputNameValue, setInputNameValue] = useState("")
  const [present, dismiss] = useIonToast();
    
  const dispatch = useDispatch()
  
  const { showToast, messageException } = useSelector(state => state)

  const cardOfUser = () => {
    if(inputPasswordValue === inputReplacePasswordValue){
      dispatch(registration( inputEmailValue, inputPasswordValue, inputNameValue ))
      setInputEmailValue('')
      setInputPasswordValue('')
      setInputReplacePasswordValue('')
      setInputNameValue('')
      dismiss()
    }else{  
      present('passwords mismatch', 3000)
      setInputPasswordValue('')
      setInputReplacePasswordValue('')
    }
  }

  return ( 
    <div className="registrContainer">
      <IonItem >
        <IonLabel className="ionItem" position="floating">Email</IonLabel>
        <IonInput 
          value={inputEmailValue} 
          onIonChange={(e) => {
            setInputEmailValue(e.target.value)
          }} 
        />
      </IonItem>
      <IonItem >
        <IonLabel className="ionItem" position="floating">User name</IonLabel>
        <IonInput 
          value={inputNameValue} 
          onIonChange={(e) => {
            setInputNameValue(e.target.value)
          }} 
        />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Password</IonLabel>
        <IonInput 
          type="password" 
          value={inputPasswordValue} 
          onIonChange={(e) => {
            setInputPasswordValue(e.target.value)
          }} 
        />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Replace password</IonLabel>
        <IonInput 
          type="password" 
          value={inputReplacePasswordValue} 
          onIonChange={(e) => {
            setInputReplacePasswordValue(e.target.value)
          }} 
        />
      </IonItem>
      <IonButton 
        onClick={cardOfUser}
        expand="block"
      >
        Registration
      </IonButton>
      <div className="noAcc">
        <IonRouterLink color="secondary" href='/auth'>I have an account</IonRouterLink>
      </div>
      <IonToast
        isOpen={showToast}
        message={messageException}
        duration={3000}
      />
    </div>    
  )}

export default Registration