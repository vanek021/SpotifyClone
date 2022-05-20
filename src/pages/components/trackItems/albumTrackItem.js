import { DEFAULT_PLAYLIST_IMAGE } from "../../../js/baseResources";
import { displayTime } from "../../../js/InterfaceManager";

function AlbumTrackItem({item}) {
    return(
        <div className="track-item">
            <div className="track-item__wrapper">
                {item.images !== undefined &&
                <img className="track-item__image" src={item.images.length > 0 ? item.images[0].url : DEFAULT_PLAYLIST_IMAGE} alt="crush-img"/>}
                <div className="track-item__desc">
                    <div className="track-item__name">
                        {item.name}
                    </div>
                    <div className="track-item__author">
                        {item.artists.map(x => x.name).join(' ')}
                    </div>
                </div>  
            </div>                    
            <div className="song-item__time">
                {displayTime(item.duration_ms)}
            </div>
        </div>
    );
}

export default AlbumTrackItem;