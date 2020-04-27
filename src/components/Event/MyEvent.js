import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'


const MyEvent = (props) => {
    return (
        <div className="ad-box">
            <Link onClick={()=>props.setActiveEventId(props.id)} to ={"/Event/" + props.id}>
                <p>{props.description}</p>
                <p>{props.id}</p>
            </Link>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setActiveEventId: (eventId) => dispatch(actions.setActiveEventId(eventId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(MyEvent)