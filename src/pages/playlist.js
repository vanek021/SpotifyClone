import Header from './common/header';
import Footer from './common/footer';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getPlaylistData, PLAYLIST_TYPES, TRACK_TYPES } from '../js/spotify';
import { DEFAULT_AVATAR } from '../js/baseResources';
import TrackItem from './components/trackItem';
import FollowButton from './components/followButton';

function Playlist() {
    const [playlistState, setPlaylistState] = useState(null);
    const params = useParams();
    
    useEffect(() => {
        getPlaylistData(params.id).then((data) => {
            setPlaylistState(data);
        });
    }, [params.id]);

    return <div className="app">
            <Header/>
            <main className="content">
                {playlistState === null ? (
                    <div className="content__technical_title">
                        Ошибка при загрузке информации о плейлисте.
                    </div>                    
                ) : (
                    <div className="spotify-container">
                        <div className="spotify-container__tracklist-description">
                            <img className="spotify-container__tracklist-image" src={playlistState.images.length > 0 ? playlistState.images[0].url : DEFAULT_AVATAR} alt="playlist"/>
                            <div className="spotify-container__tracklist-wrapper">
                                <div className="spotify-container__tracklist-title">{playlistState.name}</div>
                                <FollowButton id={params.id} type={PLAYLIST_TYPES.PLAYLIST} />
                            </div>           
                        </div>
                        <div className="tracklist">
                            <div className="tracklist__row">
                                {playlistState?.tracks.items.length > 0 && playlistState.tracks.items.map(item => 
                                    (<TrackItem key={item.track.id} item={item.track} type={TRACK_TYPES.PLAYLIST_TRACK}/>))}
                            </div>                           
                        </div>
                    </div>
                )}
            </main>
            <Footer/>
        </div>
}

export default Playlist;