
//Set client ID, client secret, redirect URI and the redirect URL to get the access token
let clientID = "cc332d7702a047d58bbab0cbe3db8f98"
let clientSecret = "a7cdb80e726c4db09903231498ee14b7"
let redirectURI = "https%3A%2F%2Fadityachanan.github.io%2FSpotifytTest%2F"
let redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&redirect_uri=${redirectURI}`
let accessToken = ''

const getUrlParameter = (sParam) => {
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
accessToken = getUrlParameter('access_token')

//If the access token has not been set, redirect to the authorisation link and get an access token
if (accessToken == null || accessToken == '' || accessToken == undefined) {
    window.location.replace(redirect)
}

var output = ''

//Get the song name and URL encode it (so that it can be used in the search endpoint) 
let trackNameRaw = "On the coast"
let trackName = encodeURI(trackNameRaw)

//AJAX to fetch search results from spotify
let xhr = new XMLHttpRequest()
let url = `https://api.spotify.com/v1/search?q=${trackName}&type=track`
console.log(url)
xhr.open('GET', url)
xhr.setRequestHeader('Accept', 'application/json')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`)

xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
        let response = JSON.parse(xhr.responseText)
        console.log(response)
        for (let i = 0; i < 10; i++) {
            let id = response.tracks.items[i].id
            let src = `https://open.spotify.com/embed/track/${id}`
            output = output + `<iframe style="border-radius:12px" src=${src} width="25%" height="190" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`
            document.getElementById('music').innerHTML = output
        }
    }
}

xhr.send()
