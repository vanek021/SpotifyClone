import { NavLink } from 'react-router-dom';
import AccountLink from './accountLink';

function Header() {
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
                <AccountLink/>
            </div>           
        </header>

        
    );
}

export default Header;