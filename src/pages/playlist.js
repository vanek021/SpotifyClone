import Header from './common/header';
import Footer from './common/footer';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { makeRequest, getRequestHeadersWithToken} from '../js/requestsManager';
import { followPlaylist } from '../js/spotify';
import { getUserId } from '../js/cookieManager';
import PlaylistTrackItem from './components/trackItems/playlistTrackItem';
import { DEFAULT_AVATAR } from '../js/baseResources';

function Playlist() {
    const [playlistState, setPlaylistState] = useState(null);
    const [isPlaylistFollowedState, setIsPlaylistFollowedState] = useState(null);
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        makeRequest(`https://api.spotify.com/v1/playlists/${id}`, getRequestHeadersWithToken('GET', 'application/json'))
        .then((response) => {
            if (response instanceof Error) setPlaylistState(null);
            else {
                setPlaylistState(response);
                makeRequest(`https://api.spotify.com/v1/playlists/${id}/followers/contains?ids=${getUserId()}`, getRequestHeadersWithToken('GET', 'application/json'))
                .then((data) => {
                    if (data instanceof Error) setIsPlaylistFollowedState(false);
                    setIsPlaylistFollowedState(data[0]);
                });
            }
        });
    }, [isPlaylistFollowedState, id]);
    let content;
    if (playlistState === null)
        content = 
                <main className="content">
                    <div className="content__technical_title">
                        Ошибка при загрузке информации о плейлисте.
                    </div>
                </main>;
    else
        content = 
                <main className="content">
                    <div className="spotify-container">
                        <div className="spotify-container__tracklist-description">
                            <img className="spotify-container__tracklist-image" src={playlistState.images.length > 0 ? playlistState.images[0].url : DEFAULT_AVATAR} alt="playlist"/>
                            <div className="spotify-container__tracklist-wrapper">
                                <div className="spotify-container__tracklist-title">{playlistState.name}</div>
                                {isPlaylistFollowedState && <input className="spotify-container__tracklist-add-button" type="image" src="resources/images/button-added.png" alt="button-add"/>}
                                {!isPlaylistFollowedState && <input className="spotify-container__tracklist-add-button" type="image" onClick={() => { followPlaylist(playlistState.id); setIsPlaylistFollowedState(true); }} src="resources/images/button-add.png" alt="button-added"/>}
                            </div>           
                        </div>
                        <div className="tracklist">
                            <div className="tracklist__row">
                                {playlistState?.tracks.items.length > 0 && playlistState.tracks.items.map(function(item) {
                                    return (<PlaylistTrackItem key={item.track.id} item={item}/>)
                                })}
                            </div>                           
                        </div>
                    </div>
                </main>;
    return <div className="app">
            <Header/>
            {content}
            <Footer/>
        </div>
}

export default Playlist;