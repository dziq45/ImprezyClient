import React, { Component } from 'react'

import Aux from '../Auxiliary/Auxiliary'
//import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'


class Layout extends Component {
    render() {
        return (
            <Aux>
                <Toolbar/>
                <main>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout