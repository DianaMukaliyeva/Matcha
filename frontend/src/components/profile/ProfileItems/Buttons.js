import React from "react";
import { IconButton, Button } from "@material-ui/core";
import { Favorite, Chat, Block } from "@material-ui/icons";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { addLike, removeLike } from "../../../actions/profile";
import { setSnackbar } from "../../../actions/setsnackbar";

const Buttons = ({
    addLike,
    removeLike,
    setSnackbar,
    match,
    auth,
    card,
    profile,
}) => {
    const handleLike = () => {
        if (auth.user.userHasPhotos > 0) {
            // color = card.connected > 0 ? { fill: "red" } : { fill: "white" };
            let toUserId = card.user_id;
            if (card.connected === 0)
                addLike("profile", toUserId, match.match, profile.profile);
            else removeLike("profile", toUserId, match.match, profile.profile);
        } else {
            setSnackbar(
                true,
                "error",
                "Add at least 1 photo to enable like functionality"
            );
        }
    };
    const handleUnblock = () => {
        setSnackbar(true, "warning", "You have blocked this user.");
    };
    if (card.blocked === "1") {
        return (
            <IconButton aria-label="block" onClick={handleUnblock}>
                <Block style={{ fill: "red" }} />
            </IconButton>
        );
    }
    // let color = card.connected > 0 ? { fill: "red" } : { fill: "white" };
   
    return (
        <>
            {/* <Button
                variant="outlined"
                // variant="contained"
                color="primary"
                startIcon={<Close />}
            >
                CLOSE
            </Button> */}
            <Button
                onClick={handleLike}
                variant="outlined"
                // variant="contained"
                color="primary"
                startIcon={<Favorite  />}
            >
                {card.connected > 0 ? "UNMATCH" : "LIKE"}
            </Button>

            {card.connected === 2 ? (
                <Button
                    variant="outlined"
                    // variant="contained"
                    color="primary"
                    component={Link}
                    to="/messages"
                    startIcon={<Chat  />}
                >
                    "CHAT"
                </Button>
            ) : (
                ""
            )}
        </>
    );
};

Buttons.propTypes = {
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    setSnackbar: PropTypes.func.isRequired,
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
    addLike,
    removeLike,
    setSnackbar,
})(Buttons);