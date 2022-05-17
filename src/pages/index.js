import Header from './common/header';
import Footer from './common/footer';
import { useEffect, useState } from 'react';
import { formFeaturedPlaylists, formNewAlbumReleases, constants } from '../js/spotify';
import { getFeaturedPlaylistsHTML, getNewAlbumReleasesHTML } from '../js/InterfaceManager';
import { makeRequest, getRequestHeadersWithToken } from '../js/requestsManager';
import { cookieExists } from '../js/cookieManager';

function Index() {
    const [state, setState] = useState(null)
    const [albumsState, setAlbumsState] = useState(null)

    useEffect(() => {
        if (cookieExists("token") && cookieExists("spotify_id")) {
            makeRequest(constants.getFeaturedPlaylistsUrl(), getRequestHeadersWithToken('GET', 'application/json'))
            .then((response) => {
            if (response instanceof Error) setState(null);
            else setState(formFeaturedPlaylists(response.playlists));
            })

            makeRequest(constants.getNewAlbumReleasesUrl(), getRequestHeadersWithToken('GET', 'application/json'))
            .then((response) => {
            if (response instanceof Error) setAlbumsState(null);
            else setAlbumsState(formNewAlbumReleases(response));
            });
        }
    }, []);
    let playlists = getFeaturedPlaylistsHTML(state === null ? null : state.playlists);
    let albums = getNewAlbumReleasesHTML(albumsState == null ? null : albumsState.albums);
    return (
            <div className="app">
                <Header/>
                <main className="content">
                    <div className="spotify-container">
                        <div className="spotify-container__title">Новые альбомы</div>               
                        <div className="spotify-container__row">
                            {albums}
                        </div>
                    </div>
                    <div className="spotify-container">
                        <div className="spotify-container__title">Выбор редакции</div>               
                        <div className="spotify-container__row">
                            {playlists}
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>
    );
}

 export default Index;
