import { NavLink } from 'react-router-dom';
import { DEFAULT_AVATAR } from '../../js/baseResources';

function PlaylistItem({item, type}) {
    return(
        <NavLink to={`/${type}/` + item.id}>
            <div className="playlist">
                <img className="playlist__image" src={item.images?.length > 0 ? item.images[0].url : DEFAULT_AVATAR} alt="scary-img"/>
                <div className="playlist__title">{item.name.length > 15 ? item.name.slice(0, 15) + '...' : item.name}</div>
                <div className="playlist__description">
                    {type === "album" && 'Треков: ' + item.total_tracks}
                    {type === "playlist" && item.owner?.display_name.length > 15 ? item.owner?.display_name.slice(0, 15) + '...' : item.owner?.display_name}
                    {type === "show" && item.publisher.length > 15 ? item.publisher.slice(0, 15) + '...' : item.publisher}
                </div>
            </div>
        </NavLink>
    );
}

export default PlaylistItem;