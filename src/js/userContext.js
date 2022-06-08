import React, { useCallback } from 'react';
import { getToken, getRefreshToken, getUserId, cookieExists } from './cookieManager';

export const userContext = React.createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(getUserData())

  const updateCurrentUser = useCallback(() => {
    setCurrentUser(getUserData());
  }, []);

  return (
    <userContext.Provider value={{ currentUser, updateCurrentUser }}>
      {children}
    </userContext.Provider>
  )
}

export const useCurrentUser = () => React.useContext(userContext)

function getUserData() {
  return {
    name: cookieExists('token') ? 'Пользователь' : 'Гость', 
    token: cookieExists('token') ? getToken() : '', 
    refresh_token: cookieExists('refresh_token') ? getRefreshToken() : '', 
    spotify_id: cookieExists('refresh_token')? getUserId() : ''
  }
}