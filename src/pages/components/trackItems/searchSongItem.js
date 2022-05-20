import { DEFAULT_AVATAR } from "../../../js/baseResources";
import { displayTime } from "../../../js/InterfaceManager";

function SearchSongItem({item}) {
    return(
        <div className="song-item">
            <div className="song-item__wrapper">
                <img className="song-item__image" src={item.album.images.length > 0 ? item.album.images[0].url : DEFAULT_AVATAR} alt="yes-mom-img"/>
                <div className="song-item__desc">
                    <div className="song-item__name">
                        {item.name}
                    </div>
                    <div className="song-item__author">
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

export default SearchSongItem;