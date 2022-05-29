import { getUserId } from "./cookieManager";
import { makeRequest, getRequestHeadersWithToken } from "./requestsManager";

export const SEARCH_TRACKS_LIMIT = 4;
export const SEARCH_ARTISTS_LIMIT = 8;
export const FEATURED_PLAYLISTS_LIMIT = 20;
export const NEW_ALBUMS_LIMIT = 20;

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

export function getUserData() {
    return makeRequest(`https://api.spotify.com/v1/me`, getRequestHeadersWithToken('GET'))
        .then(response => response).catch(e => console.error(e));
}

export function getAlbumData(id) {
    return makeRequest(`https://api.spotify.com/v1/albums/${id}`, getRequestHeadersWithToken('GET'))
        .then(response => response).catch(e => console.error(e));
}

export function getAlbumState(id) {
    return makeRequest(`https://api.spotify.com/v1/me/albums/contains?ids=${id}`, getRequestHeadersWithToken('GET'))
        .then(response => response).catch(e => console.error(e));
}

export function getFeaturedPlaylists() {
    return makeRequest(`https://api.spotify.com/v1/browse/featured-playlists`, getRequestHeadersWithToken('GET'))
        .then(response => response).catch(e => console.error(e));
}

export function getNewReleases() {
    return makeRequest(`https://api.spotify.com/v1/browse/new-releases`, getRequestHeadersWithToken('GET'))
        .then(response => response).catch(e => console.error(e));
}

export function getUserPlaylists() {
    return makeRequest(`https://api.spotify.com/v1/me/playlists`, getRequestHeadersWithToken('GET'))
        .then(response => response).catch(e => console.error(e));
}

export function getUserShows() {
    return makeRequest(`https://api.spotify.com/v1/me/shows`, getRequestHeadersWithToken('GET'))
        .then(response => response).catch(e => console.error(e));
}

export function getPlaylistData(id) {
    return makeRequest(`https://api.spotify.com/v1/playlists/${id}`, getRequestHeadersWithToken('GET'))
        .then(response => response).catch(e => console.error(e));
}

export function getPlaylistState(id) {
    return makeRequest(`https://api.spotify.com/v1/playlists/${id}/followers/contains?ids=${getUserId()}`, getRequestHeadersWithToken('GET'))
        .then(response => response).catch(e => console.error(e));
}

export function getSearchResult(query) {
    return makeRequest(`https://api.spotify.com/v1/search?type=artist,track&q=${query}`, getRequestHeadersWithToken('GET'))
        .then(response => response).catch(e => console.error(e));
}

export function getShowData(id) {
    return makeRequest(`https://api.spotify.com/v1/shows/${id}`, getRequestHeadersWithToken('GET'))
        .then(response => response).catch(e => console.error(e));
}

export function getShowState(id) {
    return makeRequest(`https://api.spotify.com/v1/me/shows/contains?ids=${id}`, getRequestHeadersWithToken('GET'))
        .then(response => response).catch(e => console.error(e));
}

/**
 * Follow playlist by current user via playlistId
 * @param  {} playlistId - Playlist Id.
 */
export function followPlaylist(playlistId) {
    makeRequest(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, getRequestHeadersWithToken('PUT'))
        .then(response => response).catch(e => alert("Error: can't follow playlist" + e));
}

/**
 * Follow show by current user via showId
 * @param  {} showId - Show Id.
 */
export function followShow(showId) {
    makeRequest(`https://api.spotify.com/v1/me/shows?ids=${showId}`, getRequestHeadersWithToken('PUT'))
        .then(response => response).catch(e => alert("Error: can't follow show" + e));
}

/**
 * Follow album by current user via albumId
 * @param  {} albumId - Album Id.
 */
export function followAlbum(albumId) {
    makeRequest(`https://api.spotify.com/v1/me/albums?ids=${albumId}`, getRequestHeadersWithToken('PUT'))
        .then(response => response).catch(e => alert("Error: can't follow album" + e));
}