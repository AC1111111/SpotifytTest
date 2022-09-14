import React from "react";
import axios from "axios";
import "./body.css"
import { Component } from "react";

class body extends Component {
    constructor(props) {
        super(props)
        this.state = {
            response: {},
            redirect: `https://accounts.spotify.com/authorize?client_id=cc332d7702a047d58bbab0cbe3db8f98&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F`
        }
    }

    componentDidMount() {
        let trackNameRaw = "Looming Dread"
        let trackName = encodeURI(trackNameRaw)
        let url = `https://api.spotify.com/v1/search?q=${trackName}&type=track`

        //Function to get a particular parameter from the current URL
        function getUrlParameter(sParam) {
            let sPageURL = window.location.search.substring(1),////substring will take everything after the https link and split the #/&
                sURLVariables = sPageURL != undefined && sPageURL.length > 0 ? sPageURL.split('#') : [],
                sParameterName,
                i;
            let split_str = window.location.href.length > 0 ? window.location.href.split('#') : [];
            sURLVariables = split_str != undefined && split_str.length > 1 && split_str[1].length > 0 ? split_str[1].split('&') : [];
            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
                }
            }
        }

        let accessToken = getUrlParameter('access_token')

        if (accessToken == null || accessToken == '' || accessToken == undefined) {
            window.location.replace(this.state.redirect)
        }

        let config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }

        axios.get(url, config)
            .then(response => {
                let responseData = response.data
                console.log(responseData)
                this.setState({ response: responseData })
            })
    }

    render() {
        return (
            <div>
                <h1 style={{ textAlign: "center" }}>LIBRARY</h1>
                <br />
                <br />
                <br />
                <div style={{ display: "flex", marginLeft: "100px" }}>
                </div>
            </div>
        );
    }
}

export default body;