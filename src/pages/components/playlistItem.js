import { NavLink } from 'react-router-dom';
import { DEFAULT_PLAYLIST_IMAGE } from '../../js/baseResources';
import { normalizeTitle } from '../../js/InterfaceManager';
import { PLAYLIST_TYPES } from '../../js/spotify';

function PlaylistItem({item, type}) {
    return(
        <NavLink to={`/${type}/` + item.id}>
            <div className="playlist">
                <img className="playlist__image" src={item.images?.length > 0 ? item.images[0].url : DEFAULT_PLAYLIST_IMAGE} alt="img"/>
                <div className="playlist__title">{normalizeTitle(item.name)}</div>
                <div className="playlist__description">
                    {type === PLAYLIST_TYPES.ALBUM && 'Треков: ' + item.total_tracks}
                    {type === PLAYLIST_TYPES.PLAYLIST && normalizeTitle(item.owner?.display_name)}
                    {type === PLAYLIST_TYPES.SHOW && normalizeTitle(item.publisher)}
                </div>
            </div>
        </NavLink>
    );
}

export default PlaylistItem;