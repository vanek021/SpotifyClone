import React from 'react';
import { GetTokenCookieValue, GetRefreshTokenCookieValue, GetUserIdCookieValue, CookieExists } from './cookieManager';

export const userContext = React.createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState({ name: 'Гость', token: '', refresh_token: '', spotify_id: '' })

  const fetchCurrentUser = () => {
    if (CookieExists('token')) {
      setCurrentUser({ name: 'Пользователь', token: GetTokenCookieValue(), refresh_token: GetRefreshTokenCookieValue(), spotify_id: GetUserIdCookieValue() })
    }     
    else {
      setCurrentUser({ name: 'Гость', token: '', refresh_token: '', spotify_id: '' })
    }
  }

  return (
    <userContext.Provider value={{ currentUser, fetchCurrentUser }}>
      {children}
    </userContext.Provider>
  )
}

export const useCurrentUser = () => React.useContext(userContext)
