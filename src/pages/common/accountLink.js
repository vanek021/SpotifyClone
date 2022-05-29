import { useCurrentUser } from "../../js/userContext";
import { AUTH_URL } from '../../js/auth';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from "react";

function AccountLink() {
    const [isLoggedState, setIsLoggedState] = useState(false);
    const { currentUser, updateCurrentUser } = useCurrentUser();

    useEffect(() => {
        setIsLoggedState(currentUser.name !== 'Гость');
    }, [currentUser.name])

    if (isLoggedState) {
        return(
            <NavLink to="/account" className="header__item" id="account-link" reloadDocument={true}>
                <div className="header__user-image">
                    <img src="/resources/images/user-image.png" alt="user-img"/>
                </div>
                <div className="header__text">{currentUser.name}</div>
            </NavLink>
        );
    }
    else {
        return(
            <a href={AUTH_URL} className="header__item">
                <div className="header__user-image">
                    <img src="/resources/images/user-image.png" alt="user-img"/>
                </div>
                <div className="header__text">ВОЙТИ</div>
            </a>
        );
    }
}

export default AccountLink;