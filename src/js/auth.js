import { GetRefreshTokenCookieValue, SetCookie } from "./cookieManager";
import { Constants  } from "./spotify";
import { MakeRequest } from "./requestsManager";

const client_id = '6ccb9412f4a242ca820c4fe4ef218595';
const client_secret = '989a088f6d57445cbfd37d652de54e10';
const host_url = 'http://localhost:3000/token';
const scope = ['user-read-private', 'user-read-email', 'user-read-currently-playing', 'user-read-recently-played', 'playlist-read-private',
    'user-read-playback-state', 'user-top-read', 'user-modify-playback-state', 'streaming', 'app-remote-control', 'user-library-read',
    'user-library-modify', 'playlist-modify-private', 'playlist-modify-public'];
    
export const auth_url = 'https://accounts.spotify.com/authorize?response_type=code&client_id=' + 
    client_id + '&redirect_uri=' + host_url + '&scope=' + scope.join(' ');
    
/**
 * Get Access Token using authorization in the Spotify service
 * @param  {} code - Code returned from Spotify.
 */
export async function GetAccessTokenForUser(code) {

    let response = await fetch('https://accounts.spotify.com/api/token',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (window.btoa(client_id + ':' + client_secret))
        },
        body: `grant_type=authorization_code&code=${code}&redirect_uri=${host_url}`
    });

    if (response.status === 200) {
        response = await response.json();
    }

    return response;
}
/**
 * Request new Acces Token for user via Refresh Token.
 */
export async function RefreshUserAccessToken() {
    let response = await fetch('https://accounts.spotify.com/api/token',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (window.btoa(client_id + ':' + client_secret))
        },
        body: `grant_type=refresh_token&refresh_token=${GetRefreshTokenCookieValue()}`
    });

    if (response.status === 200) {
        response = await response.json();
        if (response.hasOwnProperty('refresh_token'))
            SetCookie('refresh_token', response.refresh_token);
        
            SetCookie('token', response.access_token);
    }

    return response;
}
/**
 * Set User Data in Cookie by cookieManager
 * @param  {} access_token User Access Token.
 * @param  {} refresh_token User Refresh Token.
 */
export async function SetUserDataInCookie(access_token, refresh_token) {
    SetCookie('token', access_token);
    SetCookie('refresh_token', refresh_token);

    MakeRequest(Constants.GetCurrentUserProfileUrl(), 'GET', 'application/json')
    .then((response) => {
        if (response instanceof Error) console.error('Failed to set spotify_id in cookie.');
        else SetCookie('spotify_id', response.id);
    });
}