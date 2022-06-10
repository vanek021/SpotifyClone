import { PLAYLIST_TYPES } from "../../js/spotify";
import PlaylistItem from "./playlistItem";

function SpotifyContainer({row, type, title}) {
    return (
        <div className="spotify-container">
            <div className="spotify-container__title">{title}</div>
            <div className="spotify-container__row">
                {row?.length > 0 && row.map(function(item) {
                    const playlistItem = type === PLAYLIST_TYPES.SHOW ? item.show : item;
                    return (<PlaylistItem key={playlistItem.id} item={playlistItem} type={type}/>)
                })}
            </div>
        </div>
    )
}

export default SpotifyContainer;