import { DEFAULT_AVATAR } from "../../../js/baseResources";
import { displayTime } from "../../../js/InterfaceManager";

function PlaylistTrackItem({item}) {
    return(
        <div className="track-item">
            <div className="track-item__wrapper">
                {item.track.album.images !== undefined &&
                <img className="track-item__image" src={item.track.album.images.length > 0 ? item.track.album.images[0].url : DEFAULT_AVATAR} alt="crush-img"/>}
                <div className="track-item__desc">
                    <div className="track-item__name">
                        {item.track.name}
                    </div>
                    <div className="track-item__author">
                        {item.track.artists.map(x => x.name).join(' ')}
                    </div>
                </div>  
            </div>
            <div className="song-item__time">
                {displayTime(item.track.duration_ms)}
            </div>
        </div>
    );
}

export default PlaylistTrackItem;