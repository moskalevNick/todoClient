import {IonButton, IonLabel, IonItem, IonInput, IonRouterLink, IonToast} from "@ionic/react"
import "./styles.css"
import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { login } from '../../redux/actions';

const Auth = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
 	const dispatch = useDispatch()

   
  const { showToast, messageException } = useSelector(state => state)

	return (
    <div className="loginContainer">
      <IonItem >
        <IonLabel 
          className="ionItem" 
          position="floating"
        >Username</IonLabel>
        <IonInput
          onIonChange={e => setName(e.target.value) }
          value={name}
          type="text"/>
      </IonItem>
      <IonItem>
        <IonLabel 
          position="floating"
        >Password</IonLabel>
        <IonInput
          type="password"
          onIonChange={e => setPassword(e.target.value)}
          value={password}/>
      </IonItem>
      <IonButton 
        className="ion-margin-top" 
        type="submit" 
        expand="block" 
        onClick={() => dispatch(login(name, password)) }
      >Login
      </IonButton>
      <div className="noAcc">
        <IonRouterLink color="secondary" href='/registration'>I don't have an account</IonRouterLink>
      </div>
      <IonToast
        isOpen={showToast}
        message={messageException}
        duration={3000}
      />
    </div>    
  )}

export default Auth