import Header from './common/header';
import Footer from './common/footer';
import { useEffect, useState } from 'react';
import { formSearchResult, searchTracksLimit, searchArtistsLimit, constants } from '../js/spotify';
import { getSearchArtistsHTML, getSearchTracksHTML } from '../js/InterfaceManager';
import { makeRequest, getRequestHeadersWithToken } from '../js/requestsManager';
import { cookieExists } from '../js/cookieManager';

 function Search() {
    const [query, setQuery] = useState("")
    const [searchResult, setSearchResult] = useState(null);
    useEffect(() => {
        if (query !== "" && cookieExists("token"))
            makeRequest(constants.searchResultUrl(query), getRequestHeadersWithToken('GET', 'application/json'))
            .then((response) => {
                if (response instanceof Error) setSearchResult(null);
                else setSearchResult(formSearchResult(response));
            });
    }, [query]);
    
    let main;
    if (query === "")
        main=
            <main className="content">
                <div className="search">
                    <div className="search__bar">               
                        <input className="search__input" type="text" placeholder="Исполнитель, трек или подкаст..." onChange={event => setQuery(event.target.value)} />
                    </div>
                </div>
                <div className="content__technical_title">Введите запрос для поиска</div>
            </main>;
    else if (searchResult === null) {
        main = 
            <main className="content">
                    <div className="search">
                        <div className="search__bar">               
                            <input className="search__input" type="text" placeholder="Исполнитель, трек или подкаст..." onChange={event => setQuery(event.target.value)} />
                        </div>
                    </div>
                <div className="content__technical_title">По вашему запросу ничего не найдено. Чтобы пользоваться поиском, необходимо авторизоваться.</div>
            </main>
    }  
    else {
        let tracks = getSearchTracksHTML(searchResult.tracks, searchTracksLimit);
        let artists = getSearchArtistsHTML(searchResult.artists, searchArtistsLimit);  
        main = 
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
            </main>;
    }
    return (
        <div className="app">
            <Header/>
            {main}
            <Footer/>
        </div>
        );       
 }

 export default Search;
