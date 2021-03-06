import Header from './common/header';
import Footer from './common/footer';
import { getSubscriptionName, getSubscriptionDesc, getUserData } from '../js/spotify';
import { useEffect, useState } from 'react';

 function Account() {
    const [state, setState] = useState(null)

    useEffect(() => {
        getUserData().then((data) => setState(data));  
    }, []);
            
    return (
        <div className="app">
            <Header/>
            {state === null ? (
                <main className="content">
                    <div className="content__technical_title">
                        Что-то пошло не так. Для просмотра информации о профиле необходимо авторизоваться
                    </div>
                </main>
            ) : (
                <main className="content">
                    <div className="account-row">
                        <div className="account-row__user">
                            <div className="account-row__title">Аккаунт</div>
                            <div className="account-row__user-info">
                                <div className="account-row__user-default-avatar-image">
                                    <img src="/resources/images/default-avatar-image.png" alt="def-avatar-img"/>
                                </div>
                                <div className="account-row__user-subtitle">{state.display_name}</div>
                                <div className="account-row__user-description">Ваш аккаунт</div>
                            </div>
                        </div>
                        <div className="account-row__data">
                            <div className="account-row__title">Данные</div>
                            <div className="account-row__data-info">
                                <div className="account-row__data-item">
                                    <div className="account-row__item-key"> Имя пользователя</div>
                                    <div className="account-row__item-value">{state.display_name}</div>
                                </div>
                                <div className="account-row__data-item">
                                    <div className="account-row__item-key">Электронная почта</div>
                                    <div className="account-row__item-value">{state.email}</div>
                                </div>
                                <div className="account-row__data-item">
                                    <div className="account-row__item-key">Фолловеры</div>
                                    <div className="account-row__item-value">0</div>
                                </div>
                                <div className="account-row__data-item">
                                    <div className="account-row__item-key">Страна или регион</div>
                                    <div className="account-row__item-value">{state.country}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="account-row">
                        <div className="account-row__plan">
                            <div className="account-row__title">Мой план</div>
                            <div className="account-row__plan-info">
                                <div className="account-row__plan-subtitle">{getSubscriptionName(state.product)}</div>
                            </div>
                        </div>
                        <div className="account-row__access">
                            <div className="account-row__title">Доступ</div>
                            <div className="account-row__access-info">
                                <div className="account-row__access-subtitle">{getSubscriptionDesc(state.product)}</div>
                                <div className="account-row__access-description">Без оплаты</div>
                            </div>
                        </div>
                    </div>
                </main>
            )}
            <Footer/>
        </div>
   );
 }

 export default Account;
