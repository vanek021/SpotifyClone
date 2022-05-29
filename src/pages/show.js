import Header from './common/header';
import Footer from './common/footer';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { followShow, getShowData, getShowState } from '../js/spotify';
import { DEFAULT_AVATAR } from '../js/baseResources';
import TrackItem from './components/trackItem';

function Show() {
    const [showState, setShowState] = useState(null);
    const [isShowFollowedState, setIsShowFollowedState] = useState(null);
    const params = useParams();

    useEffect(() => {
        getShowData(params.id).then((data) => {
            setShowState(data)
            getShowState(params.id).then((data) => setIsShowFollowedState(data[0]));
        });    
    }, [isShowFollowedState, params.id]);

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
                            <img className="spotify-container__tracklist-image" src={showState.images.length > 0 ? showState.images[0].url : DEFAULT_AVATAR} alt="playlist"/>
                            <div className="spotify-container__tracklist-wrapper">
                                <div className="spotify-container__tracklist-title">{showState.name}</div>
                                {isShowFollowedState ? (
                                    <input className="spotify-container__tracklist-add-button" type="image" src="/resources/images/button-added.png" alt="add-button"/>
                                ) : (
                                    <input className="spotify-container__tracklist-add-button" type="image" onClick={() => { followShow(showState.id); setIsShowFollowedState(true); }} src="/resources/images/button-add.png" alt="added-button"/>
                                )}
                            </div>
                        </div>
                        <div className="tracklist">
                            <div className="tracklist__row">
                                {showState.episodes?.items.length > 0 && showState.episodes.items.map(item => (<TrackItem key={item.id} item={item} type="ShowEpisode"/>))}
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