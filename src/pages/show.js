import Header from './common/header';
import Footer from './common/footer';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { makeRequest, getRequestHeadersWithToken } from '../js/requestsManager';
import { followShow } from '../js/spotify';
import { DEFAULT_AVATAR } from '../js/baseResources';
import ShowEpisodeItem from './components/trackItems/showEpisodeItem';

function Show() {
    const [showState, setShowState] = useState(null);
    const [isShowFollowedState, setIsShowFollowedState] = useState(null);
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        makeRequest(`https://api.spotify.com/v1/shows/${id}`, getRequestHeadersWithToken('GET', 'application/json'))
        .then((response) => {
            if (response instanceof Error) setShowState(null);
            else {
                setShowState(response);
                makeRequest(`https://api.spotify.com/v1/me/shows/contains?ids=${id}`, getRequestHeadersWithToken('GET', 'application/json'))
                .then((data) => {
                    if (data instanceof Error) setIsShowFollowedState(false);
                    setIsShowFollowedState(data[0]);
                });
            }
        })
    }, [isShowFollowedState, id]);
    
    let content;
    if (showState === null)
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
                            <img className="spotify-container__tracklist-image" src={showState.images.length > 0 ? showState.images[0].url : DEFAULT_AVATAR} alt="playlist"/>
                            <div className="spotify-container__tracklist-wrapper">
                                <div className="spotify-container__tracklist-title">{showState.name}</div>
                                {isShowFollowedState && <input className="spotify-container__tracklist-add-button" type="image" src="resources/images/button-added.png" alt="add-button"/>}
                                {!isShowFollowedState && <input className="spotify-container__tracklist-add-button" type="image" onClick={() => { followShow(showState.id); setIsShowFollowedState(true); }} src="resources/images/button-add.png" alt="added-button"/>}
                            </div>
                        </div>
                        <div className="tracklist">
                            <div className="tracklist__row">
                                {showState.episodes?.items.length > 0 && showState.episodes.items.map(function(item) {
                                    return (<ShowEpisodeItem key={item.id} item={item}/>)
                                })}
                            </div>                           
                        </div>
                    </div>
                </main>;
    return(
        <div className="app">
            <Header/>
            {content}
            <Footer/>
        </div>
    );
}

export default Show;