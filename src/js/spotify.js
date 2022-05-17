import { defaultAvatar, defaultPlaylistImage } from "./baseResources";
import { makeRequest, getRequestHeadersWithToken } from "./requestsManager";

export const searchTracksLimit = 4;
export const searchArtistsLimit = 8;
export const featuredPlaylistsLimit = 20;
export const newAlbumsLimit = 20;
export const constants = {
    ifUsersFollowPlaylistUrl: function(playlistId, userId) { return `https://api.spotify.com/v1/playlists/${playlistId}/followers/contains?ids=${userId}` },
    follwPlaylistUrl: function(playlistId) { return `https://api.spotify.com/v1/playlists/${playlistId}/followers`; },
    followShowUrl: function(showId) { return `https://api.spotify.com/v1/me/shows?ids=${showId}`; },
    ifUserFollowShowUrl: function(showId) { return `https://api.spotify.com/v1/me/shows/contains?ids=${showId}`; },
    followAlbumUrl: function(albumId) { return `https://api.spotify.com/v1/me/albums?ids=${albumId}`; },
    ifUserFollowAlbumUrl: function(albumId) { return `https://api.spotify.com/v1/me/albums/contains?ids=${albumId}`; },
    searchResultUrl: function(query) { return `https://api.spotify.com/v1/search?type=artist,track&q=${query}`; },
    getAlbumUrl: function(albumId) { return `https://api.spotify.com/v1/albums/${albumId}`; },
    getPlaylistUrl: function(playlistId) { return `https://api.spotify.com/v1/playlists/${playlistId}`; },
    getShowUrl: function(showId) { return `https://api.spotify.com/v1/shows/${showId}`; },
    getSavedShowsUrl: function() { return `https://api.spotify.com/v1/me/shows`; },
    getCurrentUserPlaylistsUrl: function() { return `https://api.spotify.com/v1/me/playlists`; },
    getNewAlbumReleasesUrl: function() { return `https://api.spotify.com/v1/browse/new-releases`; },
    getFeaturedPlaylistsUrl: function() { return `https://api.spotify.com/v1/browse/featured-playlists`; },
    getCurrentUserProfileUrl: function() { return `https://api.spotify.com/v1/me`; },
    getApiTokenUrl: function() { return `https://accounts.spotify.com/api/token`; }

};

const subscriptions = {
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

const itemHandlers = {
    episodeItemHandler: function(episode) {
        return {
            href: episode.href,
            name: episode.name,
            desc: episode.description > 15 ? episode.description.slice(0, 15) + '...' : episode.description,
            image: episode.images.length > 0 ? episode.images[0].url : defaultAvatar,
            duration: episode.duration_ms
        }
    },
    playlistTrackHandler: function(item) {
        return {
            href: item.track.href,
            name: item.track.name,
            author: item.track.artists.map(x => x.name).join(' '),
            image_url: item.track.album.images.length > 0 ? item.track.album.images[0].url : defaultAvatar,
            duration: item.track.duration_ms
        }
    },
    albumTrackHandler: function(item) {
        return {
            href: item.href,
            name: item.name,
            author: item.artists.map(x => x.name).join(' '),
            duration: item.duration_ms
        }
    },
    searchTrackHandler: function(item) {
        return {
            href: item.href,
            name: item.name,
            image_url: item.album.images.length > 0 ? item.album.images[0].url : defaultAvatar,
            type: 'Трек',
            author: item.artists.map(x => x.name).join(' '),
            duration: item.duration_ms           
        }
    },

    showHandler: function(item) {
        return {
            href: item.show.href,
            name: item.show.name,
            image_url: item.show.images.length > 0 ? item.show.images[0].url : defaultPlaylistImage,
            id: item.show.id,
            owner: item.show.publisher > 15 ? item.show.publisher.slice(0, 15) + '...' : item.show.publisher,
            type: 'Подкаст'           
        }
    },
    albumHandler: function(item) {
        return {
            href: item.href,
            name: item.name.length > 15 ? item.name.slice(0, 15) + '...' : item.name,
            image_url: item.images.length > 0 ? item.images[0].url : defaultAvatar,
            desc: 'Треков: ' + item.total_tracks,
            id: item.id,
            type: 'Альбом'
        }
    },
    playlistHandler: function(item) {
        return {
            href: item.href,
            name: item.name,
            image_url: item.images.length > 0 ? item.images[0].url : defaultPlaylistImage,
            id: item.id,
            owner: item.owner.display_name.length > 15 ? item.owner.display_name.slice(0, 15) + '...' : item.owner.display_name,
            type: 'Плейлист'
        }
    },
    artistHandler: function(item) {
        return {
            href: item.href,
            name: item.name,
            image_url: item.images.length > 0 ? item.images[0].url : defaultAvatar,
            type: 'Исполнитель'
        }
    }
};

/**
 * Returns name of subscription by provided sub_name from Spotify response.
 * @param  {} sub_name - Subscription name.
 */
export function getSubscriptionName(sub_name) {
    if (subscriptions.hasOwnProperty(sub_name))
        return subscriptions[sub_name].name;
    else
        return subscriptions["error"].name;
}

/**
 * Returns description of subscription by provided sub_name from Spotify response.
 * @param  {} sub_name - Subscription name.
 */
export function getSubscriptionDesc(sub_name) {
    if (subscriptions.hasOwnProperty(sub_name))
        return subscriptions[sub_name].desc;
    else
        return subscriptions["error"].desc;
}

/**
 * Returns best result for search
 * @param  {} data - Returned response result in JSON format from search request.
 * @returns Object with fields: href, name, image_url, type.
 */
function getBestItemBySearch(data) {
    if (data.artists.items.length === 0 && data.tracks.items.length === 0)
        return null;

    if (data.artists.items.length >= 1) {
        let image_link = data.artists.items[0].images[0].url;
        return {
            href: data.artists.items[0].href,
            name: data.artists.items[0].name,
            image_url: image_link === undefined ? defaultAvatar : image_link,
            type: 'Исполнитель'
        };
    }
    else  {
        let image_link = data.tracks.items[0].album.images[0].url;
        return {
            href: data.tracks.items[0].href,
            name: data.tracks.items[0].name,
            image_url: image_link === undefined ? defaultAvatar : image_link,
            type: 'Трек'
        };
    }
}

/**
 * Form search result
 * @param  {} data - Returned response result in JSON format from search request.
 * @returns Result object of search with fields: best, tracks[], artists[]
 */
export function formSearchResult(data) {
    if (data.artists.items.length === 0 && data.tracks.items.length === 0)
        return null;

    let result = {};
    result.best = getBestItemBySearch(data);
    result.tracks = [];
    result.artists = [];
    
    if (data.tracks.items !== undefined && data.tracks.items.length > 0)
         result.tracks = handleSpotifyArray(data.tracks.items, itemHandlers.searchTrackHandler)
            .slice(0, searchTracksLimit);
            
    if (data.artists.items !== undefined && data.artists.items.length > 0)
        result.artists = handleSpotifyArray(data.artists.items, itemHandlers.artistHandler)
            .slice(0, searchArtistsLimit);
    return result;
}

/**
 * Form featured playlists.
 * @param  {} data - Returned response result in JSON format from featured playlists request.
 * @returns Prepared from request object with result.playlists field
 */
export function formFeaturedPlaylists(data) {
    let result = {};
    if (!(data.items === undefined || data.items.length === 0))
        result.playlists = handleSpotifyArray(data.items, itemHandlers.playlistHandler);
    return result;
}

/**
 * Form new album releases.
 * @param  {} data - Returned response result in JSON format from new album releases request.
 * @returns Prepared from request object with result.albums field
 */
export function formNewAlbumReleases(data) {
    let result = {};
    if (!(data.albums.items === undefined || data.albums.items.length === 0))
        result.albums = handleSpotifyArray(data.albums.items, itemHandlers.albumHandler);
    return result;
}

/**
 * Form array of tracks.
 * @param  {} data - Returned response result in JSON format from get playlist tracks request.
 * @returns Prepared from request object with with information about playlist.
 */
export function formTracksOfPlaylist(data) {
    let result = {};
    if (!(data.tracks.items === undefined || data.tracks.items.length === 0)) {
        result.tracks = handleSpotifyArray(data.tracks.items, itemHandlers.playlistTrackHandler);
        result.name = data.name;
        result.image = data.images.length > 0 ?
        data.images[0].url : defaultPlaylistImage;
        result.id = data.id;    
    }
    return result;
}

/**
 * Form array of tracks.
 * @param  {} data - Returned response result in JSON format from get album tracks request.
 * @returns Prepared from request object with with information about album.
 */
export function formTracksOfAlbum(data) {
    let result = {};
    if (!(data.tracks.items === undefined || data.tracks.items.length === 0)) {
        result.name = data.name;
        result.image = data.images.length > 0 ?
        data.images[0].url : defaultAvatar;
        result.id = data.id;
        result.tracks = handleSpotifyArray(data.tracks.items, itemHandlers.albumTrackHandler);
    }
    return result;
}

/**
 * Form array of shows.
 * @param  {} data - Returned response result in JSON format from get shows request.
 * @returns Prepared from request object with information about shows.
 */
export function formShows(data) {
    let result = {};
    if (!(data.items === undefined || data.items.length === 0)) {
        result.shows = handleSpotifyArray(data.items, itemHandlers.showHandler);
    }
    return result;
}

/**
 * Form array of show episodes.
 * @param  {} data - Returned response result in JSON format from get show episodes request.
 * @returns Prepared from request object with information about show episodes.
 */
export function formEpisodesFromShow(data) {
    let result = {};
    if (!(data.episodes.items === undefined || data.episodes.items.length === 0)) {
        result.name = data.name;
        result.image = data.images.length > 0 ? data.images[0].url : defaultAvatar;
        result.episodes = handleSpotifyArray(data.episodes.items, itemHandlers.episodeItemHandler);
    }
    return result;
}

function handleSpotifyArray(array, itemHandlerFunction) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(itemHandlerFunction(array[i]));
    }
    return result;
}

/**
 * Follow playlist by current user via playlistId
 * @param  {} playlistId - Playlist Id.
 */
export function followPlaylist(playlistId) {
    makeRequest(constants.follwPlaylistUrl(playlistId), getRequestHeadersWithToken('PUT', 'application/json'))
    .then((response) => {
        if (response instanceof Error) console.error("Error: can't follow playlist" + response.message);
    });
}

/**
 * Follow show by current user via showId
 * @param  {} showId - Show Id.
 */
export function followShow(showId) {
    makeRequest(constants.followShowUrl(showId), getRequestHeadersWithToken('PUT', 'application/json'))
    .then((response) => {
        if (response instanceof Error) console.error("Error: can't follow show" + response.message);
    });
}

/**
 * Follow album by current user via albumId
 * @param  {} albumId - Album Id.
 */
export function followAlbum(albumId) {
    makeRequest(constants.followAlbumUrl(albumId), getRequestHeadersWithToken('PUT', 'application/json'))
    .then((response) => {
        if (response instanceof Error) console.error("Error: can't follow album" + response.message);
    });
}