import React from 'react';
import { getToken, getRefreshToken, getUserId, cookieExists } from './cookieManager';

export const userContext = React.createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState({ 
    name: cookieExists('spotify_id') ? 'Пользователь' : 'Гость', 
    token: cookieExists('token') ? getToken() : '', 
    refresh_token: cookieExists('refresh_token') ? getRefreshToken() : '', 
    spotify_id: cookieExists('refresh_token')? getUserId() : '' 
  })

  const fetchCurrentUser = () => {
    if (cookieExists('token')) {
      setCurrentUser({ name: 'Пользователь', token: getToken(), refresh_token: getRefreshToken(), spotify_id: getUserId() })
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
