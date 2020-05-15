import React, { Component } from 'react'
import { connect } from 'react-redux'

import Ad from '../../components/Ads/Ad/Ad'
import axios from 'axios'

class Ads extends Component {
    state = {
        ads: [],
    }
    
    componentDidMount() {
        axios.get('eventdetail/all')
        .then(res => {
            let publicIDs =[]
            for(let i = 0; i < res.data.length; i++){
                if(res.data[i].type == "public" && res.data[i].value == "true"){
                    publicIDs.push(res.data[i].event.eventid)
                }
            }
            console.log(`ID: ${publicIDs}`)
            publicIDs.forEach((item)=>{
                axios.get('/event/get/' + item)
                .then(res=>{
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
        let ads = this.state.ads.map((ad, adIndex)=>
        <Ad eventType={ad.eventtype} address={ad.address} description={ad.description}></Ad>)
        /*
        const ads = []
        for(let key in this.state.ads) {
            ads.push({
                id: key,
                config: this.state.ads[key]
            })
        }

        const adElements = ads.map(ad => (
            <Ad
                address={ad.addressID}
                eventType={ad.eventType}
                />
        ))
                        
                { this.state.ads.map(ad => 
                    <p>ZIEMNIAKI</p>
                )}
        */
        return (
            <div className="ads">
                {ads}
            </div>
        )
    }
}

export default Ads