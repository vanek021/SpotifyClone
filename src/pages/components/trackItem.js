import { DEFAULT_AVATAR } from "../../js/baseResources";
import { displayTime } from "../../js/InterfaceManager";
import { TRACK_TYPES } from "../../js/spotify";

function TrackItem({item, type}) {
    return(
        <div className="track-item">
            <div className="track-item__wrapper">
                {getImage(item, type)}
                <div className="track-item__desc">
                    <div className="track-item__name">
                        {item.name}
                    </div>
                    <div className="track-item__author">
                        {type === TRACK_TYPES.SHOW_EPISODE ? (
                            item.description
                        ) : (
                            item.artists.map(artist => artist.name).join(' ')
                        )}
                    </div>
                </div>  
            </div>
            <div className="track-item__time">
                {displayTime(item.duration_ms)}
            </div>
        </div>
    );
}

function getImage(item, type) {
    if (type === TRACK_TYPES.SHOW_EPISODE)
        return <img className="track-item__image" src={item.images?.length > 0 ? item.images[0].url : DEFAULT_AVATAR} alt="img"/>;
    else if (type === TRACK_TYPES.PLAYLIST_TRACK)
        return <img className="track-item__image" src={item.album.images?.length > 0 ? item.album.images[0].url : DEFAULT_AVATAR} alt="img"/>;
    else return null;
}

export default TrackItem;