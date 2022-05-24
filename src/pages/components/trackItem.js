import { DEFAULT_AVATAR } from "../../js/baseResources";
import { displayTime } from "../../js/InterfaceManager";

function TrackItem({item, type}) {
    return(
        <div className="track-item">
            <div className="track-item__wrapper">
                {type === "ShowEpisode" && <img className="track-item__image" src={item.images?.length > 0 ? item.images[0].url : DEFAULT_AVATAR} alt="img"/>}
                {type === "TrackPlaylist" && <img className="track-item__image" src={item.album.images?.length > 0 ? item.album.images[0].url : DEFAULT_AVATAR} alt="img"/>}
                <div className="track-item__desc">
                    <div className="track-item__name">
                        {item.name}
                    </div>
                    <div className="track-item__author">
                        {type === "ShowEpisode" ? (
                            item.description > 15 ? item.description.slice(0, 15) + '...' : item.description
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