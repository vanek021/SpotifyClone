import Header from './common/header';
import Footer from './common/footer';
import { useEffect, useState } from 'react';
import { FormFeaturedPlaylists, FormShows, Constants } from '../js/spotify';
import { MakeRequest } from '../js/requestsManager';
import { GetFeaturedPlaylistsHTML, GetShowsHTML } from '../js/InterfaceManager';
import { CookieExists } from '../js/cookieManager';

 function Library() {
    const [playlistState, setPlaylistState] = useState(null);
    const [showState, setShowState] = useState(null);

    useEffect(() => {
        if (CookieExists("token") && CookieExists("spotify_id")) {
            MakeRequest(Constants.GetCurrentUserPlaylistsUrl(), 'GET', 'application/json')
            .then((response) => {
            if (response instanceof Error) setPlaylistState(null);
            else setPlaylistState(FormFeaturedPlaylists(response));
            });

            MakeRequest(Constants.GetSavedShowsUrl(), 'GET', 'application/json')
            .then((response) => {
            if (response instanceof Error) setShowState(null);
            else setShowState(FormShows(response));
            });
        }       
    }, []);
    
    let playlists = GetFeaturedPlaylistsHTML(playlistState === null ? null : playlistState.playlists);
    let shows = GetShowsHTML(showState === null ? null : showState.shows);
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
