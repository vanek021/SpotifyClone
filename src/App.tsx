import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Author from './pages/author';
import Library from './pages/library';
import Index from './pages/index';
import Account from './pages/account';
import Search from './pages/search';

 function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Index />} />
            <Route index element={<Index />} />
            <Route path="author" element={<Author />} />
            <Route path="library" element={<Library />} />
            <Route path="account" element={<Account />} />
            <Route path="search" element={<Search />} />
        </Routes>
        </BrowserRouter>
      );
 }

 export default App;