import Header from './common/header';
import Footer from './common/footer';
import { useEffect, useState } from 'react';
import { formFeaturedPlaylists, formShows, constants } from '../js/spotify';
import { makeRequest, getRequestHeadersWithToken } from '../js/requestsManager';
import { getFeaturedPlaylistsHTML, getShowsHTML } from '../js/InterfaceManager';
import { cookieExists } from '../js/cookieManager';

 function Library() {
    const [playlistState, setPlaylistState] = useState(null);
    const [showState, setShowState] = useState(null);

    useEffect(() => {
        if (cookieExists("token")) {
            makeRequest(constants.getCurrentUserPlaylistsUrl(), getRequestHeadersWithToken('GET', 'application/json'))
            .then((response) => {
            if (response instanceof Error) setPlaylistState(null);
            else setPlaylistState(formFeaturedPlaylists(response));
            });

            makeRequest(constants.getSavedShowsUrl(), getRequestHeadersWithToken('GET', 'application/json'))
            .then((response) => {
            if (response instanceof Error) setShowState(null);
            else setShowState(formShows(response));
            });
        }       
    }, []);
    
    let playlists = getFeaturedPlaylistsHTML(playlistState === null ? null : playlistState.playlists);
    let shows = getShowsHTML(showState === null ? null : showState.shows);
    return (
    <div className="app">
        <Header/>
        <main className="content">
            <div className="spotify-container">
                <div className="spotify-container__title">Плейлисты</div>               
                <div className="spotify-container__row">
                    {playlists}
                </div>
            </div>
            <div className="spotify-container">
                <div className="spotify-container__title">Подкасты</div>               
                <div className="spotify-container__row">
                    {shows}
                </div>
            </div>
        </main>
        <Footer/>
    </div>
   );
 }

 export default Library;
