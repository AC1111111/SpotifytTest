// Get Access Token
var accessToken 

// Set client ID
let client_id = 'cc332d7702a047d58bbab0cbe3db8f98';
// Set redirect URL
let redirect_url = 'https%3A%2F%2Fadityachanan.github.io%2FSpotifytTest%2F'; // GitHub Pages URL or whatever your public url to this app is


const redirect = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}`;
// Don't authorize access token already exists
if (accessToken == null || accessToken == "" || accessToken == undefined) {
    window.location.replace(redirect);
}


let resp
let url = "https://api.spotify.com/v1/tracks/"
let xhr = new XMLHttpRequest()
xhr.open("GET", url)

xhr.setRequestHeader("Authorization", `Bearer ${accessToken}`)

xhr.onreadystatechange = ()=>{
    if(xhr.readyState == 4 && xhr.status == 200)
    {
        resp = xhr.responseXML;
        for(let i = 0; i < 5; i++)
        {
            console.log(resp[i])
        }
    }
}

xhr.send()

