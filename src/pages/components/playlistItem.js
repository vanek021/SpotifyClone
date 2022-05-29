import { NavLink } from 'react-router-dom';
import { DEFAULT_AVATAR } from '../../js/baseResources';
import { normalizeTitle } from '../../js/InterfaceManager';

function PlaylistItem({item, type}) {
    return(
        <NavLink to={`/${type}/` + item.id}>
            <div className="playlist">
                <img className="playlist__image" src={item.images?.length > 0 ? item.images[0].url : DEFAULT_AVATAR} alt="scary-img"/>
                <div className="playlist__title">{normalizeTitle(item.name)}</div>
                <div className="playlist__description">
                    {type === "album" && 'Треков: ' + item.total_tracks}
                    {type === "playlist" && normalizeTitle(item.owner?.display_name)}
                    {type === "show" && normalizeTitle(item.publisher)}
                </div>
            </div>
        </NavLink>
    );
}

export default PlaylistItem;