import Header from './common/header';
import Footer from './common/footer';
import { useEffect, useState } from 'react';
import { makeRequest, getRequestHeadersWithToken } from '../js/requestsManager';
import { cookieExists } from '../js/cookieManager';
import PlaylistItem from './components/playlistItem';

 function Library() {
    const [playlistState, setPlaylistState] = useState(null);
    const [showState, setShowState] = useState(null);

    useEffect(() => {
        if (cookieExists("token")) {
            makeRequest(`https://api.spotify.com/v1/me/playlists`, getRequestHeadersWithToken('GET', 'application/json'))
            .then((response) => {
            if (response instanceof Error) setPlaylistState(null);
            else setPlaylistState(response);
            });

            makeRequest(`https://api.spotify.com/v1/me/shows`, getRequestHeadersWithToken('GET', 'application/json'))
            .then((response) => {
            if (response instanceof Error) setShowState(null);
            else setShowState(response);
            });
        }       
    }, []);
    return (
    <div className="app">
        <Header/>
        <main className="content">
            <div className="spotify-container">
                <div className="spotify-container__title">Плейлисты</div>               
                <div className="spotify-container__row">
                    {playlistState?.items.length > 0 && playlistState.items.map(function(item) {
                        return (<PlaylistItem key={item.id} item={item} type="playlist"/>)
                    })}
                </div>
            </div>
            <div className="spotify-container">
                <div className="spotify-container__title">Подкасты</div>               
                <div className="spotify-container__row">
                    {showState?.items.length > 0 && showState.items.map(function(item) {
                        return (<PlaylistItem key={item.show.id} item={item} type="show"/>)
                    })}
                </div>
            </div>
        </main>
        <Footer/>
    </div>
   );
 }

 export default Library;
