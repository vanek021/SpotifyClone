import { NavLink } from 'react-router-dom';
import { useCurrentUser } from '../../js/userContext';
import { authUrl } from '../../js/auth';
import { useEffect } from 'react';

function Header() {
    const { currentUser, fetchCurrentUser } = useCurrentUser()
    useEffect(() => {
        fetchCurrentUser();
    }, []);
    const isLoggedIn = currentUser.name !== 'Гость';
    let accountLink;
    if (isLoggedIn) {
        accountLink = <NavLink to="/account" className="header__item" id="account-link" reloadDocument={true}>
                        <div className="header__user-image">
                            <img src="resources/images/user-image.png" alt="user-img"/>
                        </div>
                        <div className="header__text">{currentUser.name}</div>
                    </NavLink>;
    }
    else {
        accountLink = <a href={authUrl} className="header__item">
                        <div className="header__user-image">
                            <img src="resources/images/user-image.png" alt="user-img"/>
                        </div>
                        <div className="header__text">ВОЙТИ</div>
                    </a>;
    }
    return(
            <header className="header">
            <div className="header__row">
                <NavLink to="/" className="header__item" reloadDocument={true}>
                    <div className="header__home-image">
                        <img src="resources/images/home-image.png" alt="home-img"/>
                    </div>
                    <div className="header__text">ГЛАВНАЯ</div>
                </NavLink>
                <NavLink to="/library" className="header__item" reloadDocument={true}>
                    <div className="header__library-image">
                        <img src="resources/images/library-image.png" alt="lib-img"/>
                    </div>
                    <div className="header__text">МОЯ МЕДИАТЕКА</div>
                </NavLink>
                <NavLink to="/search" className="header__item" reloadDocument={true}>
                    <div className="header__search-image">
                        <img src="resources/images/search-image.png" alt="search-img"/>
                    </div>
                    <div className="header__text">ПОИСК</div>
                </NavLink>
                <NavLink to="/author" className="header__item" reloadDocument={true}>
                    <div className="header__from-author-image">
                        <img src="resources/images/from-author-image.png" alt="author-img"/>
                    </div>
                    <div className="header__text">ОТ АВТОРА</div>
                </NavLink>
                {accountLink}
            </div>           
        </header>

        
    );
}

export default Header;