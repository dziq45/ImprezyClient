import React, {useEffect, useState} from 'react'
import fbicon from './images/fbicon.png'
import yticon from './images/yticon.png'
import igicon from './images/igicon.png'
import twitterIcon from './images/twittericon.png'
const ExternalLink =(props)=>{
    const [linkType, setLinkType] = useState('')
    const [link, setLink] = useState('')
    useEffect(()=>{
        if(props.link.search('https')==0){
            setLink(props.link)
        }
        else{
            setLink('https://' + props.link)
        }
        if(props.link.search('facebook') >= 0){
            setLinkType('facebook')
        }
        else if(props.link.search('youtube') >= 0){
            setLinkType('youtube')
        }
        else if(props.link.search('instagram') >= 0){
            setLinkType('instagram')
        }
        else if(props.link.search('twitter') >= 0){
            setLinkType('twitter')
        }
    }, [props.link])
    const renderSwitchParam = (param) =>{
        switch (linkType) {
            case 'youtube':
                return <a href={link}>
                    <img src={yticon} width="52" height="52"></img>
                </a>     
            case 'facebook':
                return <a href={link}>
                    <img src={fbicon} width="52" height="52"></img>
                </a>
            case 'instagram':
                return <a href={link}>
                    <img src={igicon} width="52" height="52"></img>
                </a>
            case 'twitter':
                return <a href={link}>
                    <img src={twitterIcon} width="52" height="52"></img>
                </a>
            default:
                return <a href={props.link}>
                    {props.link}
                </a>
        }
    }
    return(
        <>
            {renderSwitchParam(linkType)}
        </> 
    )
}
export default ExternalLink