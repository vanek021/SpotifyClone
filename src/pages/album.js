import Header from './common/header';
import Footer from './common/footer';
import AlbumTrackItem from './components/trackItems/albumTrackItem';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { makeRequest, getRequestHeadersWithToken } from '../js/requestsManager';
import { followAlbum } from '../js/spotify';
import { DEFAULT_AVATAR } from '../js/baseResources';

function Album() {
    const [playlistState, setPlaylistState] = useState(null);
    const [isPlaylistFollowedState, setIsPlaylistFollowedState] = useState(null);
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        makeRequest(`https://api.spotify.com/v1/albums/${id}`, getRequestHeadersWithToken('GET', 'application/json'))
        .then((response) => {
            if (response instanceof Error) setPlaylistState(null);
            else {
                setPlaylistState(response);
                makeRequest(`https://api.spotify.com/v1/me/albums/contains?ids=${id}`, getRequestHeadersWithToken('GET', 'application/json'))
                .then((data) => {
                    if (data instanceof Error) setIsPlaylistFollowedState(false);
                    setIsPlaylistFollowedState(data[0]);
                });
            }
        })
    }, [isPlaylistFollowedState, id]);
    
    let content;
    if (playlistState === null)
        content = 
                <main className="content">
                    <div className="content__technical_title">
                        Ошибка при загрузке информации об альбоме.
                    </div>
                </main>;
    else
        content =
                <main className="content">
                    <div className="spotify-container">
                        <div className="spotify-container__tracklist-description">
                            <img className="spotify-container__tracklist-image" src={playlistState.images.length > 0 ? playlistState.images[0].url : DEFAULT_AVATAR} alt="album"/>
                            <div className="spotify-container__tracklist-wrapper">
                                <div className="spotify-container__tracklist-title">{playlistState.name}</div>
                                {isPlaylistFollowedState && <input className="spotify-container__tracklist-add-button" type="image" src="resources/images/button-added.png" alt="button-added"/>}
                                {!isPlaylistFollowedState && <input className="spotify-container__tracklist-add-button" type="image" onClick={() => { followAlbum(playlistState.id); setIsPlaylistFollowedState(true); }} src="resources/images/button-add.png" alt="button-add"/>}
                            </div>
                        </div>
                        <div className="tracklist">
                            <div className="tracklist__row">
                                {playlistState?.tracks.items.length > 0 && playlistState.tracks.items.map(function(item) {
                                    return (<AlbumTrackItem key={item.id} item={item}/>)
                                })}
                            </div>                           
                        </div>
                    </div>
                </main>
    
        return <div className="app">
                <Header/>
                {content}
                <Footer/>
            </div>
}

export default Album;