import { getUserId } from "./cookieManager";
import { makeRequest, getRequestHeadersWithToken } from "./requestsManager";

export const SEARCH_TRACKS_LIMIT = 4;
export const SEARCH_ARTISTS_LIMIT = 8;
export const FEATURED_PLAYLISTS_LIMIT = 20;
export const NEW_ALBUMS_LIMIT = 20;
export const PLAYLIST_TYPES = { PLAYLIST: "playlist", ALBUM: "album", SHOW: "show" }
export const TRACK_TYPES = { ALBUM_TRACK: "albumTrack", SHOW_EPISODE: "showEpisode", PLAYLIST_TRACK: "playlistTrack" }

const SUBSCRIPTIONS = {
    error: {
        name: "",
        desc: "Ошибка при определении подписки."
    },
    open: {
        name: "Бесплатно",
        desc: "Треки можно слушать вперемешку. Есть реклама."
    },
    premium: {
        name: "Премиум",
        desc: "Премиум подписка. Доступен весь функционал."
    }
};

/**
 * Returns name of subscription by provided sub_name from Spotify response.
 * @param  {} subName - Subscription name.
 */
export function getSubscriptionName(subName) {
    if (SUBSCRIPTIONS.hasOwnProperty(subName))
        return SUBSCRIPTIONS[subName].name;
    else
        return SUBSCRIPTIONS["error"].name;
}

/**
 * Returns description of subscription by provided sub_name from Spotify response.
 * @param  {} subName - Subscription name.
 */
export function getSubscriptionDesc(subName) {
    if (SUBSCRIPTIONS.hasOwnProperty(subName))
        return SUBSCRIPTIONS[subName].desc;
    else
        return SUBSCRIPTIONS["error"].desc;
}

/**
 * Request to Spotify Web API for information about Spotify authenticated user
 * @returns Promise with information about user in JSON format
 */
export function getUserData() {
    return makeRequest(`https://api.spotify.com/v1/me`, getRequestHeadersWithToken('GET'))
        .then(response => response).catch(e => console.error(e));
}

/**
 * Request to Spotify Web API for information about album by id
 * @param  {string} id - albumd id
 * @returns Promise with information about album in JSON format
 */
export function getAlbumData(id) {
    return makeRequest(`https://api.spotify.com/v1/albums/${id}`, getRequestHeadersWithToken('GET'))
        .then(response => response).catch(e => console.error(e));
}

/**
 * Request to Spotify Web API for information if is the user subscribed to the album
 * @param  {string} id - album id
 * @returns Promise with information if is the user subscribed to the album in JSON format
 */
export function getAlbumState(id) {
    return makeRequest(`https://api.spotify.com/v1/me/albums/contains?ids=${id}`, getRequestHeadersWithToken('GET'))
        .then(response => response).catch(e => console.error(e));
}

/**
 * Request to Spotify Web API to get featured playlists
 * @returns Promise with featured playlists in JSON format
 */
export function getFeaturedPlaylists() {
    return makeRequest(`https://api.spotify.com/v1/browse/featured-playlists`, getRequestHeadersWithToken('GET'))
        .then(response => response).catch(e => console.error(e));
}

/**
 * Request to Spotify Web API to get new albums releases
 * @returns Promise with new albums releases in JSON format
 */
export function getNewReleases() {
    return makeRequest(`https://api.spotify.com/v1/browse/new-releases`, getRequestHeadersWithToken('GET'))
        .then(response => response).catch(e => console.error(e));
}

/**
 * Request to Spotify Web API to get authenticated user playlists
 * @returns Promise with authenticated user playlists in JSON format
 */
export function getUserPlaylists() {
    return makeRequest(`https://api.spotify.com/v1/me/playlists`, getRequestHeadersWithToken('GET'))
        .then(response => response).catch(e => console.error(e));
}

/**
 * Request to Spotify Web API to get authenticated user shows
 * @returns Promise with authenticated user shows in JSON format
 */
export function getUserShows() {
    return makeRequest(`https://api.spotify.com/v1/me/shows`, getRequestHeadersWithToken('GET'))
        .then(response => response).catch(e => console.error(e));
}

/**
 * Request to Spotify Web API for information about playlist by id
 * @param  {string} id - playlist id
 * @returns Promise with information about playlist in JSON format
 */
export function getPlaylistData(id) {
    return makeRequest(`https://api.spotify.com/v1/playlists/${id}`, getRequestHeadersWithToken('GET'))
        .then(response => response).catch(e => console.error(e));
}

/**
 * Request to Spotify Web API for information if is the user subscribed to the playlist
 * @param  {string} id - playlist id
 * @returns Promise with information if is the user subscribed to the playlist in JSON format
 */
export function getPlaylistState(id) {
    return makeRequest(`https://api.spotify.com/v1/playlists/${id}/followers/contains?ids=${getUserId()}`, getRequestHeadersWithToken('GET'))
        .then(response => response).catch(e => console.error(e));
}

/**
 * Request to Spotify Web API to get search result
 * @param  {string} query - search text
 * @returns Promise with search result in JSON format
 */
export function getSearchResult(query) {
    return makeRequest(`https://api.spotify.com/v1/search?type=artist,track&q=${query}`, getRequestHeadersWithToken('GET'))
        .then(response => response).catch(e => console.error(e));
}

/**
 * Request to Spotify Web API for information about show by id
 * @param  {string} id - show id
 * @returns Promise with information about show in JSON format
 */
export function getShowData(id) {
    return makeRequest(`https://api.spotify.com/v1/shows/${id}`, getRequestHeadersWithToken('GET'))
        .then(response => response).catch(e => console.error(e));
}

/**
 * Request to Spotify Web API for information if is the user subscribed to the show
 * @param  {string} id - show id
 * @returns Promise with information if is the user subscribed to the show in JSON format
 */
export function getShowState(id) {
    return makeRequest(`https://api.spotify.com/v1/me/shows/contains?ids=${id}`, getRequestHeadersWithToken('GET'))
        .then(response => response).catch(e => console.error(e));
}

/**
 * Follow playlist by current user via playlistId
 * @param  {} playlistId - Playlist Id.
 */
export function followPlaylist(playlistId) {
    return makeRequest(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, getRequestHeadersWithToken('PUT'))
        .then(response => response).catch(e => alert("Error: can't follow playlist" + e));
}

/**
 * Follow show by current user via showId
 * @param  {} showId - Show Id.
 */
export function followShow(showId) {
    return makeRequest(`https://api.spotify.com/v1/me/shows?ids=${showId}`, getRequestHeadersWithToken('PUT'))
        .then(response => response).catch(e => alert("Error: can't follow show" + e));
}

/**
 * Follow album by current user via albumId
 * @param  {} albumId - Album Id.
 */
export function followAlbum(albumId) {
    return makeRequest(`https://api.spotify.com/v1/me/albums?ids=${albumId}`, getRequestHeadersWithToken('PUT'))
        .then(response => response).catch(e => alert("Error: can't follow album" + e));
}