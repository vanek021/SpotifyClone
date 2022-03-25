import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from './common/header';
import Footer from './common/footer';

 function Author() {
   return (
    <div className="app">
        <Header/>
        <main className="content">
            <div className="content__technical_title">
                В этом разделе появятся дополнительные функции от автора проекта
            </div>
        </main>
        <Footer/>
    </div>
   );
 }

 export default Author;
