import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from './common/header';
import Footer from './common/footer';

 function Account() {
   return (
    <div className="app">
        <Header/>
        <main className="content">
            <div className="account-row">
                <div className="account-row__user">
                    <div className="account-row__title">Аккаунт</div>
                    <div className="account-row__user-info">
                        <div className="account-row__user-default-avatar-image">
                            <img src="resources/common.blocks/content/account-row/default-avatar-image.png" alt="def-avatar-img"/>
                        </div>
                        <div className="account-row__user-subtitle">USER</div>
                        <div className="account-row__user-description">Ваш аккаунт</div>
                    </div>
                </div>
                <div className="account-row__data">
                    <div className="account-row__title">Данные</div>
                    <div className="account-row__data-info">
                        <div className="account-row__data-item">
                            <div className="account-row__item-key"> Имя пользователя</div>
                            <div className="account-row__item-value">USER</div>
                        </div>
                        <div className="account-row__data-item">
                            <div className="account-row__item-key">Электронная почта</div>
                            <div className="account-row__item-value">vanekmenyakin@gmail.com</div>
                        </div>
                        <div className="account-row__data-item">
                            <div className="account-row__item-key">Дата рождения</div>
                            <div className="account-row__item-value">30.08.2001</div>
                        </div>
                        <div className="account-row__data-item">
                            <div className="account-row__item-key">Страна или регион</div>
                            <div className="account-row__item-value">Россия</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="account-row">
                <div className="account-row__plan">
                    <div className="account-row__title">Мой план</div>
                    <div className="account-row__plan-info">
                        <div className="account-row__plan-subtitle">Бесплатная версия</div>
                    </div>
                </div>
                <div className="account-row__access">
                    <div className="account-row__title">Доступ</div>
                    <div className="account-row__access-info">
                        <div className="account-row__access-subtitle">Треки можно слушать только вперемешку. Есть реклама.</div>
                        <div className="account-row__access-description">Бесплатно</div>
                    </div>
                </div>
            </div>
        </main>
        <Footer/>
    </div>
   );
 }

 export default Account;
