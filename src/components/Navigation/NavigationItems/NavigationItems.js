import React from 'react';
import {connect} from 'react-redux'
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => {
    return (
        <ul className="NavigationItems">
            <NavigationItem link="/ads">Wydarzenia</NavigationItem>
            {console.log(props)}
            {props.isAuthenticated? 
                <NavigationItem link="/auth">Wyloguj</NavigationItem> : 
                <NavigationItem link="/auth">Logowanie</NavigationItem>}
            
        </ul>
    )
}
const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.token !== null,
      userType: state.auth.userType
    }
  }
export default connect(mapStateToProps)(navigationItems);