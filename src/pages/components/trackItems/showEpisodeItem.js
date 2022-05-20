import { DEFAULT_AVATAR } from "../../../js/baseResources";
import { displayTime } from "../../../js/InterfaceManager";

function ShowEpisodeItem({item}) {
    return(
        <div className="track-item">
            <div className="track-item__wrapper">
                <img className="track-item__image" src={item.images.length > 0 ? item.images[0].url : DEFAULT_AVATAR} alt="crush-img"/>
                <div className="track-item__desc">
                    <div className="track-item__name">
                        {item.name}
                    </div>
                    <div className="track-item__author">
                        {item.description > 15 ? item.description.slice(0, 15) + '...' : item.description}
                    </div>
                </div>  
            </div>                                                         
            <div className="song-item__time">
                {displayTime(item.duration_ms)}
            </div>
        </div>
    );
}

export default ShowEpisodeItem;