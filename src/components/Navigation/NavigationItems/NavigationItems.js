import React from 'react';
import {connect} from 'react-redux'
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
const navigationItems = (props) => {
    return (
        <ul className="NavigationItems">
            <NavigationItem link="/ads">Wydarzenia</NavigationItem>
            <NavigationItem link="/myEvents">Moje wydarzenia</NavigationItem> 
            {console.log(props)}
            {props.isAuthenticated? 
            <Aux>
                <NavigationItem link="/myEvents">Moje wydarzenia</NavigationItem>
                <NavigationItem link="/msg">Wiadomości</NavigationItem>
                <NavigationItem link="/logout">Wyloguj</NavigationItem>
            </Aux>
                 : 

                <NavigationItem link="/auth">Logowanie</NavigationItem>
                }
            
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