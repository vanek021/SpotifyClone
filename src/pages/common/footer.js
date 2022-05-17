import { useEffect, useState } from 'react';
import { cookieExists, getToken } from '../../js/cookieManager';
import SpotifyPlayer from 'react-spotify-web-playback';
import { makeRequest, getRequestHeadersWithToken } from '../../js/requestsManager';
import { constants } from '../../js/spotify';

function Footer() {
    const [accountState, setAccountState] = useState(null);
    useEffect(() => {
        if (cookieExists("token"))
            makeRequest(constants.getCurrentUserProfileUrl(), getRequestHeadersWithToken('GET', 'application/json'))
            .then((response) => {
                if (response instanceof Error) setAccountState(null);
                else setAccountState(response);
            });


    }, []);

    if (accountState !== null && accountState.product === 'premium')
        return (<SpotifyPlayer token={getToken()} uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']} />);
    else return (
        <footer className="footer">
            <div className="footer__technical-row">
            <div className='footer__technical-title'>
                 Ошибка при создании плеера: возможно, отсутствует премиум-подписка Spotify.
            </div>
            </div>
        </footer>
    );
}

export default Footer;