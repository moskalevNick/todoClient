import React, {useEffect}  from "react"
import { NavLink } from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux'
import {IonButton} from "@ionic/react"

import { faMoon, faSun, faSignInAlt, faExclamationCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./styles.css"
import {changeTheme, logout} from '../../redux/actions'

const NavBar = () => {
  
  const dispatch = useDispatch()
  const { themeIsDay, user } = useSelector(state => state)

  useEffect(() => {
    document.body.setAttribute('color-theme', themeIsDay ? "light" : "dark")
  }, [themeIsDay]) 

  const triggerNight = () => {
    dispatch(changeTheme(!themeIsDay))   
  }  

  return (
    <div>  
      <nav className="navBar">
        <div className="links">
          <NavLink 
            to="/" 
            className="navBar_item" exact activeClassName="underline" 
          >
            All
          </NavLink>
          <NavLink 
            to="/important" 
            className="navBar_item" exact activeClassName="underline"
          >
            Important
          </NavLink>
          <NavLink 
            to="/checked" 
            className="navBar_item" exact activeClassName="underline"
          >
            Checked
          </NavLink>
          <NavLink 
            to="/weather" 
            className="navBar_item" exact activeClassName="underline"
          >
            Weather
          </NavLink>
        </div>
        <div className="userName">
          {user.name}
        <FontAwesomeIcon 
          className={"iconMail"}
          hidden={user.isActivated}
          icon={faExclamationCircle}
          title='активируйте аккаунт'
        />
        </div>
        <div className="containerButtonChangeTheme">
          <NavLink to='/auth' className="buttonAuth" onClick={() => dispatch(logout())}>
          <FontAwesomeIcon 
            className={"icon"} 
            icon = {faSignInAlt} 
            size="2x"
          />
        </NavLink>
        <IonButton onClick={triggerNight} className="buttonChangeTheme">
          <FontAwesomeIcon 
            className={"icon"} 
            icon={themeIsDay ? faSun : faMoon} 
            size="2x"
          />
        </IonButton> 
        </div>
        
      </nav> 
    </div>  
	)
}

export default NavBar