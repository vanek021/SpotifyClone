import React from 'react';
import { NavLink } from 'react-router-dom';

 function Library() {
   return (
    <div className="app">
        <header className="header">
            <div className="header__row">
                <NavLink to="/" className="header__item">
                    <div className="header__home-image">
                        <img src="resources/common.blocks/header/library-image.png" alt=""/>
                    </div>
                    <div className="header__text">ГЛАВНАЯ</div>
                  </NavLink>
                <NavLink to="/library" className="header__item">
                    <div className="header__library-image">
                        <img src="resources/common.blocks/header/library-image.png" alt=""/>
                    </div>
                    <div className="header__text">МОЯ МЕДИАТЕКА</div>
                  </NavLink>
                <NavLink to="/search" className="header__item">
                    <div className="header__search-image">
                        <img src="resources/common.blocks/header/search-image.png" alt=""/>
                    </div>
                    <div className="header__text">ПОИСК</div>
                  </NavLink>
                <NavLink to="/author" className="header__item">
                    <div className="header__from-author-image">
                        <img src="resources/common.blocks/header/from-author-image.png" alt=""/>
                    </div>
                    <div className="header__text">ОТ АВТОРА</div>
                  </NavLink>
                <NavLink to="/account" className="header__item">
                    <div className="header__user-image">
                        <img src="resources/common.blocks/header/user-image.png" alt=""/>
                    </div>
                    <div className="header__text">USER</div>
                </NavLink>
            </div>           
        </header>
        <main className="content">
            <div className="spotify-container">
                <div className="spotify-container__title">Плейлисты</div>               
                <div className="spotify-container__row">
                    <div className="playlist">
                        <div className="playlist__image">
                            <img src="resources/common.blocks/content/spotify-container/playlist/favorite-tracks-image.png" alt=""/>
                        </div>
                        <div className="playlist__title">Любимые треки</div>
                        <div className="playlist__description">3 трека</div>
                    </div>
                    <div className="playlist">
                        <div className="playlist__image">
                            <img src="resources/common.blocks/content/spotify-container/playlist/my-playlist1-image.png" alt=""/>
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
                            <img src="resources/common.blocks/content/spotify-container/playlist/scary-stories-image.png" alt=""/>
                        </div>
                        <div className="playlist__title">Страшные? истории</div>
                        <div className="playlist__description">Air AT</div>
                    </div>
                </div>
            </div>
        </main>
        <footer className="footer">
            <div className="footer__row">
                <div className="footer__current-song">
                    <div className="footer_current-song-image">
                        <img src="resources/common.blocks/footer/current-song-image.png" alt=""/>
                    </div>
                    <div className="footer__current-song-desc">
                        <div className="footer__current-song-name">Role Model</div>
                        <div className="footer__current-song-author">daysormay, Tessa Violet</div> 
                    </div>                         
                </div>
                <div className="footer__player">
                    <div className="footer__control">
                        <div className="footer__prev-song">
                            <div className="footer__prev-song-image">
                                <img src="resources/common.blocks/footer/prev-song-image.png" alt=""/>
                            </div>
                        </div>
                        <div className="footer__pause">
                            <div className="footer__pause-image">
                                <img src="resources/common.blocks/footer/pause-image.png" alt=""/>
                            </div>
                        </div>
                        <div className="footer__next-song">
                            <div className="footer__next-song-image">
                                <img src="resources/common.blocks/footer/next-song-image.png" alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className="footer__progress">
                        <div className="footer__timer">0:14</div>
                        <div className="footer__music-bar">
                            <div className="footer__music-bar-image">
                                <img src="resources/common.blocks/footer/music-bar-image.png" alt=""/>
                            </div>
                        </div>
                        <div className="footer__timer">6:54</div>
                    </div>
                </div>
                <div className="footer__volume">
                    <div className="footer__volume-image">
                        <img src="resources/common.blocks/footer/volume-image.png" alt=""/>
                    </div>
                    <div className="footer__volume-bar-image">
                        <img src="resources/common.blocks/footer/volume-bar-image.png" alt=""/>
                    </div>
                </div>
            </div>
        </footer>
    </div>
   );
 }

 export default Library;