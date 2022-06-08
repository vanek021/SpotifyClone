import Header from './common/header';
import Footer from './common/footer';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getShowData, PLAYLIST_TYPES, TRACK_TYPES } from '../js/spotify';
import { DEFAULT_AVATAR } from '../js/baseResources';
import TrackItem from './components/trackItem';
import FollowButton from './components/followButton';

function Show() {
    const [showState, setShowState] = useState(null);
    const params = useParams();

    useEffect(() => {
        getShowData(params.id).then((data) => {
            setShowState(data);
        });    
    }, [params.id]);

    return(
        <div className="app">
            <Header/>
            <main className="content">
                {showState === null ? (
                    <div className="content__technical_title">
                        Ошибка при загрузке информации об альбоме.
                    </div>
                ) : (
                    <div className="spotify-container">
                        <div className="spotify-container__tracklist-description">
                            <img className="spotify-container__tracklist-image" src={showState.images.length > 0 ? showState.images[0].url : DEFAULT_AVATAR} alt="show"/>
                            <div className="spotify-container__tracklist-wrapper">
                                <div className="spotify-container__tracklist-title">{showState.name}</div>
                                <FollowButton id={params.id} type={PLAYLIST_TYPES.SHOW} />
                            </div>
                        </div>
                        <div className="tracklist">
                            <div className="tracklist__row">
                                {showState.episodes?.items.length > 0 && showState.episodes.items.map(item => 
                                    (<TrackItem key={item.id} item={item} type={TRACK_TYPES.SHOW_EPISODE}/>))}
                            </div>                           
                        </div>
                    </div>
                )}
            </main>
            <Footer/>
        </div>
    );
}

export default Show;