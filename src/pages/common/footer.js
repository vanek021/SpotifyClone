import { useEffect, useState } from 'react';
import { cookieExists, getToken } from '../../js/cookieManager';
import SpotifyPlayer from 'react-spotify-web-playback';
import { getUserData } from '../../js/spotify';

function Footer() {
    const [accountState, setAccountState] = useState(null);
    useEffect(() => {
        if (cookieExists("token"))
            getUserData().then((data) => setAccountState(data));
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