import Header from './common/header';
import Footer from './common/footer';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { MakeRequest } from '../js/requestsManager';
import { FormTracksOfPlaylist, Constants, FollowPlaylist } from '../js/spotify';
import { GetTracksHTML } from '../js/InterfaceManager';
import { GetUserIdCookieValue } from '../js/cookieManager';

function Playlist() {
    const [playlistState, setPlaylistState] = useState(null);
    const [isPlaylistFollowedState, setIsPlaylistFollowedState] = useState(null);
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        MakeRequest(Constants.GetPlaylistUrl(id), 'GET', 'application/json')
        .then((response) => {
            if (response instanceof Error) setPlaylistState(null);
            else {
                setPlaylistState(FormTracksOfPlaylist(response));
                MakeRequest(Constants.ifUsersFollowPlaylistUrl(id, GetUserIdCookieValue()), 'GET', 'application/json')
                .then((data) => {
                    if (data instanceof Error) setIsPlaylistFollowedState(false);
                    setIsPlaylistFollowedState(data[0]);
                });
            }
        });
    }, [isPlaylistFollowedState, id]);

    let tracks = GetTracksHTML(playlistState === null ? null : playlistState.tracks);
    if (playlistState === null)
        return(
            <div className="app">
                <Header/>
                <main className="content">
                    <div className="content__technical_title">
                        Ошибка при загрузке информации о плейлисте.
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
                            <img className="spotify-container__tracklist-image" src={playlistState.image} alt="playlist"/>
                            <div className="spotify-container__tracklist-wrapper">
                                <div className="spotify-container__tracklist-title">{playlistState.name}</div>
                                {isPlaylistFollowedState && <input className="spotify-container__tracklist-add-button" type="image" src="resources/images/button-added.png" alt="button-add"/>}
                                {!isPlaylistFollowedState && <input className="spotify-container__tracklist-add-button" type="image" onClick={() => { FollowPlaylist(playlistState.id); setIsPlaylistFollowedState(true); }} src="resources/images/button-add.png" alt="button-added"/>}
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

export default Playlist;