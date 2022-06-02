import { displayTime } from "../../js/InterfaceManager";
import { TRACK_TYPES } from "../../js/spotify";
import TrackImage from "./trackImage";

function TrackItem({item, type}) {
    return(
        <div className="track-item">
            <div className="track-item__wrapper">
                <TrackImage item={item} type={type} />
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

export default TrackItem;