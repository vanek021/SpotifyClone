import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from './common/header';
import Footer from './common/footer';

 function Library() {
   return (
    <div className="app">
        <Header/>
        <main className="content">
            <div className="spotify-container">
                <div className="spotify-container__title">Плейлисты</div>               
                <div className="spotify-container__row">
                    <div className="playlist">
                        <div className="playlist__image">
                            <img src="resources/common.blocks/content/spotify-container/playlist/favorite-tracks-image.png" alt="fav-img"/>
                        </div>
                        <div className="playlist__title">Любимые треки</div>
                        <div className="playlist__description">3 трека</div>
                    </div>
                    <div className="playlist">
                        <div className="playlist__image">
                            <img src="resources/common.blocks/content/spotify-container/playlist/my-playlist1-image.png" alt="playlist1-img"/>
                        </div>
                        <div className="playlist__title">Мой плейлист №1</div>
                        <div className="playlist__description">Автор: USER</div>
                    </div>
                </div>
            </div>
            <div className="spotify-container">
                <div className="spotify-container__title">Подкасты</div>               
                <div className="spotify-container__row">
                    <div className="playlist">
                        <div className="playlist__image">
                            <img src="resources/common.blocks/content/spotify-container/playlist/scary-stories-image.png" alt="scary-img"/>
                        </div>
                        <div className="playlist__title">Страшные? истории</div>
                        <div className="playlist__description">Air AT</div>
                    </div>
                </div>
            </div>
        </main>
        <Footer/>
    </div>
   );
 }

 export default Library;
