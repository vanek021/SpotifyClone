import { PLAYLIST_TYPES } from "../../js/spotify";
import PlaylistItem from "./playlistItem";

function SpotifyContainer({row, type, title}) {
    return (
        <div className="spotify-container">
            <div className="spotify-container__title">{title}</div>
            <div className="spotify-container__row">
                {row?.items.length > 0 && row.items.map(function(item) {
                    if (type === PLAYLIST_TYPES.SHOW) return (<PlaylistItem key={item.show.id} item={item.show} type={type}/>)
                    else return (<PlaylistItem key={item.id} item={item} type={type}/>)
                })}
            </div>
        </div>
    )
}

export default SpotifyContainer;