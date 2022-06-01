import Header from './common/header';
import Footer from './common/footer';
import { useEffect, useState } from 'react';
import { cookieExists } from '../js/cookieManager';
import { getUserPlaylists, getUserShows, PLAYLIST_TYPES } from '../js/spotify';
import SpotifyContainer from './components/spotifyContainer';

 function Library() {
    const [playlistState, setPlaylistState] = useState(null);
    const [showState, setShowState] = useState(null);

    useEffect(() => {
        if (cookieExists("token")) {
            getUserPlaylists().then((data) => setPlaylistState(data));
            getUserShows().then((data) => setShowState(data));
        }       
    }, []);

    return (
    <div className="app">
        <Header/>
        <main className="content">
            <SpotifyContainer row={playlistState} type={PLAYLIST_TYPES.PLAYLIST} title="Плейлисты" />
            <SpotifyContainer row={showState} type={PLAYLIST_TYPES.SHOW} title="Подкасты" />
        </main>
        <Footer/>
    </div>
   );
 }

 export default Library;
