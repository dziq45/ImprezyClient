import React from 'react';

import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => {
    return (
        <ul className="NavigationItems">
            <NavigationItem link="/event">Wydarzenia</NavigationItem>
            <NavigationItem link="/auth">Logowanie</NavigationItem>
        </ul>
    )
}

export default navigationItems;