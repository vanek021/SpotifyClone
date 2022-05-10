import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Author from './pages/author';
import Library from './pages/library';
import Index from './pages/index';
import Account from './pages/account';
import Search from './pages/search';
import Token from './pages/token';
import Playlist from './pages/playlist';
import Album from './pages/album';
import Show from './pages/show';
import { CurrentUserProvider } from './js/userContext';
import { RefreshUserAccessToken } from './js/auth';
import { useEffect } from 'react';


function App() {
    
    useEffect(() => {
        setInterval(() => {
            console.log("refreshing access token if exists in cookie");
            RefreshUserAccessToken();
        }, 100000);
    }, []);

    return (
        <CurrentUserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route index element={<Index />} />
                    <Route path="author" element={<Author />} />
                    <Route path="library" element={<Library />} />
                    <Route path="account" element={<Account />} />
                    <Route path="search" element={<Search />} />
                    <Route path="token" element={<Token />} />
                    <Route path="playlist/:id" element={<Playlist />} />
                    <Route path="album/:id" element={<Album />} />
                    <Route path="show/:id" element={<Show />} />
                </Routes>
            </BrowserRouter> 
        </CurrentUserProvider>             
    );
}

 export default App;