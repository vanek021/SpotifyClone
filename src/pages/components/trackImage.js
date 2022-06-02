import { DEFAULT_AVATAR } from "../../js/baseResources";
import { TRACK_TYPES } from "../../js/spotify";

function TrackImage({item, type}) {
    if (type === TRACK_TYPES.SHOW_EPISODE)
        return <img className="track-item__image" src={item.images?.length > 0 ? item.images[0].url : DEFAULT_AVATAR} alt="img"/>;
    else if (type === TRACK_TYPES.PLAYLIST_TRACK)
        return <img className="track-item__image" src={item.album.images?.length > 0 ? item.album.images[0].url : DEFAULT_AVATAR} alt="img"/>;
    else return null;
}

export default TrackImage;