import React from "react";
import { IconButton } from "@material-ui/core";
import { Favorite, Chat } from "@material-ui/icons";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { addLike, removeLike } from "../../../actions/profile";

const LikeButton = ({ addLike, removeLike, match, auth, card, location, profile }) => {

    const handleLike = () => {
        if (auth.user.userHasPhotos > 0) {
            let toUserId = card.user_id;
            if (card.connected === 0)
                addLike(location, toUserId, match.match, profile.profile);
            else
                removeLike(location, toUserId, match.match, profile.profile);
        } else {
            alert("CAN'T LIKE, ADD at least 1 photo");
        }
    };
    return (
        <>
            <IconButton aria-label="like" onClick={handleLike}>
                <Favorite style={{fill: "green"}}/>
            </IconButton>
            {(card.connected === 1 || card.connected === 2 )? (
                <IconButton aria-label="chat" component={Link} to="/messages" >
                <Favorite style={{fill: "red"}}/>
                </IconButton>
            ) : (
                ""
            )}
            {card.connected === 2 ? (
                <IconButton aria-label="chat" component={Link} to="/messages">
                    <Chat style={{fill: "blue"}}/>
                </IconButton>
            ) : (
                ""
            )}
        </>
    );
};

LikeButton.propTypes = {
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    match: state.match,
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, {
    addLike, removeLike
})(LikeButton);
