import { useEffect, useState } from "react";
import { followAlbum, followPlaylist, followShow, getAlbumState, getPlaylistState, getShowState, PLAYLIST_TYPES, removeUserAlbum, removeUserPlaylist, removeUserShow } from "../../js/spotify";

function FollowButton({id, type}) {
    const [isFollowed, setIsFollowed] = useState(false);

    useEffect(() => {
        if (type === PLAYLIST_TYPES.ALBUM) getAlbumState(id).then((data) => setIsFollowed(data[0]));
        if (type === PLAYLIST_TYPES.PLAYLIST) getPlaylistState(id).then((data) => setIsFollowed(data[0]));
        if (type === PLAYLIST_TYPES.SHOW) getShowState(id).then((data) => setIsFollowed(data[0]));
    }, [isFollowed, id, type]);
    const imageSource = isFollowed ? "/resources/images/button-added.png" : "/resources/images/button-add.png";
    return (
        <input className="spotify-container__tracklist-add-button" type="image" onClick={() => {
            if (type === PLAYLIST_TYPES.ALBUM) {
                if (!isFollowed)
                    followAlbum(id).then(() => setIsFollowed(true));
                else
                    removeUserAlbum(id).then(() => setIsFollowed(false));
            }
            if (type === PLAYLIST_TYPES.PLAYLIST) {
                if (!isFollowed)
                    followPlaylist(id).then(() => setIsFollowed(true));
                else
                    removeUserPlaylist(id).then(() => setIsFollowed(false));
            }   
            if (type === PLAYLIST_TYPES.SHOW) {
                if (!isFollowed)
                    followShow(id).then(() => setIsFollowed(true));
                else
                    removeUserShow(id).then(() => setIsFollowed(false));
            } 
        }} src={imageSource} alt="button-add"/>
    )
}

export default FollowButton;