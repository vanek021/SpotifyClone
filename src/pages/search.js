import Header from './common/header';
import Footer from './common/footer';
import { useEffect, useState } from 'react';
import { makeRequest, getRequestHeadersWithToken } from '../js/requestsManager';
import { cookieExists } from '../js/cookieManager';
import ArtistsItem from './components/artistsItem';
import { DEFAULT_AVATAR } from '../js/baseResources';
import { SEARCH_ARTISTS_LIMIT, SEARCH_TRACKS_LIMIT } from '../js/spotify';
import TrackItem from './components/trackItem';

 function Search() {
    const [query, setQuery] = useState("")
    const [searchResult, setSearchResult] = useState(null);
    
    useEffect(() => {
        if (query !== "" && cookieExists("token"))
            makeRequest(`https://api.spotify.com/v1/search?type=artist,track&q=${query}`, getRequestHeadersWithToken('GET', 'application/json'))
            .then((response) => {
                if (response instanceof Error) setSearchResult(null);
                if (response.artists.items.length === 0 && response.tracks.items.length === 0) setSearchResult(null);
                else setSearchResult(response);
            });
    }, [query]);
    
    let main;
    if (query === "")
        main =
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
        let bestSearch;
        if (searchResult.artists.items.length > 0) {
            bestSearch = {
                name: searchResult.artists.items[0].name,
                type: "Исполнитель",
                image: searchResult.artists.items[0].images.length > 0 ? 
                    searchResult.artists.items[0].images[0].url : DEFAULT_AVATAR
            }
        }
        else {
            bestSearch = {
                name: searchResult.tracks.items[0].name,
                type: "Трек",
                image: searchResult.tracks.items[0].album.images.length > 0 ? 
                    searchResult.tracks.items[0].album.images[0].url : DEFAULT_AVATAR
            }
        }
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
                                <img className="result__best-avatar-image" src={bestSearch.image} alt="tessa-img"/>
                                <div className="result__best-subtitle">{bestSearch.name}</div>
                                <div className="result__best-description">{bestSearch.type}</div>
                            </div>
                        </div>
                        
                        <div className="result__songs">
                            <div className="result__title">Треки</div>
                            <div className="result__songs-row">
                                {searchResult?.tracks.items.length > 0 && searchResult.tracks.items.slice(0, SEARCH_TRACKS_LIMIT).map(function(item) {
                                    return (<TrackItem key={item.id} item={item} type="TrackPlaylist"/>)
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="result__container">
                        <div className="performers">
                            <div className="performers__title">Исполнители</div>
                            <div className="performers__performers-row">
                                {searchResult?.artists.items.length > 0 && searchResult.artists.items.slice(0, SEARCH_ARTISTS_LIMIT).map(function(item) {
                                    return (<ArtistsItem key={item.id} item={item}/>)
                                })}
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
