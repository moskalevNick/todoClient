import { useState, useEffect } from 'react'
import { bubble as Menu } from 'react-burger-menu'
import { useDispatch } from 'react-redux'
import { NavLink } from "react-router-dom"
import { logout } from '../../redux/actions'

const BurgerMenu = () => {
 
	const [isMenuOpen, setMenuOpen] = useState(true)
	const dispatch = useDispatch()

	useEffect(() => {
		setMenuOpen(true)
	  }, [isMenuOpen])

	useEffect(() => {
		setMenuOpen(false)
	  }, [])

	return (
	  <Menu isOpen={ isMenuOpen }>
			<NavLink to="/" onClick={() => setMenuOpen(false)}> All </NavLink>
			<NavLink to="/important" onClick={() => setMenuOpen(false)}> important </NavLink>
			<NavLink to="/checked" onClick={() => setMenuOpen(false)}> checked </NavLink>
			<NavLink to="/weather" onClick={() => setMenuOpen(false)}> weather </NavLink>
			<NavLink to="/weather" onClick={() => dispatch(logout())}> logout </NavLink>
	  </Menu>
	  );
	}

export default BurgerMenu