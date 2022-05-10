import Header from './common/header';
import Footer from './common/footer';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { MakeRequest } from '../js/requestsManager';
import { FormEpisodesFromShow, Constants, FollowShow } from '../js/spotify';
import { GetEpisodesHTML } from '../js/InterfaceManager';

function Show() {
    const [showState, setShowState] = useState(null);
    const [isShowFollowedState, setIsShowFollowedState] = useState(null);
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        MakeRequest(Constants.GetShowUrl(id), 'GET', 'application/json')
        .then((response) => {
            if (response instanceof Error) setShowState(null);
            else {
                setShowState(FormEpisodesFromShow(response));
                MakeRequest(Constants.IfUserFollowShowUrl(id), 'GET', 'application/json')
                .then((data) => {
                    if (data instanceof Error) setIsShowFollowedState(false);
                    setIsShowFollowedState(data[0]);
                });
            }
        })
    }, [isShowFollowedState, id]);
    
    let tracks = GetEpisodesHTML(showState === null ? null : showState.episodes);
    if (showState === null)
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
                            <img className="spotify-container__tracklist-image" src={showState.image} alt="playlist"/>
                            <div className="spotify-container__tracklist-wrapper">
                                <div className="spotify-container__tracklist-title">{showState.name}</div>
                                {isShowFollowedState && <input className="spotify-container__tracklist-add-button" type="image" src="resources/images/button-added.png" alt="add-button"/>}
                                {!isShowFollowedState && <input className="spotify-container__tracklist-add-button" type="image" onClick={() => { FollowShow(showState.id); setIsShowFollowedState(true); }} src="resources/images/button-add.png" alt="added-button"/>}
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

export default Show;