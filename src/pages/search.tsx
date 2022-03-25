import React from 'react';
import { NavLink } from 'react-router-dom';

 function Search() {
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
            <div className="search">
                <div className="search__bar">               
                    <input className="search__input" type="text" placeholder="Исполнитель, трек или подкаст..."/>
                </div>
            </div>
            <div className="result">
                <div className="result__container">
                    <div className="result__best">
                        <div className="result__title">Лучший результат</div>
                        <div className="result__best-info">
                            <div className="result__best-avatar-image">
                                <img src="resources/common.blocks/content/account-row/tessa-violet-image.png" alt=""/>
                            </div>
                            <div className="result__best-subtitle">Tessa Violet</div>
                            <div className="result__best-description">Исполнитель</div>
                        </div>
                    </div>
                    <div className="result__songs">
                        <div className="result__title">Треки</div>
                        <div className="result__songs-row">
                            <div className="song-item">
                                <div className="song-item__wrapper">
                                    <div className="song-item__image">
                                        <img src="resources/common.blocks/content/result/song-item/yes-mom-image.png" alt=""/>
                                    </div>
                                    <div className="song-item__desc">
                                        <div className="song-item__name">
                                            YES MOM
                                        </div>
                                        <div className="song-item__author">
                                            Tessa Violet
                                        </div>
                                    </div>
                                </div>                     
                                <div className="song-item__time">
                                    2:42
                                </div>
                            </div>
                            <div className="song-item">
                                <div className="song-item__wrapper">
                                    <div className="song-item__image">
                                        <img src="resources/common.blocks/content/result/song-item/crush-image.png" alt=""/>
                                    </div>
                                    <div className="song-item__desc">
                                        <div className="song-item__name">
                                            Crush
                                        </div>
                                        <div className="song-item__author">
                                            Tessa Violet
                                        </div>
                                    </div>  
                                </div>                                                         
                                <div className="song-item__time">
                                    3:36
                                </div>
                            </div>
                            <div className="song-item">
                                <div className="song-item__wrapper">
                                    <div className="song-item__image">
                                        <img src="resources/common.blocks/content/result/song-item/tessa-image.png" alt=""/>
                                    </div>
                                    <div className="song-item__desc">
                                        <div className="song-item__name">
                                            Tessa
                                        </div>
                                        <div className="song-item__author">
                                            Steve Jablonsky
                                        </div>
                                    </div>  
                                </div>                              
                                <div className="song-item__time">
                                    2:48
                                </div>
                            </div>
                            <div className="song-item">
                                <div className="song-item__wrapper">
                                    <div className="song-item__image">
                                        <img src="resources/common.blocks/content/result/song-item/i-like-the-idea-of-you-image.png" alt=""/>
                                    </div>
                                    <div className="song-item__desc">
                                        <div className="song-item__name">
                                            I Like (the idea of) You
                                        </div>
                                        <div className="song-item__author">
                                            Tessa Violet
                                        </div>
                                    </div>   
                                </div>                            
                                <div className="song-item__time">
                                    5:45
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="result__container">
                    <div className="performers">
                        <div className="performers__title">Исполнители</div>
                        <div className="performers__performers-row">
                            <div className="performers__performer">
                                <div className="performers__performer-image">
                                    <img src="resources/common.blocks/content/result/performers/tessa-violet-image.png" alt=""/>
                                </div>
                                <div className="performers__performer-name">Tessa Violet</div>
                                <div className="performers__performer-desc">Исполнитель</div>
                            </div>
                            <div className="performers__performer">
                                <div className="performers__performer-image">
                                    <img src="resources/common.blocks/content/result/performers/tessa-rae-image.png" alt=""/>
                                </div>
                                <div className="performers__performer-name">Tessa Rae</div>
                                <div className="performers__performer-desc">Исполнитель</div>
                            </div>
                            <div className="performers__performer">
                                <div className="performers__performer-image">
                                    <img src="resources/common.blocks/content/result/performers/tessa-image.png" alt=""/>
                                </div>
                                <div className="performers__performer-name">Tessa</div>
                                <div className="performers__performer-desc">Исполнитель</div>
                            </div>
                            <div className="performers__performer">
                                <div className="performers__performer-image">
                                    <img src="resources/common.blocks/content/result/performers/tessa-thompson-image.png" alt=""/>
                                </div>
                                <div className="performers__performer-name">Tessa Thompson</div>
                                <div className="performers__performer-desc">Исполнитель</div>
                            </div>
                        </div>
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

 export default Search;
