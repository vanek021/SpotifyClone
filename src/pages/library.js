import Header from './common/header';
import Footer from './common/footer';
import { useEffect, useState } from 'react';
import { cookieExists } from '../js/cookieManager';
import { getUserAlbums, getUserPlaylists, getUserShows, PLAYLIST_TYPES } from '../js/spotify';
import SpotifyContainer from './components/spotifyContainer';

 function Library() {
    const [playlistState, setPlaylistState] = useState(null);
    const [showState, setShowState] = useState(null);
    const [albumState, setAlbumState] = useState(null);

    useEffect(() => {
        if (cookieExists("token")) {
            getUserPlaylists().then((data) => setPlaylistState(data));
            getUserShows().then((data) => setShowState(data));
            getUserAlbums().then((data) => setAlbumState(data.items.map(item => item.album)));
        }       
    }, []);

    return (
    <div className="app">
        <Header/>
        <main className="content">
            <SpotifyContainer row={playlistState?.items} type={PLAYLIST_TYPES.PLAYLIST} title="Плейлисты" />
            <SpotifyContainer row={albumState} type={PLAYLIST_TYPES.ALBUM} title="Альбомы" />
            <SpotifyContainer row={showState?.items} type={PLAYLIST_TYPES.SHOW} title="Подкасты" />
        </main>
        <Footer/>
    </div>
   );
 }

 export default Library;
