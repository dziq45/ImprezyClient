import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary'

class Publication extends Component {
    state={

    }
    componentDidMount(){
        
    }
    render(){
        return(
            <Aux>
                <div>Publication</div>
                <label className="switch-wrap">
                    <input type="checkbox" />
                    <div className="switch"></div>
                </label>
            </Aux>
        )
    }
}

export default Publication