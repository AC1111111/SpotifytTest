

let clientID = "cc332d7702a047d58bbab0cbe3db8f98"
let clientSecret = "a7cdb80e726c4db09903231498ee14b7"
let redirectURI = "https%3A%2F%2Fadityachanan.github.io%2FSpotifytTest%2F"
let redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&redirect_uri=${redirectURI}`
let accessToken = ''

let currentURL = window.location.href

var uri = new URL(currentURL)
accessToken = new URLSearchParams(uri.search).get('access_token')
if(accessToken == null || accessToken == '' || accessToken == undefined)
{
    window.location.replace(redirect)
}

var output = ''
let trackNameRaw = "On the coast"
let trackName = encodeURI(trackNameRaw)
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
        for (let i = 0; i < 6; i++) {
            let id = response.tracks.items[i].id
            let src = `https://open.spotify.com/embed/track/${id}`
            output = output + `<iframe style="border-radius:12px" src=${src} width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`
            document.getElementById('music').innerHTML = output
        }
    }
}

xhr.send()
