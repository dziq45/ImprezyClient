import React, { Component } from 'react'
import { connect } from 'react-redux'

import Ad from '../../components/Ads/Ad/Ad'
import axios from 'axios'

class Ads extends Component {
    state = {
        ads: []
    }
    
    componentDidMount() {
        axios.get('https://event-app-d5b97.firebaseio.com/event.json')
            .then(response => {
                console.log(response)
                const ads = response.data
                this.setState({ ads: Array.from(ads) })
            })
    }
    
    render() {
        console.log(this.state.ads)
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
        */
        return (
            <div className="ads">
                { this.state.ads.map(ad => 
                    <p>ZIEMNIAKI</p>
                )}
            </div>
        )
    }
}

export default Ads