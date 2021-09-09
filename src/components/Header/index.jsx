import React from "react"
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoon, faSun, faSignInAlt} from "@fortawesome/free-solid-svg-icons"

import "./styles.css"
import {changeTheme, logout} from '../../redux/actions'

const Header = () => {

  const {themeIsDay, user} = useSelector(state => state)
  const dispatch = useDispatch()
  const triggerNight = () => {
    dispatch(changeTheme(!themeIsDay))
  }
  const triggerLogout = () => {
    dispatch(logout())
  }
  return (
    <div className="header">
      <div className={'hello-container'}>
        <p className={'hello'}>what's up, <span className={'name'}>{user.name}</span></p>
      </div>

      <div className={'button-container'}>
        <button onClick={triggerNight} className={"button-nav"}>
          <FontAwesomeIcon
            className={"icon"}
            icon={themeIsDay ? faSun : faMoon}
            size="2x"
          />
        </button>
      </div>

      <div className={'button-container'}>
        <button onClick={triggerLogout} className={"button-nav"}>
          <FontAwesomeIcon
            className={"icon"}
            icon={faSignInAlt}
            size="2x"
          />
        </button>
      </div>
    </div>
  )
}

export default Header