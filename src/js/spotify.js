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

/**
 * Follow playlist by current user via playlistId
 * @param  {} playlistId - Playlist Id.
 */
export function followPlaylist(playlistId) {
    makeRequest(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, getRequestHeadersWithToken('PUT', 'application/json'))
    .then((response) => {
        if (response instanceof Error) alert("Error: can't follow playlist" + response.message);
    });
}

/**
 * Follow show by current user via showId
 * @param  {} showId - Show Id.
 */
export function followShow(showId) {
    makeRequest(`https://api.spotify.com/v1/me/shows?ids=${showId}`, getRequestHeadersWithToken('PUT', 'application/json'))
    .then((response) => {
        if (response instanceof Error) alert("Error: can't follow show" + response.message);
    });
}

/**
 * Follow album by current user via albumId
 * @param  {} albumId - Album Id.
 */
export function followAlbum(albumId) {
    makeRequest(`https://api.spotify.com/v1/me/albums?ids=${albumId}`, getRequestHeadersWithToken('PUT', 'application/json'))
    .then((response) => {
        if (response instanceof Error) alert("Error: can't follow album" + response.message);
    });
}