import { NavLink } from 'react-router-dom';
import { DEFAULT_AVATAR, DEFAULT_PLAYLIST_IMAGE } from '../../js/baseResources';

function PlaylistItem({item, type}) {
    let element;
    if (type === "album") {
        element = {
            id: item.id,
            name: item.name.length > 15 ? item.name.slice(0, 15) + '...' : item.name,
            image: item.images.length > 0 ? item.images[0].url : DEFAULT_AVATAR,
            desc: 'Треков: ' + item.total_tracks
        };       
    }
    else if (type === "playlist") {
        element = {
            id: item.id,
            name: item.name.length > 15 ? item.name.slice(0, 15) + '...' : item.name,
            image: item.images.length > 0 ? item.images[0].url : DEFAULT_AVATAR,
            desc: item.owner.display_name.length > 15 ? item.owner.display_name.slice(0, 15) + '...' : item.owner.display_name
        }; 
    }
    else {
        element = {
            id: item.show.id,
            name: item.show.name.length > 15 ? item.show.name.slice(0, 15) + '...' : item.show.name,
            image: item.show.images.length > 0 ? item.show.images[0].url : DEFAULT_PLAYLIST_IMAGE,
            desc: item.show.publisher > 15 ? item.show.publisher.slice(0, 15) + '...' : item.show.publisher,
        }
    }

    return(
        <NavLink to={`/${type}/` + element.id}>
            <div className="playlist">
                <img className="playlist__image" src={element.image} alt="scary-img"/>
                <div className="playlist__title">{element.name}</div>
                <div className="playlist__description">{element.desc}</div>
            </div>
        </NavLink>
    );
}

export default PlaylistItem;