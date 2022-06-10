import Header from './common/header';
import Footer from './common/footer';
import { useEffect, useState } from 'react';
import { cookieExists } from '../js/cookieManager';
import { getFeaturedPlaylists, getNewReleases, PLAYLIST_TYPES } from '../js/spotify';
import SpotifyContainer from './components/spotifyContainer';

function Index() {
    const [state, setState] = useState(null)
    const [albumsState, setAlbumsState] = useState(null)

    useEffect(() => {
        if (cookieExists("token") || cookieExists("spotify_id")) {
            getFeaturedPlaylists().then((data) => setState(data));
            getNewReleases().then((data) => setAlbumsState(data));
        }
    }, []);
    return (
            <div className="app">
                <Header/>
                <main className="content">
                    <SpotifyContainer row={albumsState?.albums.items} type={PLAYLIST_TYPES.ALBUM} title={"Новые альбомы"}/>
                    <SpotifyContainer row={state?.playlists.items} type={PLAYLIST_TYPES.PLAYLIST} title={"Выбор редакции"}/>
                </main>
                <Footer/>
            </div>
    );
}

 export default Index;
