import { getRefreshToken, getTokenExpireTime, setCookie } from "./cookieManager";
import { constants } from "./spotify";
import { makeRequest, getRequest, getRequestHeadersWithToken } from "./requestsManager";

const clientId = '6ccb9412f4a242ca820c4fe4ef218595';
const clientSecret = '989a088f6d57445cbfd37d652de54e10';
const hostUrl = 'http://localhost:3000/token';
const tokenExpiresIn = 3000 * 1000;
const scope = ['user-read-private', 'user-read-email', 'user-read-currently-playing', 'user-read-recently-played', 'playlist-read-private',
    'user-read-playback-state', 'user-top-read', 'user-modify-playback-state', 'streaming', 'app-remote-control', 'user-library-read',
    'user-library-modify', 'playlist-modify-private', 'playlist-modify-public'];
    
export const authUrl = 'https://accounts.spotify.com/authorize?response_type=code&client_id=' + 
    clientId + '&redirect_uri=' + hostUrl + '&scope=' + scope.join(' ');
    
/**
 * Get Access Token using authorization in the Spotify service
 * @param  {} code - Code returned from Spotify.
 */
export async function setAccessTokenForUser(code) {
    return makeRequest(constants.getApiTokenUrl(), 
        getRequest('application/x-www-form-urlencoded', 
            'Basic ' + (btoa(clientId + ':' + clientSecret)),
            `grant_type=authorization_code&code=${code}&redirect_uri=${hostUrl}`))
        .then(response => {
            if (response instanceof Error) console.error(response);
            else {
                setUserDataInCookie(response.access_token, response.refresh_token);
            }
        });
}

/**
 * Request new Acces Token for user via Refresh Token.
 */
export async function refreshUserAccessToken() {
    if(parseInt(Date.now()) < parseInt(getTokenExpireTime()))
        return;
    console.log('Token expired. Trying to refresh...');
    makeRequest(constants.getApiTokenUrl(), 
        getRequest('application/x-www-form-urlencoded', 
            'Basic ' + btoa(clientId + ':' + clientSecret), 
            `grant_type=refresh_token&refresh_token=${getRefreshToken()}`))
    .then(response => {
        console.log(response);
        if (response instanceof Error) console.error(response)
        else {
            setCookie('token', response.access_token);
            if (response.hasOwnProperty('refresh_token'))
                setCookie('refresh_token', response.refresh_token);         
            setCookie('token_expire_time', parseInt(Date.now()) + tokenExpiresIn);
        }
    });
}
/**
 * Set User Data in Cookie by cookieManager
 * @param  {} access_token User Access Token.
 * @param  {} refresh_token User Refresh Token.
 */
export async function setUserDataInCookie(access_token, refresh_token) {
    setCookie('token', access_token);
    setCookie('refresh_token', refresh_token);
    setCookie('token_expire_time', parseInt(Date.now()) + tokenExpiresIn);

    makeRequest(constants.getCurrentUserProfileUrl(), getRequestHeadersWithToken('GET', 'application/json'))
    .then((response) => {
        if (response instanceof Error) console.error('Failed to set spotify_id in cookie.');
        else setCookie('spotify_id', response.id);
    });
}