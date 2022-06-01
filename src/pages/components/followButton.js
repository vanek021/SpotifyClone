import { useEffect, useState } from "react";
import { followAlbum, followPlaylist, followShow, getAlbumState, getPlaylistState, getShowState, PLAYLIST_TYPES } from "../../js/spotify";

function FollowButton({id, type}) {
    const [isFollowed, setIsFollowed] = useState(false);

    useEffect(() => {
        if (type === PLAYLIST_TYPES.ALBUM) getAlbumState(id).then((data) => setIsFollowed(data[0]));
        if (type === PLAYLIST_TYPES.PLAYLIST) getPlaylistState(id).then((data) => setIsFollowed(data[0]));
        if (type === PLAYLIST_TYPES.SHOW) getShowState(id).then((data) => setIsFollowed(data[0]));
    }, [isFollowed, id, type]);

    return isFollowed ? (
        <input className="spotify-container__tracklist-add-button" type="image" src="/resources/images/button-added.png" alt="button-added"/>
    ) : (
        <input className="spotify-container__tracklist-add-button" type="image" onClick={() => { 
            if (type === PLAYLIST_TYPES.ALBUM) followAlbum(id).then(() => setIsFollowed(true));
            if (type === PLAYLIST_TYPES.PLAYLIST) followPlaylist(id).then(() => setIsFollowed(true));
            if (type === PLAYLIST_TYPES.SHOW) followShow(id).then(() => setIsFollowed(true));
        }} src="/resources/images/button-add.png" alt="button-add"/>
    )
}

export default FollowButton;