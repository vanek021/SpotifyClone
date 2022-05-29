import Header from './common/header';
import Footer from './common/footer';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { followAlbum, getAlbumData, getAlbumState } from '../js/spotify';
import { DEFAULT_AVATAR } from '../js/baseResources';
import TrackItem from './components/trackItem';

function Album() {
    const [playlistState, setPlaylistState] = useState(null);
    const [isPlaylistFollowedState, setIsPlaylistFollowedState] = useState(null);
    const params = useParams();

    useEffect(() => {
        getAlbumData(params.id).then((data) => {
            setPlaylistState(data);
            getAlbumState(params.id).then((data) => setIsPlaylistFollowedState(data[0]));
        });
    }, [isPlaylistFollowedState, params.id]);
    
        return <div className="app">
                <Header/>
                <main className="content">
                    {playlistState === null ? (
                        <div className="content__technical_title">
                            Ошибка при загрузке информации об альбоме.
                        </div> 
                        ) : (
                        <div className="spotify-container">
                            <div className="spotify-container__tracklist-description">
                                <img className="spotify-container__tracklist-image" src={playlistState.images.length > 0 ? playlistState.images[0].url : DEFAULT_AVATAR} alt="album"/>
                                <div className="spotify-container__tracklist-wrapper">
                                    <div className="spotify-container__tracklist-title">{playlistState.name}</div>
                                    {isPlaylistFollowedState ? (
                                        <input className="spotify-container__tracklist-add-button" type="image" src="/resources/images/button-added.png" alt="button-added"/>
                                    ) : (
                                        <input className="spotify-container__tracklist-add-button" type="image" onClick={() => { followAlbum(playlistState.id); setIsPlaylistFollowedState(true); }} src="/resources/images/button-add.png" alt="button-add"/>
                                    )}
                                </div>
                            </div>
                            <div className="tracklist">
                                <div className="tracklist__row">
                                    {playlistState?.tracks.items.length > 0 && playlistState.tracks.items.map(item => (<TrackItem key={item.id} item={item} type="AlbumTrack"/>))}
                                </div>                           
                            </div>
                        </div>
                    )}
                </main>
                <Footer/>
            </div>
}

export default Album;