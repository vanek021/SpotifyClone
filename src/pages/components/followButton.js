import { useEffect, useState } from "react";
import { ADD_BUTTON_HANDLERS } from "../../js/spotify";

function FollowButton({id, type}) {
    const [isFollowed, setIsFollowed] = useState(false);

    useEffect(() => {
        ADD_BUTTON_HANDLERS[type].GET_STATE(id).then((data) => setIsFollowed(data[0]));
    }, [isFollowed, id, type]);

    const imageSource = isFollowed ? "/resources/images/button-added.png" : "/resources/images/button-add.png";
    return (
        <input className="spotify-container__tracklist-add-button" type="image" onClick={() => {
            isFollowed ? ADD_BUTTON_HANDLERS[type].UNFOLLOW(id).then(() => setIsFollowed(false))
                : ADD_BUTTON_HANDLERS[type].FOLLOW(id).then(() => setIsFollowed(true));
        }} src={imageSource} alt="button-add"/>
    )
}

export default FollowButton;