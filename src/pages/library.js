import Header from './common/header';
import Footer from './common/footer';
import { useEffect, useState } from 'react';
import { cookieExists } from '../js/cookieManager';
import PlaylistItem from './components/playlistItem';
import { getUserPlaylists, getUserShows } from '../js/spotify';

 function Library() {
    const [playlistState, setPlaylistState] = useState(null);
    const [showState, setShowState] = useState(null);

    useEffect(() => {
        if (cookieExists("token")) {
            getUserPlaylists().then((data) => setPlaylistState(data));
            getUserShows().then((data) => setShowState(data));
        }       
    }, []);

    return (
    <div className="app">
        <Header/>
        <main className="content">
            <div className="spotify-container">
                <div className="spotify-container__title">Плейлисты</div>               
                <div className="spotify-container__row">
                    {playlistState?.items.length > 0 && playlistState.items.map(function(item) {
                        return (<PlaylistItem key={item.id} item={item} type="playlist"/>)
                    })}
                </div>
            </div>
            <div className="spotify-container">
                <div className="spotify-container__title">Подкасты</div>               
                <div className="spotify-container__row">
                    {showState?.items.length > 0 && showState.items.map(function(item) {
                        return (<PlaylistItem key={item.show.id} item={item.show} type="show"/>)
                    })}
                </div>
            </div>
        </main>
        <Footer/>
    </div>
   );
 }

 export default Library;
