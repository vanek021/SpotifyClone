import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from './common/header';
import Footer from './common/footer';

 function Index() {
   return (
    <div className="app">
        <Header/>
        <main className="content">
            <div className="spotify-container">
                <div className="spotify-container__title">Недавно прослушано</div>               
                <div className="spotify-container__row">
                    <div className="playlist">
                        <div className="playlist__image">
                            <img src="resources/common.blocks/content/spotify-container/playlist/scary-stories-image.png" alt="scary-img"/>
                        </div>
                        <div className="playlist__title">Страшные? истории</div>
                        <div className="playlist__description">Air AT</div>
                    </div>
                    <div className="playlist">
                        <div className="playlist__image">
                            <img src="resources/common.blocks/content/spotify-container/playlist/favorite-tracks-image.png" alt="fav-img"/>
                        </div>
                        <div className="playlist__title">Любимые треки</div>
                        <div className="playlist__description">3 трека</div>
                    </div>
                </div>
            </div>
            <div className="spotify-container">
                <div className="spotify-container__title">Послушай эти шоу</div>               
                <div className="spotify-container__row">
                    <div className="playlist">
                        <div className="playlist__image">
                            <img src="resources/common.blocks/content/spotify-container/playlist/soulful-podcast-image.png" alt="soulful-img"/>
                        </div>
                        <div className="playlist__title">Душевный подкаст</div>
                        <div className="playlist__description">Константин Тростенюк и Денис Карамышев</div>
                    </div>
                    <div className="playlist">
                        <div className="playlist__image">
                            <img src="resources/common.blocks/content/spotify-container/playlist/scp-foundation-image.png" alt="scp-img"/>
                        </div>
                        <div className="playlist__title">SCP Foundation</div>
                        <div className="playlist__description">SCP Foundation</div>
                    </div>
                    <div className="playlist">
                        <div className="playlist__image">
                            <img src="resources/common.blocks/content/spotify-container/playlist/distractible-image.png" alt="dist-img"/>
                        </div>
                        <div className="playlist__title">Distractible</div>
                        <div className="playlist__description">Wood Elf Media</div>
                    </div>
                    <div className="playlist">
                        <div className="playlist__image">
                            <img src="resources/common.blocks/content/spotify-container/playlist/joe-rogan-image.png" alt="joe-r-img"/>
                        </div>
                        <div className="playlist__title">The Joe Rogan Exp..</div>
                        <div className="playlist__description">Joe Rogan</div>
                    </div>
                    <div className="playlist">
                        <div className="playlist__image">
                            <img src="resources/common.blocks/content/spotify-container/playlist/favorite-tracks-image.png" alt="fav-img"/>
                        </div>
                        <div className="playlist__title">Любимые треки</div>
                        <div className="playlist__description">3 трека</div>
                    </div>
                </div>
            </div>
        </main>
        <Footer/>
    </div>
   );
 }

 export default Index;
