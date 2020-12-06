import React from "react";
import { withRouter } from "react-router-dom";

import { logout } from "../redux/actions";
import { Menu, MenuItem } from "@material-ui/core";
import { connect, useSelector } from "react-redux";

/**
 * Menu for user managment
 * @param {props} props
 */
function KebabMenu(props) {
    const user = useSelector((state) => {
        return state.user;
    });

    const onClickLogin = () => {
        props.history.push("/login");
        props.onClose();
    };

    const onClickLogout = () => {
        props.dispatch(logout());
        props.onClose();
    };

    return (
        <Menu
            open={props.open}
            anchorEl={props.anchor}
            onClose={props.onClose}
            getContentAnchorEl={null}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
        >
            {user.user
                ? [
                      <MenuItem key="user">{user.user.username}</MenuItem>,
                      <MenuItem key="logout" onClick={onClickLogout}>
                          Logout
                      </MenuItem>,
                  ]
                : [
                      <MenuItem key="login" onClick={onClickLogin}>
                          Login
                      </MenuItem>,
                  ]}
        </Menu>
    );
}

export default connect()(withRouter(KebabMenu));
