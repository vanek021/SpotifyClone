import { defaultAvatar, defaultPlaylistImage } from "./baseResources";
import { MakeRequest } from "./requestsManager";

// Constant's block
export const search_tracks_limit = 4;
export const search_artists_limit = 8;
export const featured_playlists_limit = 20;
export const new_albums_limit = 20;

export const Constants = {
    ifUsersFollowPlaylistUrl: function(playlistId, userId) { return `https://api.spotify.com/v1/playlists/${playlistId}/followers/contains?ids=${userId}` },
    FollwPlaylistUrl: function(playlistId) { return `https://api.spotify.com/v1/playlists/${playlistId}/followers`; },
    FollowShowUrl: function(showId) { return `https://api.spotify.com/v1/me/shows?ids=${showId}`; },
    IfUserFollowShowUrl: function(showId) { return `https://api.spotify.com/v1/me/shows/contains?ids=${showId}`; },
    FollowAlbumUrl: function(albumId) { return `https://api.spotify.com/v1/me/albums?ids=${albumId}`; },
    IfUserFollowAlbumUrl: function(albumId) { return `https://api.spotify.com/v1/me/albums/contains?ids=${albumId}`; },
    SearchResultUrl: function(query) { return `https://api.spotify.com/v1/search?type=artist,track&q=${query}`; },
    GetAlbumUrl: function(albumId) { return `https://api.spotify.com/v1/albums/${albumId}`; },
    GetPlaylistUrl: function(playlistId) { return `https://api.spotify.com/v1/playlists/${playlistId}`; },
    GetShowUrl: function(showId) { return `https://api.spotify.com/v1/shows/${showId}`; },
    GetSavedShowsUrl: function() { return `https://api.spotify.com/v1/me/shows`; },
    GetCurrentUserPlaylistsUrl: function() { return `https://api.spotify.com/v1/me/playlists`; },
    GetNewAlbumReleasesUrl: function() { return `https://api.spotify.com/v1/browse/new-releases`; },
    GetFeaturedPlaylistsUrl: function() { return `https://api.spotify.com/v1/browse/featured-playlists`; },
    GetCurrentUserProfileUrl: function() { return `https://api.spotify.com/v1/me`; }

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
}

/**
 * Returns name of subscription by provided sub_name from Spotify response.
 * @param  {} sub_name - Subscription name.
 */
export function GetSubscriptionName(sub_name) {
    if (subscriptions.hasOwnProperty(sub_name))
        return subscriptions[sub_name].name;
    else
        return subscriptions["error"].name;
}

/**
 * Returns description of subscription by provided sub_name from Spotify response.
 * @param  {} sub_name - Subscription name.
 */
export function GetSubscriptionDesc(sub_name) {
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
function GetBestItemBySearch(data) {
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
 * Return tracks for search
 * @param  {} data - Returned response result in JSON format from search request.
 * @returns Array with track objects with fields: href, name, image_url, type, author, duration
. */
function GetTracksFromSearch(data) {
    let result = [];
    for (let i = 0; i < data.tracks.items.length; i++) {
        if (result.length === search_tracks_limit)
            break;
        let image_link = data.tracks.items[i].album.images.length > 0 ?
            data.tracks.items[i].album.images[0].url : defaultAvatar;
        let track = {
            href: data.tracks.items[i].href,
            name: data.tracks.items[i].name,
            image_url: image_link,
            type: 'Трек',
            author: data.tracks.items[i].artists.map(x => x.name).join(' '),
            duration: data.tracks.items[i].duration_ms
        };
        result.push(track);
    }
    return result;
}

/**
 * Return artists for search
 * @param  {} data - Returned response result in JSON format from search request.
 * @returns Array with artists objects with fields: href, name, image_url, type.
 */
function GetArtistsFromSearch(data) {
    let result = [];
    for (let i = 0; i < data.artists.items.length; i++) {
        if (result.length === search_artists_limit)
            break;
        let image_link = data.artists.items[i].images.length > 0 ?
            data.artists.items[i].images[0].url : defaultAvatar;
        let artist = {
            href: data.artists.items[i].href,
            name: data.artists.items[i].name,
            image_url: image_link,
            type: 'Исполнитель'
        };
        result.push(artist);
    }
    return result;
}

/**
 * Form search result
 * @param  {} data - Returned response result in JSON format from search request.
 * @returns Result object of search with fields: best, tracks[], artists[]
 */
export function FormSearchResult(data) {
    if (data.artists.items.length === 0 && data.tracks.items.length === 0)
        return null;
    let result = {};
    result.best = GetBestItemBySearch(data);
    if (!(data.tracks.items === undefined && data.tracks.items.length === 0))
        result.tracks = GetTracksFromSearch(data);
    if (!(data.artists.items === undefined && data.artists.items.length === 0))
        result.artists = GetArtistsFromSearch(data);
    return result;
}

/**
 * Form featured playlists.
 * @param  {} data - Returned response result in JSON format from featured playlists request.
 * @returns Prepared from request object with result.playlists field
 */
export function FormFeaturedPlaylists(data) {
    let result = {};
    if (!(data.items === undefined && data.items.length === 0))
        result.playlists = GetFeaturedPlaylists(data);
    return result;
}

/**
 * Form array of playlists
 * @param  {} data - Returned response result in JSON format from featured playlists request.
 * @returns Array with featured playlists
 */
function GetFeaturedPlaylists(data) {
    let result = [];
    for (let i = 0; i < data.items.length; i++) {
        if (result.length === featured_playlists_limit)
            break;
        let image_link = data.items[i].images.length > 0 ?
            data.items[i].images[0].url : defaultPlaylistImage;
        let playlist = {
            href: data.items[i].href,
            name: data.items[i].name,
            image_url: image_link,
            id: data.items[i].id,
            owner: data.items[i].owner.display_name.length > 15 ? 
                data.items[i].owner.display_name.slice(0, 15) + '...' : data.items[i].owner.display_name,
            type: 'Плейлист'
        };
        result.push(playlist);
    }
    return result;
}

/**
 * Form new album releases.
 * @param  {} data - Returned response result in JSON format from new album releases request.
 * @returns Prepared from request object with result.albums field
 */
export function FormNewAlbumReleases(data) {
    let result = {};
    if (!(data.albums.items === undefined && data.albums.items.length === 0)) {
        result.albums = GetNewAlbumReleases(data);
    }
    return result;
}

/**
 * Form array of albums
 * @param  {} data - Returned response result in JSON format from new album releases request.
 * @returns Array with new album releases
 */
function GetNewAlbumReleases(data) {
    let result = [];
    for (let i = 0; i < data.albums.items.length; i++) {
        if (result.length === new_albums_limit)
            break;
        let image_link = data.albums.items[i].images.length > 0 ?
            data.albums.items[i].images[0].url : defaultAvatar;
        let playlist = {
            href: data.albums.items[i].href,
            name: data.albums.items[i].name.length > 15 ?
                data.albums.items[i].name.slice(0, 15) + '...' : data.albums.items[i].name,
            image_url: image_link,
            desc: 'Треков: ' + data.albums.items[i].total_tracks,
            id: data.albums.items[i].id,
            type: 'Альбом'
        };
        result.push(playlist);
    }
    return result;
}

/**
 * Form array of tracks.
 * @param  {} data - Returned response result in JSON format from get playlist tracks request.
 * @returns Prepared from request object with with information about playlist.
 */
export function FormTracksOfPlaylist(data) {
    let result = {};
    if (!(data.tracks.items === undefined && data.tracks.items.length === 0)) {
        result.tracks = GetTracksFromPlaylist(data);
        result.name = data.name;
        result.image = data.images.length > 0 ?
        data.images[0].url : defaultPlaylistImage;
        result.id = data.id;
    }
    return result;
}

/**
 * Form array of tracks
 * @param  {} data - Returned response result in JSON format from get playlist request.
 * @returns Array with tracks
 */
function GetTracksFromPlaylist(data) {
    let result = [];
    for (let i = 0; i < data.tracks.items.length; i++) {
        let image_link = data.tracks.items[i].track.album.images.length > 0 ?
            data.tracks.items[i].track.album.images[0].url : defaultAvatar;
        let track = {
            href: data.tracks.items[i].track.href,
            name: data.tracks.items[i].track.name,
            author: data.tracks.items[i].track.artists.map(x => x.name).join(' '),
            image_url: image_link,
            duration: data.tracks.items[i].track.duration_ms
        };
        result.push(track);
    }
    return result;
}

/**
 * Form array of tracks.
 * @param  {} data - Returned response result in JSON format from get album tracks request.
 * @returns Prepared from request object with with information about album.
 */
export function FormTracksOfAlbum(data) {
    let result = {};
    if (!(data.tracks.items === undefined && data.tracks.items.length === 0)) {
        result.tracks = GetTracksFromAlbum(data);
        result.name = data.name;
        result.image = data.images.length > 0 ?
        data.images[0].url : defaultAvatar;
        result.id = data.id;
    }
    return result;
}

/**
 * Form array of tracks.
 * @param  {} data - Returned response result in JSON format from get album tracks request.
 * @returns Array with tracks.
 */
function GetTracksFromAlbum(data) {
    let result = [];
    for (let i = 0; i < data.tracks.items.length; i++) {
        let track = {
            href: data.tracks.items[i].href,
            name: data.tracks.items[i].name,
            author: data.tracks.items[i].artists.map(x => x.name).join(' '),
            duration: data.tracks.items[i].duration_ms
        };
        result.push(track);
    }
    return result;
}

/**
 * Form array of shows.
 * @param  {} data - Returned response result in JSON format from get shows request.
 * @returns Prepared from request object with information about shows.
 */
export function FormShows(data) {
    let result = {};
    if (!(data.items === undefined && data.items.length === 0)) {
        result.shows = GetShows(data);
    }
    return result;
}

/**
 * Form array of shows.
 * @param  {} data - Returned response result in JSON format from get shows request.
 * @returns Array with shows.
 */
function GetShows(data) {
    let result = [];
    for (let i = 0; i < data.items.length; i++) {
        if (result.length === featured_playlists_limit)
            break;
        let image_link = data.items[i].show.images.length > 0 ?
            data.items[i].show.images[0].url : defaultPlaylistImage;
        let playlist = {
            href: data.items[i].show.href,
            name: data.items[i].show.name,
            image_url: image_link,
            id: data.items[i].show.id,
            owner: data.items[i].show.publisher > 15 ? 
                data.items[i].show.publisher.slice(0, 15) + '...' : data.items[i].show.publisher,
            type: 'Подкаст'
        };
        result.push(playlist);
    }
    return result;
}

/**
 * Form array of show episodes.
 * @param  {} data - Returned response result in JSON format from get show episodes request.
 * @returns Prepared from request object with information about show episodes.
 */
export function FormEpisodesFromShow(data) {
    let result = {};
    if (!(data.episodes.items === undefined && data.episodes.items.length === 0)) {
        result.episodes = GetEpisodesFromShow(data);
        result.name = data.name;
        result.image = data.images.length > 0 ?
        data.images[0].url : defaultAvatar;
    }
    return result;
}

/**
 * Form array of episodes.
 * @param  {} data - Returned response result in JSON format from get show episodes request.
 * @returns Array with episodes of show.
 */
function GetEpisodesFromShow(data) {
    let result = [];
    for (let i = 0; i < data.episodes.items.length; i++) {
        let track = {
            href: data.episodes.items[i].href,
            name: data.episodes.items[i].name,
            desc: data.episodes.items[i].description > 15 ? 
                data.episodes.items[i].description.slice(0, 15) + '...' : data.episodes.items[i].description,
            image : data.episodes.items[i].images.length > 0 ?
            data.episodes.items[i].images[0].url : defaultAvatar,
            duration: data.episodes.items[i].duration_ms
        };
        result.push(track);
    }
    return result;
}
/**
 * Follow playlist by current user via playlistId
 * @param  {} playlistId - Playlist Id.
 */
export function FollowPlaylist(playlistId) {
    MakeRequest(Constants.FollwPlaylistUrl(playlistId), 'PUT', 'application/json')
    .then((response) => {
        if (response instanceof Error) console.error("Error: can't follow playlist" + response.message);
    });
}

/**
 * Follow show by current user via showId
 * @param  {} showId - Show Id.
 */
export function FollowShow(showId) {
    MakeRequest(Constants.FollowShowUrl(showId), 'PUT', 'application/json')
    .then((response) => {
        if (response instanceof Error) console.error("Error: can't follow show" + response.message);
    });
}

/**
 * Follow album by current user via albumId
 * @param  {} albumId - Album Id.
 */
export function FollowAlbum(albumId) {
    MakeRequest(Constants.FollowAlbumUrl(albumId), 'PUT', 'application/json')
    .then((response) => {
        if (response instanceof Error) console.error("Error: can't follow album" + response.message);
    });
}