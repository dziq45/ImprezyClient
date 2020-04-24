import React from 'react';

//import classes from './NavigationItems.css';
import './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => {
    return (
        <ul className="NavigationItems">
            <NavigationItem link="/event">Wydarzenia</NavigationItem>
        </ul>
    )
}

export default navigationItems;