import React, { Component } from 'react'

import Aux from '../Auxiliary/Auxiliary'
//import classes from './Layout.css'
import './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'


class Layout extends Component {
    render() {
        return (
            <Aux>
                <Toolbar/>
                <main className="Content">
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout