import React, {useEffect} from 'react'
import { useHistory } from "react-router-dom";
const RedirectToPrevious = (props)=>{
    const history = useHistory()
    history.goBack()
    useEffect(()=>{
        console.log(history)
    }, [])
    return(<div>

    </div>)
}
export default RedirectToPrevious