import Header from './common/header';
import Footer from './common/footer';
import { useEffect, useState } from 'react';
import { FormSearchResult, search_tracks_limit, search_artists_limit, Constants } from '../js/spotify';
import { GetSearchArtistsHTML, GetSearchTracksHTML } from '../js/InterfaceManager';
import { MakeRequest } from '../js/requestsManager';
import { CookieExists } from '../js/cookieManager';

 function Search() {
    const [query, setQuery] = useState("")
    const [searchResult, setSearchResult] = useState(null);
    useEffect(() => {
        if (query !== "" && CookieExists("token") && CookieExists("spotify_id"))
            MakeRequest(Constants.SearchResultUrl(query), 'GET', 'application/json')
            .then((response) => {
                if (response instanceof Error) setSearchResult(null);
                else setSearchResult(FormSearchResult(response));
            });
    }, [query]);
    
    if (query === "")
        return (
            <div className="app">
                <Header/>
                <main className="content">
                    <div className="search">
                        <div className="search__bar">               
                            <input className="search__input" type="text" placeholder="Исполнитель, трек или подкаст..." onChange={event => setQuery(event.target.value)} />
                        </div>
                    </div>
                    <div className="content__technical_title">Введите запрос для поиска</div>
                </main>
                <Footer/>
            </div>);
    else if (searchResult === null) {
        return (
            <div className="app">
                <Header/>
                <main className="content">
                    <div className="search">
                        <div className="search__bar">               
                            <input className="search__input" type="text" placeholder="Исполнитель, трек или подкаст..." onChange={event => setQuery(event.target.value)} />
                        </div>
                    </div>
                    <div className="content__technical_title">По вашему запросу ничего не найдено. Чтобы пользоваться поиском, необходимо авторизоваться.</div>
                </main>
                <Footer/>
            </div>);
    }  
    else {
        let tracks = GetSearchTracksHTML(searchResult.tracks, search_tracks_limit);
        let artists = GetSearchArtistsHTML(searchResult.artists, search_artists_limit);
        return (
            <div className="app">
                <Header/>
                <main className="content">
                    <div className="search">
                        <div className="search__bar">               
                            <input className="search__input" type="text" placeholder="Исполнитель, трек или подкаст..." onChange={event => setQuery(event.target.value)} />
                        </div>
                    </div>
                    <div className="result">
                        <div className="result__container">

                            <div className="result__best">
                                <div className="result__title">Лучший результат</div>
                                
                                <div className="result__best-info">
                                    <img className="result__best-avatar-image" src={searchResult.best.image_url} alt="tessa-img"/>
                                    <div className="result__best-subtitle">{searchResult.best.name}</div>
                                    <div className="result__best-description">{searchResult.best.type}</div>
                                </div>
                            </div>
                            
                            <div className="result__songs">
                                <div className="result__title">Треки</div>
                                <div className="result__songs-row">
                                    {tracks}
                                </div>
                            </div>
                        </div>
                        <div className="result__container">
                            <div className="performers">
                                <div className="performers__title">Исполнители</div>
                                <div className="performers__performers-row">
                                    {artists}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>);
    }        
 }

 export default Search;
