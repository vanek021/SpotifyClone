import React from 'react';
import { NavLink } from 'react-router-dom';

 function Account() {
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
            <div className="account-row">
                <div className="account-row__user">
                    <div className="account-row__title">Аккаунт</div>
                    <div className="account-row__user-info">
                        <div className="account-row__user-default-avatar-image">
                            <img src="resources/common.blocks/content/account-row/default-avatar-image.png" alt=""/>
                        </div>
                        <div className="account-row__user-subtitle">USER</div>
                        <div className="account-row__user-description">Ваш аккаунт</div>
                    </div>
                </div>
                <div className="account-row__data">
                    <div className="account-row__title">Данные</div>
                    <div className="account-row__data-info">
                        <div className="account-row__data-item">
                            <div className="account-row__item-key"> Имя пользователя</div>
                            <div className="account-row__item-value">USER</div>
                        </div>
                        <div className="account-row__data-item">
                            <div className="account-row__item-key">Электронная почта</div>
                            <div className="account-row__item-value">vanekmenyakin@gmail.com</div>
                        </div>
                        <div className="account-row__data-item">
                            <div className="account-row__item-key">Дата рождения</div>
                            <div className="account-row__item-value">30.08.2001</div>
                        </div>
                        <div className="account-row__data-item">
                            <div className="account-row__item-key">Страна или регион</div>
                            <div className="account-row__item-value">Россия</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="account-row">
                <div className="account-row__plan">
                    <div className="account-row__title">Мой план</div>
                    <div className="account-row__plan-info">
                        <div className="account-row__plan-subtitle">Бесплатная версия</div>
                    </div>
                </div>
                <div className="account-row__access">
                    <div className="account-row__title">Доступ</div>
                    <div className="account-row__access-info">
                        <div className="account-row__access-subtitle">Треки можно слушать только вперемешку. Есть реклама.</div>
                        <div className="account-row__access-description">Бесплатно</div>
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

 export default Account;
