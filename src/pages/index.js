import Header from './common/header';
import Footer from './common/footer';
import { useEffect, useState } from 'react';
import { cookieExists } from '../js/cookieManager';
import PlaylistItem from './components/playlistItem';
import { getFeaturedPlaylists, getNewReleases } from '../js/spotify';

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
                    <div className="spotify-container">
                        <div className="spotify-container__title">Новые альбомы</div>   
                            <div className="spotify-container__row">         
                                {albumsState?.albums.items.length > 0 && albumsState.albums.items.map(function(item) {
                                    return (<PlaylistItem key={item.id} item={item} type="album"/>)
                                })}
                            </div>
                    </div>
                    <div className="spotify-container">
                        <div className="spotify-container__title">Выбор редакции</div>
                            <div className="spotify-container__row">                
                            {state?.playlists.items.length > 0 && state.playlists.items.map(function(item) {
                                    return (<PlaylistItem key={item.id} item={item} type="playlist"/>)
                                })}
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>
    );
}

 export default Index;
