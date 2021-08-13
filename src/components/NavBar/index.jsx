import React, {useEffect}  from "react"
import { NavLink } from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux'
import {IonButton} from "@ionic/react"

import { faMoon, faSun, faSignInAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./styles.css"
import {changeTheme, logout} from '../../redux/actions'
import BurgerMenu from "../BurgerMenu"

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
    <div id="App">  
      <div className="burgerMenu"><BurgerMenu pageWrapId={"page-wrap"} outerContainerId={"App"}/></div>
      <nav className="navBar" id="page-wrap">
        <div className="links" >
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
        <div className="userName">what's up, {user.name}</div>
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
      <hr />
    </div>  
	)
}

export default NavBar