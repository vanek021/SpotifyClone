import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from './common/header';
import Footer from './common/footer';

 function Search() {
   return (
    <div className="app">
        <Header/>
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
                                <img src="resources/common.blocks/content/account-row/tessa-violet-image.png" alt="tessa-img"/>
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
                                        <img src="resources/common.blocks/content/result/song-item/yes-mom-image.png" alt="yes-mom-img"/>
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
                                        <img src="resources/common.blocks/content/result/song-item/crush-image.png" alt="crush-img"/>
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
                                        <img src="resources/common.blocks/content/result/song-item/tessa-image.png" alt="tessa-img"/>
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
                                        <img src="resources/common.blocks/content/result/song-item/i-like-the-idea-of-you-image.png" alt="i-like-img"/>
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
                                    <img src="resources/common.blocks/content/result/performers/tessa-violet-image.png" alt="tessa-img"/>
                                </div>
                                <div className="performers__performer-name">Tessa Violet</div>
                                <div className="performers__performer-desc">Исполнитель</div>
                            </div>
                            <div className="performers__performer">
                                <div className="performers__performer-image">
                                    <img src="resources/common.blocks/content/result/performers/tessa-rae-image.png" alt="tessa-rae-img"/>
                                </div>
                                <div className="performers__performer-name">Tessa Rae</div>
                                <div className="performers__performer-desc">Исполнитель</div>
                            </div>
                            <div className="performers__performer">
                                <div className="performers__performer-image">
                                    <img src="resources/common.blocks/content/result/performers/tessa-image.png" alt="tessa-img"/>
                                </div>
                                <div className="performers__performer-name">Tessa</div>
                                <div className="performers__performer-desc">Исполнитель</div>
                            </div>
                            <div className="performers__performer">
                                <div className="performers__performer-image">
                                    <img src="resources/common.blocks/content/result/performers/tessa-thompson-image.png" alt="tessa-t-img"/>
                                </div>
                                <div className="performers__performer-name">Tessa Thompson</div>
                                <div className="performers__performer-desc">Исполнитель</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <Footer/>
    </div>
   );
 }

 export default Search;
