import { DEFAULT_AVATAR } from "../../js/baseResources";

function ArtistsItem({item}) {
    return(
        <div className="performers__performer">
            <img className="performers__performer-image" src={item.images.length > 0 ? 
                item.images[0].url : DEFAULT_AVATAR} alt="tessa-img"/>
            <div className="performers__performer-name">{item.name}</div>
            <div className="performers__performer-desc">{"Исполнитель"}</div>
        </div>)
    ;  
}

export default ArtistsItem;