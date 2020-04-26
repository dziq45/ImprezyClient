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
                this.setState({ ads: response.data })
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
                        
                { this.state.ads.map(ad => 
                    <p>ZIEMNIAKI</p>
                )}
        */
        return (
            <div className="ads">
                <Ad eventType="koncert" address="Warszawa" eventId="/event/1"></Ad>
                <Ad eventType="koncert" address="Kraków"></Ad>
                <Ad eventType="turniej" address="Wrocław"></Ad>
            </div>
        )
    }
}

export default Ads