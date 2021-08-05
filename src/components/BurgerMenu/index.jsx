import { slide as Menu } from 'react-burger-menu'
import { NavLink } from "react-router-dom"

const BurgerMenu = () => {

	return (
	  <Menu>
			<NavLink to="/"> All </NavLink>
			<NavLink to="/important"> important </NavLink>
			<NavLink to="/checked"> checked </NavLink>
			<NavLink to="/weather"> weather </NavLink>
	  </Menu>
	  );
	}

export default BurgerMenu