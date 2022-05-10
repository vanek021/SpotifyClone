import { useEffect, useState } from 'react';
import { CookieExists, GetTokenCookieValue } from '../../js/cookieManager';
import SpotifyPlayer from 'react-spotify-web-playback';
import { MakeRequest } from '../../js/requestsManager';
import { Constants } from '../../js/spotify';

function Footer() {
    const [accountState, setAccountState] = useState(null);
    useEffect(() => {
        if (CookieExists("token") && CookieExists("spotify_id"))
            MakeRequest(Constants.GetCurrentUserProfileUrl(), 'GET', 'application/json')
            .then((response) => {
                if (response instanceof Error) setAccountState(null);
                else setAccountState(response);
            });


    }, []);

    if (accountState !== null && accountState.product === 'premium')
        return (<SpotifyPlayer token={GetTokenCookieValue()} uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']} />);
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