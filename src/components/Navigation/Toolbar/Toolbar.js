import React from 'react'

import classes from './Toolbar.css'
import NavigationItems from '../NavigationItems/NavigationItems'

const toolbar = (props) => (
    <header>
        <nav>
            <NavigationItems/>
        </nav>
    </header>
)

export default toolbar