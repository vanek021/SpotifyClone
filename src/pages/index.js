import Header from './common/header';
import Footer from './common/footer';
import { useEffect, useState } from 'react';
import { FormFeaturedPlaylists, FormNewAlbumReleases, Constants } from '../js/spotify';
import { GetFeaturedPlaylistsHTML, GetNewAlbumReleasesHTML } from '../js/InterfaceManager';
import { MakeRequest } from '../js/requestsManager';
import { CookieExists } from '../js/cookieManager';

function Index() {
    const [state, setState] = useState(null)
    const [albumsState, setAlbumsState] = useState(null)

    useEffect(() => {
        if (CookieExists("token") && CookieExists("spotify_id")) {
            MakeRequest(Constants.GetFeaturedPlaylistsUrl(), 'GET', 'application/json')
            .then((response) => {
            if (response instanceof Error) setState(null);
            else setState(FormFeaturedPlaylists(response.playlists));
            })

            MakeRequest(Constants.GetNewAlbumReleasesUrl(), 'GET', 'application/json')
            .then((response) => {
            if (response instanceof Error) setAlbumsState(null);
            else setAlbumsState(FormNewAlbumReleases(response));
            });
        }
    }, []);
    let playlists = GetFeaturedPlaylistsHTML(state === null ? null : state.playlists);
    let albums = GetNewAlbumReleasesHTML(albumsState == null ? null : albumsState.albums);
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
