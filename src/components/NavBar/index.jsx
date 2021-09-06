import React, {useEffect} from "react"
import {NavLink} from "react-router-dom"
import {useSelector} from 'react-redux'

import "./styles.css"

const NavBar = () => {

  const {themeIsDay} = useSelector(state => state)

  useEffect(() => {
    document.body.setAttribute('color-theme', themeIsDay ? "light" : "dark")
  }, [themeIsDay])

  return (
    <div className={'navBar-container'}>
      <nav className="navBar">
        <NavLink
          to="/"
          className="item" exact activeClassName="underline"
        >
          All
        </NavLink>
        <NavLink
          to="/important"
          className="item" exact activeClassName="underline"
        >
          Important
        </NavLink>
        <NavLink
          to="/checked"
          className="item" exact activeClassName="underline"
        >
          Checked
        </NavLink>
        <NavLink
          to="/weather"
          className="item" exact activeClassName="underline"
        >
          Weather
        </NavLink>
      </nav>
    </div>
  )
}

export default NavBar