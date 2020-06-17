import React, { Component } from 'react'
import { connect } from 'react-redux'
import {apiCaller} from '../../apiCaller'
import Ad from '../../components/Ads/Ad/Ad'
import axios from 'axios'
import {Link} from 'react-router-dom'

class Ads extends Component {
    state = {
        ads: [],
    }
    
    componentDidMount() {
        apiCaller().get('eventdetail/all')
        .then(res => {
            let publicIDs =[]
            for(let i = 0; i < res.data.length; i++){
                if(res.data[i].type == "public" && res.data[i].value == "true"){
                    publicIDs.push(res.data[i].event.eventid)
                }
            }
            console.log(`ID: ${publicIDs}`)
            publicIDs.forEach((item)=>{
                
                apiCaller().get('/event/get/' + item)
                .then(res=>{
                    console.log('data')
                    console.log(res.data)
                    const newAds = [...this.state.ads, res.data]
                    this.setState({ads:newAds})
                })
            })
            }).catch(err=>{
                console.log(err)
            })
    }
    
    render() {
        let ads = this.state.ads.map((ad, adIndex)=>{
            return(
                <Link to={"/PublicEvent/" + ad.eventid}>
                    <Ad eventType={ad.eventtype} address={ad.address} description={ad.description}></Ad>
                </Link>)
        })
        return (
            <div className="ads">
                {ads}
            </div>
        )
    }
}

export default Ads