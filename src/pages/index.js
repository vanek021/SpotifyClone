import Header from './common/header';
import Footer from './common/footer';
import { useEffect, useState } from 'react';
import { makeRequest, getRequestHeadersWithToken } from '../js/requestsManager';
import { cookieExists } from '../js/cookieManager';
import PlaylistItem from './components/playlistItem';

function Index() {
    const [state, setState] = useState(null)
    const [albumsState, setAlbumsState] = useState(null)

    useEffect(() => {
        if (cookieExists("token") && cookieExists("spotify_id")) {
            makeRequest(`https://api.spotify.com/v1/browse/featured-playlists`, getRequestHeadersWithToken('GET', 'application/json'))
            .then((response) => {
            if (response instanceof Error) setState(null);
            else setState(response.playlists);
            })

            makeRequest(`https://api.spotify.com/v1/browse/new-releases`, getRequestHeadersWithToken('GET', 'application/json'))
            .then((response) => {
            if (response instanceof Error) setAlbumsState(null);
            else setAlbumsState(response);
            });
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
                            {state?.items.length > 0 && state.items.map(function(item) {
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
