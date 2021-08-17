import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faSignInAlt, faBars } from "@fortawesome/free-solid-svg-icons"

import "./styles.css"
import { changeTheme, logout } from '../../redux/actions'
import BurgerMenu from '../BurgerMenu'

const Header = () => {

	const [menuIsOpen, setMenuOpen] = useState(false)

	const { themeIsDay, user } = useSelector(state => state)
	const dispatch = useDispatch()
	const triggerNight = () => {
		dispatch(changeTheme(!themeIsDay))
	}
	const triggerLogout = () => {
		dispatch(logout())
	}
	const toggleMenu = () => {
		setMenuOpen(!menuIsOpen)
	}

	return (
		<div className="header">
			<button className={"burgerMenuButton"} onClick={toggleMenu}>
				<FontAwesomeIcon
					className={"icon"}
					icon={faBars}
					size="2x"
				/></button>
			<div className={"userName"}>
				what's up, {user.name}
			</div>
			<button onClick={triggerLogout} className={"buttonNav"}>
				<FontAwesomeIcon
					className={"icon"}
					icon={faSignInAlt}
					size="2x"
				/>
			</button>
			<button onClick={triggerNight} className={"buttonNav"}>
				<FontAwesomeIcon
					className={"icon"}
					icon={themeIsDay ? faSun : faMoon}
					size="2x"
				/>
			</button>
			<div>{menuIsOpen ? <BurgerMenu setMenuOpen={setMenuOpen}/> : null}</div>
		</div>
	)
}

export default Header