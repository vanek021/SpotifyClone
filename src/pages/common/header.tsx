import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
    return(
        <header className="header">
            <div className="header__row">
                <NavLink to="/" className="header__item">
                    <div className="header__home-image">
                        <img src="resources/common.blocks/header/home-image.png" alt="home-img"/>
                    </div>
                    <div className="header__text">ГЛАВНАЯ</div>
                  </NavLink>
                <NavLink to="/library" className="header__item">
                    <div className="header__library-image">
                        <img src="resources/common.blocks/header/library-image.png" alt="lib-img"/>
                    </div>
                    <div className="header__text">МОЯ МЕДИАТЕКА</div>
                  </NavLink>
                <NavLink to="/search" className="header__item">
                    <div className="header__search-image">
                        <img src="resources/common.blocks/header/search-image.png" alt="search-img"/>
                    </div>
                    <div className="header__text">ПОИСК</div>
                  </NavLink>
                <NavLink to="/author" className="header__item">
                    <div className="header__from-author-image">
                        <img src="resources/common.blocks/header/from-author-image.png" alt="author-img"/>
                    </div>
                    <div className="header__text">ОТ АВТОРА</div>
                  </NavLink>
                <NavLink to="/account" className="header__item">
                    <div className="header__user-image">
                        <img src="resources/common.blocks/header/user-image.png" alt="user-img"/>
                    </div>
                    <div className="header__text">USER</div>
                </NavLink>
            </div>           
        </header>
    );
}

export default Header;