import { DEFAULT_AVATAR } from "../../js/baseResources";
import { displayTime } from "../../js/InterfaceManager";

function TrackItem({item, type}) {
    let image = null;
    if (type === "ShowEpisode")
        image = <img className="track-item__image" src={item.images?.length > 0 ? item.images[0].url : DEFAULT_AVATAR} alt="img"/>;
    else if (type === "TrackPlaylist")
        image = <img className="track-item__image" src={item.album.images?.length > 0 ? item.album.images[0].url : DEFAULT_AVATAR} alt="img"/>;
    return(
        <div className="track-item">
            <div className="track-item__wrapper">
                {image}
                <div className="track-item__desc">
                    <div className="track-item__name">
                        {item.name}
                    </div>
                    <div className="track-item__author">
                        {type === "ShowEpisode" ? (
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

export default TrackItem;