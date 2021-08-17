import React, { useEffect } from "react"
import { NavLink } from "react-router-dom"
import { useSelector } from 'react-redux'

import "./styles.css"

const NavBar = () => {

  const { themeIsDay } = useSelector(state => state)

  useEffect(() => {
    document.body.setAttribute('color-theme', themeIsDay ? "light" : "dark")
  }, [themeIsDay])

  return (
    <nav className="navBar">
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
    </nav>
  )
}

export default NavBar