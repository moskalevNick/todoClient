import React from "react"
import "./styles.css"
import { NavLink } from "react-router-dom"

const BurgerMenu = ({setMenuOpen}) => {

    return (
        <div>
            <div className={'burgerMenu'}>
                <button onClick={setMenuOpen.bind(null, false)} className={"buttonCloseMenu"}>x</button>
                <NavLink
                    to="/"
                    className="burgerItem" exact activeClassName="underline"
                    onClick={setMenuOpen.bind(null, false)}
                >
                    All
                </NavLink>
                <NavLink
                    to="/important"
                    className="burgerItem" exact activeClassName="underline"
                    onClick={setMenuOpen.bind(null, false)}
                >
                    Important
                </NavLink>
                <NavLink
                    to="/checked"
                    className="burgerItem" exact activeClassName="underline"
                    onClick={setMenuOpen.bind(null, false)}
                >
                    Checked
                </NavLink>
                <NavLink
                    to="/weather"
                    className="burgerItem" exact activeClassName="underline"
                    onClick={setMenuOpen.bind(null, false)}
                >
                    Weather
                </NavLink>
            </div>
        </div>
    )
}

export default BurgerMenu