import Header from './common/header';
import Footer from './common/footer';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { makeRequest, getRequestHeadersWithToken } from '../js/requestsManager';
import { followAlbum, formTracksOfAlbum, constants } from '../js/spotify';
import { getTracksHTML } from '../js/InterfaceManager';

function Album() {
    const [playlistState, setPlaylistState] = useState(null);
    const [isPlaylistFollowedState, setIsPlaylistFollowedState] = useState(null);
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        makeRequest(constants.getAlbumUrl(id), getRequestHeadersWithToken('GET', 'application/json'))
        .then((response) => {
            if (response instanceof Error) setPlaylistState(null);
            else {
                setPlaylistState(formTracksOfAlbum(response));
                makeRequest(constants.ifUserFollowAlbumUrl(id), getRequestHeadersWithToken('GET', 'application/json'))
                .then((data) => {
                    if (data instanceof Error) setIsPlaylistFollowedState(false);
                    setIsPlaylistFollowedState(data[0]);
                });
            }
        })
    }, [isPlaylistFollowedState, id]);

    let tracks = getTracksHTML(playlistState === null ? null : playlistState.tracks);
    if (playlistState === null)
        return(
            <div className="app">
                <Header/>
                <main className="content">
                    <div className="content__technical_title">
                        Ошибка при загрузке информации об альбоме.
                    </div>
                </main>
                <Footer/>
            </div>
        );
    else
        return(
            <div className="app">
                <Header/>
                <main className="content">
                    <div className="spotify-container">
                        <div className="spotify-container__tracklist-description">
                            <img className="spotify-container__tracklist-image" src={playlistState.image} alt="album"/>
                            <div className="spotify-container__tracklist-wrapper">
                                <div className="spotify-container__tracklist-title">{playlistState.name}</div>
                                {isPlaylistFollowedState && <input className="spotify-container__tracklist-add-button" type="image" src="resources/images/button-added.png" alt="button-added"/>}
                                {!isPlaylistFollowedState && <input className="spotify-container__tracklist-add-button" type="image" onClick={() => { followAlbum(playlistState.id); setIsPlaylistFollowedState(true); }} src="resources/images/button-add.png" alt="button-add"/>}
                            </div>
                        </div>
                        <div className="tracklist">
                            <div className="tracklist__row">
                                {tracks}
                            </div>                           
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>
        );
}

export default Album;