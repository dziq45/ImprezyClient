import React from 'react'

//import classes from './Toolbar.css'
import './Toolbar.css'
import NavigationItems from '../NavigationItems/NavigationItems'

const toolbar = (props) => (
    <header className="Toolbar">
        <nav className="DesktopOnly">
            <NavigationItems/>
        </nav>
    </header>
)

export default toolbar