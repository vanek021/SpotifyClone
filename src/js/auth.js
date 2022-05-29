import { cookieExists, getRefreshToken, setCookie } from "./cookieManager";
import { makeRequest, getRequestData, getRequestHeadersWithToken } from "./requestsManager";

const CLIENT_ID = '6ccb9412f4a242ca820c4fe4ef218595';
const CLIENT_SECRET = '989a088f6d57445cbfd37d652de54e10';
const HOST_URL = 'http://localhost:3000/token';
const SCOPE = ['user-read-private', 'user-read-email', 'user-read-currently-playing', 'user-read-recently-played', 'playlist-read-private',
    'user-read-playback-state', 'user-top-read', 'user-modify-playback-state', 'streaming', 'app-remote-control', 'user-library-read',
    'user-library-modify', 'playlist-modify-private', 'playlist-modify-public'];
    
export const AUTH_URL = 'https://accounts.spotify.com/authorize?response_type=code&client_id=' + 
    CLIENT_ID + '&redirect_uri=' + HOST_URL + '&scope=' + SCOPE.join(' ');
    
/**
 * Get Access Token using authorization in the Spotify service
 * @param  {string} code - Code returned from Spotify.
 */
export async function setAccessTokenForUser(code) {
    return await makeRequest(`https://accounts.spotify.com/api/token`, 
        getRequestData('application/x-www-form-urlencoded', 
            'Basic ' + (btoa(CLIENT_ID + ':' + CLIENT_SECRET)),
            `grant_type=authorization_code&code=${code}&redirect_uri=${HOST_URL}`))
        .then(response => {
            if (response instanceof Error) 
                console.error(response);
            else
                setUserDataInCookie(response.access_token, response.expires_in, response.refresh_token);
        });
}

/**
 * Request new Acces Token for user via Refresh Token.
 */
export function refreshUserAccessToken() {
    if(cookieExists('token'))
        return;
    makeRequest(`https://accounts.spotify.com/api/token`, 
        getRequestData('application/x-www-form-urlencoded', 
            'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET), 
            `grant_type=refresh_token&refresh_token=${getRefreshToken()}`))
    .then(response => setUserDataInCookie(response.access_token, response.expires_in, response.refresh_token))
    .catch(e => console.error(e));
}
/**
 * Set User Data in Cookie by cookieManager
 * @param  {string} accessToken User Access Token.
 * @param  {string} refreshToken User Refresh Token.
 */
export async function setUserDataInCookie(accessToken, tokenExpiresIn, refreshToken = null) {
    setCookie('token', accessToken, parseInt(tokenExpiresIn) * 1000);

    if (refreshToken)
        setCookie('refresh_token', refreshToken);

    await makeRequest(`https://api.spotify.com/v1/me`, getRequestHeadersWithToken('GET', 'application/json'))
    .then((response) => setCookie('spotify_id', response.id)).catch(e => console.error(e));
}