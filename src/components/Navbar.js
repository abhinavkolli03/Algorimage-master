import React from 'react';
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from './NavBarElements.js';
import AlgorLogo from './images/logo.svg'

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavLink to="/home">
                    <img src={AlgorLogo}
                    alt="log"/>
                    <h2>AlgorImage</h2>
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLink to="/pathfinder">
                        Pathfinder
                    </NavLink>
                    <NavLink to="/tree-traversal">
                        Tree Traversal
                    </NavLink>
                    <NavLink to="/search-and-sort">
                        Search And Sort
                    </NavLink>
                    <NavLink to="/other-ai">
                        Other AI
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    )
}
export default Navbar;