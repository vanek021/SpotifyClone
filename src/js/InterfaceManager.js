import { NavLink } from "react-router-dom";
/**
 * Get an array of prepared tracks to insert into HTML.
 * @param  {} array - Array with tracks formed by spotify.js
 * @param  {} limit=-1 - Limit of tracks
 */
export function getSearchTracksHTML(array, limit = -1) {
    let result = [];

    for (let i = 0; i < array.length; i++) {
        if (result.length >= limit && limit !== -1)
            break;
        result.push(<div className="song-item" key={i}>
            <div className="song-item__wrapper">
                <img className="song-item__image" src={array[i].image_url} alt="yes-mom-img"/>
                <div className="song-item__desc">
                    <div className="song-item__name">
                        {array[i].name}
                    </div>
                    <div className="song-item__author">
                        {array[i].author}
                    </div>
                </div>
            </div>                     
            <div className="song-item__time">
            {displayTime(array[i].duration)}
            </div>
        </div>);
    }
    if (result.length === 0)
        result.push(<div className="content__technical_title" key={0}>
                Треков не найдено
            </div>);

    return result;
}
/**
 * Get an array of prepared artists to insert into HTML.
 * @param  {} array - Array with searched artists formed by spotify.js
 * @param  {} limit=-1 - Limit of artists
 */
export function getSearchArtistsHTML(array, limit = -1) {
    let result = [];

    for (let i = 0; i < array.length; i++) {
        if (result.length >= limit && limit !== -1)
            break;
        result.push(<div className="performers__performer" key={i}>
                <img className="performers__performer-image" src={array[i].image_url} alt="tessa-img"/>
                <div className="performers__performer-name">{array[i].name}</div>
                <div className="performers__performer-desc">{array[i].type}</div>
            </div>);  
    }
    if (result.length === 0)
        result.push(<div className="content__technical_title" key={0}>
                Исполнителей не найдено
            </div>);

    return result;
}
/** 
 * Get an array of prepared featured playlists to insert into HTML.
 * @param  {} array - Array with featured playlists formed by spotify.js
 * @param  {} limit=-1 - Limit of artists
 */
export function getFeaturedPlaylistsHTML(array, limit = -1) {
    let result = [];
    if (!array || array.length === 0) {
        result.push(<div className="content__technical_title" key={0}>
                Исполнителей не найдено. Для просмотра необходимо авторизоваться.
            </div>);
        return result;
    }

    for (let i = 0; i < array.length; i++) {
        if (result.length >= limit && limit !== -1)
            break;
        result.push(<NavLink to={"/playlist/" + array[i].id} key={i}><div className="playlist">
                <img className="playlist__image" src={array[i].image_url} alt="scary-img"/>
                <div className="playlist__title">{array[i].name}</div>
                <div className="playlist__description">{array[i].owner}</div>
            </div></NavLink>);  
    }
    return result;
}
/**
 * Get an array of new album releases to insert into HTML.
 * @param  {} array - Array with new album releases formed by spotify.js
 * @param  {} limit=-1 - Limit of albums
 */
export function getNewAlbumReleasesHTML(array, limit = -1) {
    let result = [];

    if (array == null || array.length === 0) {
        result.push(<div className="content__technical_title" key={0}>
                Альбомов не найдено. Для просмотра необходимо авторизоваться.
            </div>);
        return result;
    }

    for (let i = 0; i < array.length; i++) {
        if (result.length >= limit && limit !== -1)
            break;
        result.push(<NavLink to={"/album/" + array[i].id} key={i}><div className="playlist">
                <img className="playlist__image" src={array[i].image_url} alt="scary-img"/>
                <div className="playlist__title">{array[i].name}</div>
                <div className="playlist__description">{array[i].desc}</div>
            </div></NavLink>);  
    }
    return result;
}
/**
 * Get an array of tracks to insert into HTML.
 * @param  {} array - Array with tracks formed by spotify.js
 * @param  {} limit=-1 - Limit of tracks
 */
export function getTracksHTML(array, limit = -1) {
    let result = [];

    if (!array || array.length === 0) {
        result.push(<div className="tracklist__technical-title" key={0}>
                Треков не найдено.
            </div>);
        return result;
    }

    for (let i = 0; i < array.length; i++) {
        if (result.length >= limit && limit !== -1)
            break;
        result.push(
            <div className="track-item" key={i}>
                <div className="track-item__wrapper">
                    {array[i].image_url !== undefined &&
                    <img className="track-item__image" src={array[i].image_url} alt="crush-img"/>}
                    <div className="track-item__desc">
                        <div className="track-item__name">
                            {array[i].name}
                        </div>
                        <div className="track-item__author">
                            {array[i].author}
                        </div>
                    </div>  
                </div>                                                         
                <div className="song-item__time">
                    {displayTime(array[i].duration)}
                </div>
            </div>);
    }
    return result;
}
/**
 * Get an array of shows to insert into HTML.
 * @param  {} array - Array with shows formed by spotify.js
 * @param  {} limit=-1 - Limit of shows
 */
export function getShowsHTML(array, limit = -1) {
    let result = [];
    if (!array || array.length === 0) {
        result.push(<div className="content__technical_title" key={0}>
                Исполнителей не найдено. Для просмотра необходимо авторизоваться.
            </div>);
        return result;
    }

    for (let i = 0; i < array.length; i++) {
        if (result.length >= limit && limit !== -1)
            break;
        result.push(<NavLink to={"/show/" + array[i].id} key={i}><div className="playlist">
            <img className="playlist__image" src={array[i].image_url} alt="scary-img"/>
            <div className="playlist__title">{array[i].name}</div>
            <div className="playlist__description">{array[i].owner}</div>
            </div></NavLink>);  
    }
    return result;
}
/** Get an array of episodes of Show to insert into HTML.
 * @param  {} array - Array with episodes if show formed by spotify.js
 * @param  {} limit=-1 - Limit of episodes
 */
export function getEpisodesHTML(array, limit = -1) {
    let result = [];
    if (!array || array.length === 0) {
        result.push(<div className="content__technical_title" key={0}>
                Треков не найдено.
            </div>);
        return result;
    }
    for (let i = 0; i < array.length; i++) {
        if (result.length >= limit && limit !== -1)
            break;
        result.push(
            <div className="track-item" key={i}>
                <div className="track-item__wrapper">
                    {array[i].image !== undefined &&
                    <img className="track-item__image" src={array[i].image} alt="crush-img"/>}
                    <div className="track-item__desc">
                        <div className="track-item__name">
                            {array[i].name}
                        </div>
                        <div className="track-item__author">
                            {array[i].desc}
                        </div>
                    </div>  
                </div>                                                         
                <div className="song-item__time">
                    {displayTime(array[i].duration)}
                </div>
            </div>);
    }
    return result;
}
/**
 * Returns the time as a string to paste in HTML.
 * @param  {} millisec - Time in milliseconds.
 */
function displayTime(millisec) {
    const normalizeTime = (time) => (time.length === 1) ? time.padStart(2, '0') : time;
    let seconds = (millisec / 1000).toFixed(0);
    let minutes = Math.floor(parseInt(seconds) / 60).toString();
    let hours = '';
   
    if (parseInt(minutes) > 59) {
      hours = normalizeTime(Math.floor(parseInt(minutes) / 60).toString());
      minutes = normalizeTime((parseInt(minutes) - (parseInt(hours) * 60)).toString());
    }
    seconds = normalizeTime(Math.floor(parseInt(seconds) % 60).toString());
   
    if (hours !== '') {
       return `${hours}:${minutes}:${seconds}`;
    }
      return `${minutes}:${seconds}`;
   }