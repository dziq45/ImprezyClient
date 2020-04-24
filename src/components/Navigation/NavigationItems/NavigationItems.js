import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => {
    return (
        <ul>
            <NavigationItem link="/event">Wydarzenia</NavigationItem>
        </ul>
    )
}

export default navigationItems;