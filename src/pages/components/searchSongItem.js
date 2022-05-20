import { displayTime } from "../../js/InterfaceManager";

function SearchSongItem({item}) {
    return(
        <div className="song-item">
            <div className="song-item__wrapper">
                <img className="song-item__image" src={item.image_url} alt="yes-mom-img"/>
                <div className="song-item__desc">
                    <div className="song-item__name">
                        {item.name}
                    </div>
                    <div className="song-item__author">
                        {item.author}
                    </div>
                </div>
            </div>                     
            <div className="song-item__time">
            {displayTime(item.duration)}
            </div>
        </div>
    );  
}

export default SearchSongItem;