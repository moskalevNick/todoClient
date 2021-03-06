import React, { useState } from "react"
import "./styles.css"
import { NavLink } from "react-router-dom"

const BurgerMenu = ({ setMenuOpen, filterTodo, disabledButton, deadlines, type, onClose, isOpen }) => {

    const [isOverlay, setIsOverlay] = useState(false);
    
    const handleClose = () => {
        if (isOverlay) {
            console.log('dasfas');
            onClose();
        }
    };

    return (
        <>
            {isOpen ? (
                <div
                    className={'burger-overlay'}
                    onClick={() => handleClose()}
                >
                    <div
                        className={'content'}
                        onMouseEnter={setIsOverlay.bind(null, false)}
                        onMouseLeave={setIsOverlay.bind(null, true)}
                    >
                        <div className={'burgerMenu'} onClick={setMenuOpen.bind(null, false)}>
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
                            <div className={'header-sort'}>by deadlines:</div>
                            <div className={'dates'}>
                                {deadlines.map((deadline) => (
                                    <button className={'date-button'}
                                        disabled={disabledButton === deadline ? true : false}
                                        onClick={filterTodo.bind(null, type, deadline)}
                                        key={deadline}
                                    >
                                        <p>{deadline}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default BurgerMenu